import { DialogContent } from '@/components/Ui/Dialog';
import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstances/iitFunInstance';

export default function NFTModal({ address }: { address: any }) {


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

    const getNFTMutation = useMutation({
        mutationKey: ['getNFT', address],
        mutationFn: () => axiosInstance.get(
            `https://api.shyft.to/sol/v1/wallet/collections?network=devnet&wallet_address=${address}`
            , {
                headers: {
                    'x-api-key': 'dMV2JLYJiEYQL5J-',
                    "X-Custom-Error": "none" 
                }
            }),
    })

    const fetchCollections = async () => {
        const data = await getNFTMutation.mutateAsync()

        const collections = data?.data?.result.collections || [];

        // Fetch metadata for all collections
        const updatedCollections = await Promise.all(collections.map(async (collection: any) => {
            const nftsWithImages = await Promise.all(collection.nfts.map(async (nft: { metadata_uri: string }) => {
                const imageUrl = await fetchMetadata(nft);
                return { ...nft, image: imageUrl };
            }));
            return { ...collection, nfts: nftsWithImages };
        }));

        return updatedCollections;
    };

    const { data: collections, isLoading } = useQuery({
        queryKey: ['nftCollections', address],
        queryFn: fetchCollections
    });

    return (
        <DialogContent className="p-4 bg-primaryBlack h-full max-h-[max(70%,620px)] max-md:min-h-screen max-md:min-w-[100vw] text-white max-md:border-none rounded-lg shadow-lg md:max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-primaryGreen mb-4">NFT Collections</h2>
            {/* <NFTButton/> */}
            {isLoading ?
                <div className='h-full flex flex-col items-center justify-center mx-auto'>
                    <Audio
                        height="90"
                        width="90"
                        color="green"
                        ariaLabel="loading"
                    />
                </div> :
                collections?.length == 0 ?
                    <>You haven't minted any NFTs yet</>
                    :
                    <div className='flex flex-col gap-6 h-[95%] overflow-y-auto'>
                        {collections?.map((collection: any, index: number) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                                <div className="grid max-h-96 overflow-y-auto grid-cols-1 sm:grid-cols-2 gap-4">
                                    {collection.nfts.map((nft: any, nftIndex: number) => (
                                        <div key={nftIndex} className="border-secondaryGreen border p-4 rounded-lg">
                                            <img src={nft.image ?? "/giphy21.jpeg"} alt={nft.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                            <h4 className="text-lg font-semibold">{nft.name} ({nft.symbol})</h4>
                                            <p className="text-sm">Royalty: {nft.royalty}%</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </DialogContent>
    )
}
