import axiosInstance from '@/lib/axiosInstances/iitFunInstance';
import { useAppSelector } from '@/lib/store/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import Loader from '../Ui/Loader';
import { cn } from '@/lib/utils';

export default function NFTSection() {
    const { user } = useAppSelector(state => state.searchUser)

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
        mutationKey: ['getNFT', user?.wallet],
        mutationFn: () => axiosInstance.get(
            `https://api.shyft.to/sol/v1/wallet/collections?network=devnet&wallet_address=${user?.wallet}`
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
        enabled: !!user?.wallet,
        queryKey: ['nftCollections', user?.wallet],
        queryFn: fetchCollections
    });
    return (
        <div className="flex flex-col gap-8 mb-6">
            <div className="flex flex-col gap-2 md:gap-3">
                <h1 className="md:text-2xl text-lg lg:text-3xl">
                    NFTs Owned
                </h1>
                <p className="md:text-lg text-primaryGreen">Your collection of NFTs here.</p>
            </div>
            <div className={cn("flex flex-wrap  max-md:justify-center w-fit gap-4 md:gap-8", collections?.length == 0 && "mx-auto")}>
                {isLoading ?
                    <Loader />
                    :
                    collections?.length ? collections?.map((collection: any, index: number) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                            <div className="flex flex-wrap max-md:justify-center w-fit gap-4 md:gap-8">
                                {collection.nfts.map((nft: any, nftIndex: number) => (
                                    <div key={nftIndex} className="border-secondaryGreen border p-4 rounded-lg">
                                        <img src={nft.image ?? "/giphy21.jpeg"} alt={nft.name} className="w-full h-40 object-cover rounded-md mb-2" />
                                        <h4 className="text-lg font-semibold">{nft.name} ({nft.symbol})</h4>
                                        <p className="text-sm">Royalty: {nft.royalty}%</p>
                                    </div>
                                ))
                                }
                            </div>
                        </div>

                    ))
                        :
                        <span className='text-xl  text-center mx-auto text-primaryGreen'>No NFTs Owned Yet</span>}
            </div>
        </div>
    )
}
