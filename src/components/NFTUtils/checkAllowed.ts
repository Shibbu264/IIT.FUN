import {
    AddressGate,
    Allocation,
    CandyGuard,
    CandyMachine,
    EndDate,
    FreezeSolPayment,
    FreezeTokenPayment,
    GuardSet,
    NftBurn,
    NftGate,
    NftPayment,
    RedeemedAmount,
    SolPayment,
    StartDate,
    TokenBurn,
    TokenGate,
    TokenPayment,
    getMerkleRoot,
  } from "@metaplex-foundation/mpl-candy-machine";
  import {
    SolAmount,
    Some,
    Umi,
    assertAccountExists,
    publicKey,
    sol,
  } from "@metaplex-foundation/umi";
  import {
    addressGateChecker,
    allowlistChecker,
    checkTokensRequired,
    checkSolBalanceRequired,
    mintLimitChecker,
    ownedNftChecker,
    GuardReturn,
    allocationChecker,
    calculateMintable,
  } from "./checkerHelper";
  import { allowLists } from "./allowlist";
  import {
    DigitalAssetWithToken,
    fetchAllDigitalAssetWithTokenByOwner,
  } from "@metaplex-foundation/mpl-token-metadata";
  import { checkAtaValid } from "./validateConfig";
  
  export const guardChecker = async (
    umi: Umi,
    candyGuard: CandyGuard,
    candyMachine: CandyMachine,
    solanaTime: bigint
  ) => {
    let guardReturn: GuardReturn[] = [];
    let ownedTokens: DigitalAssetWithToken[] = [];
    if (!candyGuard) {
      if (guardReturn.length === 0) {
        //guardReturn.push({ label: "default", allowed: false });
      }
      return { guardReturn, ownedNfts: ownedTokens };
    }
  console.log("Entered guard checker")
    let guardsToCheck: { label: string; guards: GuardSet }[] = candyGuard.groups;
    guardsToCheck.push({ label: "default", guards: candyGuard.guards });
  
    //no wallet connected. return dummies
    const dummyPublicKey = publicKey("11111111111111111111111111111111");
console.log(Number(candyMachine.data.itemsAvailable) - Number(candyMachine.itemsRedeemed) === 0)
    if (
      umi.identity.publicKey === dummyPublicKey ||
      Number(candyMachine.data.itemsAvailable) - Number(candyMachine.itemsRedeemed) === 0
    ) {
      for (const eachGuard of guardsToCheck) {
        guardReturn.push({
          label: eachGuard.label,
          allowed: false,
          reason: "Please connect your wallet to mint",
          maxAmount: 0
        });
      }
      console.log(guardReturn)
      return { guardReturn, ownedNfts: ownedTokens };
    }
  
    if (candyMachine.authority === umi.identity.publicKey){
      checkAtaValid(umi, guardsToCheck);
    }
  
  
    let solBalance: SolAmount = sol(0);
    if (checkSolBalanceRequired(guardsToCheck)) {
      try {
        const account = await umi.rpc.getAccount(umi.identity.publicKey);
        assertAccountExists(account);
        solBalance = account.lamports;
      } catch (e) {
        for (const eachGuard of guardsToCheck) {
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "You don't have SOL, Add that?",
            maxAmount: 0
          });
        }
        console.log(guardReturn)
        return { guardReturn, ownedNfts: ownedTokens };
      }
    }
  
    if (checkTokensRequired(guardsToCheck)) {
      ownedTokens = await fetchAllDigitalAssetWithTokenByOwner(
        umi,
        umi.identity.publicKey
      );
    }
  
    for (const eachGuard of guardsToCheck) {
      const singleGuard = eachGuard.guards;
      let mintableAmount = Number(candyMachine.data.itemsAvailable) - Number(candyMachine.itemsRedeemed);
  
      console.log(`Checking AddressGate for guard ${eachGuard.label}`);
      if (singleGuard.addressGate.__option === "Some") {
        const addressGate = singleGuard.addressGate as Some<AddressGate>;
        if (
          !addressGateChecker(
            umi.identity.publicKey,
            publicKey(addressGate.value.address)
          )
        ) {
          console.log(`AddressGate check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "AddressGate: Wrong Address",
            maxAmount: 0
          });
          continue;
        }
      }
  
      console.log(`Checking Allocation for guard ${eachGuard.label}`);
      if (singleGuard.allocation.__option === "Some") {
        const allocatedAmount = await allocationChecker(umi, candyMachine, eachGuard);
        mintableAmount = calculateMintable(mintableAmount, allocatedAmount);
  
        if (allocatedAmount < 1) {
          console.log(`Allocation check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Allocation of this guard reached",
            maxAmount: 0
          });
          console.log(`Guard ${eachGuard.label}; allocation reached`);
          continue;
        }
      }
  
      console.log(`Checking AllowList for guard ${eachGuard.label}`);
      if (singleGuard.allowList.__option === "Some") {
        if (!allowlistChecker(allowLists, umi, eachGuard.label)) {
          console.log(`AllowList check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Wallet not allowlisted",
            maxAmount: 0
          });
          console.log(`Guard ${eachGuard.label} wallet not allowlisted!`);
          continue;
        }
      }
  
      console.log(`Checking EndDate for guard ${eachGuard.label}`);
      if (singleGuard.endDate.__option === "Some") {
        const addressGate = singleGuard.endDate as Some<EndDate>;
        if (solanaTime > addressGate.value.date) {
          console.log(`EndDate check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Mint time is over!",
            maxAmount: 0
          });
          console.log(`Guard ${eachGuard.label}; endDate reached!`);
          continue;
        }
      }
  
      console.log(`Checking FreezeSolPayment for guard ${eachGuard.label}`);
      if (singleGuard.freezeSolPayment.__option === "Some") {
        const freezeSolPayment =
          singleGuard.freezeSolPayment as Some<FreezeSolPayment>;
        const payableAmount = solBalance.basisPoints / freezeSolPayment.value.lamports.basisPoints;
        mintableAmount = calculateMintable(mintableAmount, Number(payableAmount));
  
        if (freezeSolPayment.value.lamports.basisPoints > solBalance.basisPoints) {
          console.log(`FreezeSolPayment check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Not enough SOL",
            maxAmount: 0
          });
          console.log(
            `Guard ${eachGuard.label}; freezeSolPayment: not enough SOL`
          );
          continue;
        }
      }
  
      console.log(`Checking MintLimit for guard ${eachGuard.label}`);
      if (singleGuard.mintLimit.__option === "Some") {
        const amount = await mintLimitChecker(umi, candyMachine, eachGuard);
        mintableAmount = calculateMintable(mintableAmount, amount);
        if (amount < 1) {
          console.log(`MintLimit check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Mint limit of this wallet reached",
            maxAmount: 0
          });
          console.log(`Guard ${eachGuard.label}; mintLimit reached`);
          continue;
        }
      }
  
      console.log(`Checking FreezeTokenPayment for guard ${eachGuard.label}`);
      if (singleGuard.freezeTokenPayment.__option === "Some") {
        const freezeTokenPayment =
          singleGuard.freezeTokenPayment as Some<FreezeTokenPayment>;
        const digitalAssetWithToken = ownedTokens?.find(
          (el) => el.mint.publicKey === freezeTokenPayment.value.mint
        );
        if (
          !digitalAssetWithToken ||
          digitalAssetWithToken.token.amount >= freezeTokenPayment.value.amount
        ) {
          console.log(`FreezeTokenPayment check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Not enough tokens!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label}: Token Balance too low !`);
          continue;
        } else {
          const payableAmount = freezeTokenPayment.value.amount / digitalAssetWithToken.token.amount;
          mintableAmount = calculateMintable(mintableAmount, Number(payableAmount));
        }
      }
  
      console.log(`Checking NftBurn for guard ${eachGuard.label}`);
      if (singleGuard.nftBurn.__option === "Some") {
        const nftBurn = singleGuard.nftBurn as Some<NftBurn>;
        const payableAmount = await ownedNftChecker(ownedTokens, nftBurn.value.requiredCollection);
        mintableAmount = calculateMintable(mintableAmount, payableAmount);
        if (payableAmount === 0) {
          console.log(`NftBurn check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "No NFT to burn!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label}: No Nft to burn!`);
          continue;
        }
      }
  
      console.log(`Checking NftGate for guard ${eachGuard.label}`);
      if (singleGuard.nftGate.__option === "Some") {
        const nftGate = singleGuard.nftGate as Some<NftGate>;
        if (!ownedNftChecker(ownedTokens, nftGate.value.requiredCollection)) {
          console.log(`NftGate check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "No NFT of the requred held!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label}: NftGate no NFT held!`);
          continue;
        }
      }
  
      console.log(`Checking NftPayment for guard ${eachGuard.label}`);
      if (singleGuard.nftPayment.__option === "Some") {
        const nftPayment = singleGuard.nftPayment as Some<NftPayment>;
        const payableAmount = await ownedNftChecker(ownedTokens, nftPayment.value.requiredCollection);
        mintableAmount = calculateMintable(mintableAmount, payableAmount);
        if (payableAmount === 0) {
          console.log(`NftPayment check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "No NFT to pay with!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label}: nftPayment no NFT to pay with`);
          continue;
        }
      }
  
      console.log(`Checking RedeemedAmount for guard ${eachGuard.label}`);
      if (singleGuard.redeemedAmount.__option === "Some") {
        const redeemedAmount = singleGuard.redeemedAmount as Some<RedeemedAmount>;
        const payableAmount = redeemedAmount.value.maximum - candyMachine.itemsRedeemed;
  
        mintableAmount = calculateMintable(mintableAmount, Number(payableAmount));
        if (redeemedAmount.value.maximum >= candyMachine.itemsRedeemed) {
          console.log(`RedeemedAmount check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Too many NFTs redeemed!",
            maxAmount: 0
          });
          console.log(
            `${eachGuard.label}: redeemedAmount Too many NFTs redeemed!`
          );
          continue;
        }
      }
  
      console.log(`Checking SolPayment for guard ${eachGuard.label}`);
      if (singleGuard.solPayment.__option === "Some") {
        const solPayment = singleGuard.solPayment as Some<SolPayment>;
        let payableAmount = 0;
        if (solPayment.value.lamports.basisPoints !== BigInt(0)) {
          payableAmount = Number(solBalance.basisPoints) / Number(solPayment.value.lamports.basisPoints);
        }
        mintableAmount = calculateMintable(mintableAmount, Number(payableAmount));
  
        if (solPayment.value.lamports.basisPoints > solBalance.basisPoints) {
          console.log(`SolPayment check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Not enough SOL!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label} SolPayment not enough SOL!`);
          continue;
        }
      }
  
      console.log(`Checking StartDate for guard ${eachGuard.label}`);
      if (singleGuard.startDate.__option === "Some") {
        const startDate = singleGuard.startDate as Some<StartDate>;
        console.log("Start date is: ", startDate);
        console.log("Current solana time: ", solanaTime)
        if (solanaTime < startDate.value.date) {
          console.log(`StartDate check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "StartDate not reached!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label} StartDate not reached!`);
  
          continue;
        }
      }
  
      console.log(`Checking TokenBurn for guard ${eachGuard.label}`);
      if (singleGuard.tokenBurn.__option === "Some") {
        const tokenBurn = singleGuard.tokenBurn as Some<TokenBurn>;
        const digitalAssetWithToken = ownedTokens?.find(
          (el) => el.mint.publicKey === tokenBurn.value.mint
        );
        if (
          !digitalAssetWithToken ||
          digitalAssetWithToken.token.amount < tokenBurn.value.amount
        ) {
          console.log(`TokenBurn check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Not enough tokens!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label} tokenBurn not enough tokens!`);
          continue;
        }
        const payableAmount = tokenBurn.value.amount / digitalAssetWithToken.token.amount;
        mintableAmount = calculateMintable(mintableAmount, Number(payableAmount));
      }
  
      console.log(`Checking TokenGate for guard ${eachGuard.label}`);
      if (singleGuard.tokenGate.__option === "Some") {
        const tokenGate = singleGuard.tokenGate as Some<TokenGate>;
        const digitalAssetWithToken = ownedTokens?.find(
          (el) => el.mint.publicKey === tokenGate.value.mint
        );
        if (
          !digitalAssetWithToken ||
          digitalAssetWithToken.token.amount < tokenGate.value.amount
        ) {
          console.log(`TokenGate check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Not enough tokens!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label} tokenGate not enough tokens!`);
          continue;
        }
      }
  
      console.log(`Checking TokenPayment for guard ${eachGuard.label}`);
      if (singleGuard.tokenPayment.__option === "Some") {
        const tokenPayment = singleGuard.tokenPayment as Some<TokenPayment>;
        const digitalAssetWithToken = ownedTokens?.find(
          (el) => el.mint.publicKey === tokenPayment.value.mint
        );
        if (
          !digitalAssetWithToken ||
          digitalAssetWithToken.token.amount < tokenPayment.value.amount
        ) {
          console.log(`TokenPayment check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Not enough tokens!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label} tokenPayment not enough tokens!`);
          continue;
        }
        const payableAmount = tokenPayment.value.amount / digitalAssetWithToken.token.amount;
        mintableAmount = calculateMintable(mintableAmount, Number(payableAmount));
  
      }
  
      console.log(`Checking Token2022Payment for guard ${eachGuard.label}`);
      if (singleGuard.token2022Payment.__option === "Some") {
        const token2022Payment =
          singleGuard.token2022Payment as Some<TokenPayment>;
        const digitalAssetWithToken = ownedTokens?.find(
          (el) => el.mint.publicKey === token2022Payment.value.mint
        );
        if (
          !digitalAssetWithToken ||
          digitalAssetWithToken.token.amount < token2022Payment.value.amount
        ) {
          console.log(`Token2022Payment check failed for guard ${eachGuard.label}`);
          guardReturn.push({
            label: eachGuard.label,
            allowed: false,
            reason: "Not enough tokens!",
            maxAmount: 0
          });
          console.log(`${eachGuard.label} token2022Payment not enough tokens!`);
          continue;
        }
        const payableAmount = token2022Payment.value.amount / digitalAssetWithToken.token.amount;
        mintableAmount = calculateMintable(mintableAmount, Number(payableAmount));
  
      }
      guardReturn.push({ label: eachGuard.label, allowed: true, maxAmount: mintableAmount });
    }
    console.log(guardReturn)
    return { guardReturn, ownedTokens };
  };
  