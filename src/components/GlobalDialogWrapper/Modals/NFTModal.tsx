import NFTButton from '@/components/NFTbutton/NFTButton';
import { DialogContent } from '@/components/Ui/Dialog';
import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner';

export default function NFTModal({ address }: { address: any }) {
    const apiKey = process.env.ApiKey;
    const [loading, setLoading] = useState(false)

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dMV2JLYJiEYQL5J-");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const [collections, setCollections] = useState<any[]>([]);
    useEffect(() => {
        setLoading(true)
        fetch("https://api.shyft.to/sol/v1/wallet/collections?network=devnet&wallet_address=" + address, requestOptions as any)
            .then(response => response.json())
            .then((data) => {
                setCollections(data.result.collections || []);
                setLoading(false)
                return data;
            })
            .then((data: any) => fetchAllMetadata(data?.result?.collections))
            .catch(error => {
                setLoading(true)
                console.log('error', error);
            })

            ;
    }, [])

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

    const fetchAllMetadata = async (collections1: any) => {
        const updatedCollections = await Promise.all(collections1.map(async (collection: any) => {
            const nftsWithImages = await Promise.all(collection.nfts.map(async (nft: { metadata_uri: string }) => {
                const imageUrl = await fetchMetadata(nft);
                return { ...nft, image: imageUrl };
            }));
            return { ...collection, nfts: nftsWithImages };
        }));
        setCollections(updatedCollections);
    };

    return (
        <DialogContent className="p-4 bg-primaryBlack text-white rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-primaryGreen mb-4">NFT Collections</h2>
            {/* <NFTButton/> */}
            {loading ?
                <Audio
                    height="90"
                    width="90"
                    color="green"
                    ariaLabel="loading"
                /> :
                collections?.length==0?
                <>You haven't minted any NFTs yet</>
                :
                collections.map((collection: any, index: number) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                        <div className="grid max-h-96 overflow-y-auto grid-cols-1 sm:grid-cols-2 gap-4">
                            {collection.nfts.map((nft: any, nftIndex: number) => (
                                <>
                                    <div key={nftIndex} className="border-secondaryGreen border p-4 rounded-lg">
                                        <img src={nft.image ?? "/giphy21.jpeg"} alt={nft.name} className="w-full h-32 object-cover rounded-md mb-2" />
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
