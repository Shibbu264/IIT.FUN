import NFTButton from '@/components/NFTbutton/NFTButton';
import { DialogContent } from '@/components/Ui/Dialog';
import React, { useEffect, useState } from 'react'

export default function NFTModal({ address }: { address: any }) {
    const apiKey = process.env.ApiKey;

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dMV2JLYJiEYQL5J-");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    // const baseURL = `https://solana-devnet.g.alchemy.com/nft/v2/a4hPW2lwPOW8yu5ReKcS0RxtPZPpEpKK/getNFTsForOwner`;
    // const url = `${baseURL}/getNFTs/?owner=${address}`;
    // var requestOptions = {
    //     method: 'get',
    //     redirect: 'follow'
    // };
    const [collections, setCollections] = useState<any[]>([]);
    useEffect(() => {
        fetch("https://api.shyft.to/sol/v1/wallet/collections?network=devnet&wallet_address=" + address, requestOptions as any)
            .then(response => response.json())
            .then((data) => {
                setCollections(data.result.collections || []);
                console.log(data);
            })
            .catch(error => {
                console.log('error', error);
            });
    }, [])

    useEffect(() => {
        const fetchMetadata = async (nft: { metadata_uri: string }) => {
            try {
                const response = await fetch(nft.metadata_uri);
                const metadata = await response.json();
                return metadata.image;
            } catch (error) {
                console.error('Error fetching metadata:', error);
                return null;
            }
        };

        const fetchAllMetadata = async () => {
            const updatedCollections = await Promise.all(collections.map(async (collection: any) => {
                const nftsWithImages = await Promise.all(collection.nfts.map(async (nft: { metadata_uri: string }) => {
                    const imageUrl = await fetchMetadata(nft);
                    return { ...nft, image: imageUrl };
                }));
                return { ...collection, nfts: nftsWithImages };
            }));
            setCollections(updatedCollections);
        };

        fetchAllMetadata();
    }, [collections]);

    return (
        <DialogContent className="p-4 bg-primaryBlack text-white rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-primaryGreen mb-4">NFT Collections</h2>
            {/* <NFTButton/> */}
            {collections.map((collection: any, index: number) => (
                <div key={index} className="mb-4">
                    <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                    <div className="grid max-h-96 overflow-y-auto grid-cols-1 sm:grid-cols-2 gap-4">
                        {collection.nfts.map((nft: any, nftIndex: number) => (
                            <>
                                <div key={nftIndex} className="bg-secondaryGreen p-4 rounded-lg">
                                    <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                    <h4 className="text-lg font-semibold">{nft.name} ({nft.symbol})</h4>
                                    <p className="text-sm">Royalty: {nft.royalty}%</p>
                                </div>
                                <div key={nftIndex} className="bg-secondaryGreen p-4 rounded-lg">
                                    <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                    <h4 className="text-lg font-semibold">{nft.name} ({nft.symbol})</h4>
                                    <p className="text-sm">Royalty: {nft.royalty}%</p>
                                </div>
                                <div key={nftIndex} className="bg-secondaryGreen p-4 rounded-lg">
                                    <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                    <h4 className="text-lg font-semibold">{nft.name} ({nft.symbol})</h4>
                                    <p className="text-sm">Royalty: {nft.royalty}%</p>
                                </div>
                                <div key={nftIndex} className="bg-secondaryGreen p-4 rounded-lg">
                                    <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                    <h4 className="text-lg font-semibold">{nft.name} ({nft.symbol})</h4>
                                    <p className="text-sm">Royalty: {nft.royalty}%</p>
                                </div>
                                <div key={nftIndex} className="bg-secondaryGreen p-4 rounded-lg">
                                    <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                    <h4 className="text-lg font-semibold">{nft.name} ({nft.symbol})</h4>
                                    <p className="text-sm">Royalty: {nft.royalty}%</p>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            ))}
        </DialogContent>
    )
}
