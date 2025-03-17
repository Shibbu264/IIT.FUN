import React, { useEffect } from 'react';
import { FaStar, FaTrophy, FaWallet, FaHandHoldingHeart, FaUsers, FaComments } from 'react-icons/fa';
import { Card } from '../Ui/Card';
import { useAppSelector } from '@/lib/store/store';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstances/iitFunInstance';
import { useDispatch } from 'react-redux';
import { setSearchUserNFT } from '@/lib/store/slices/searchSlice';
import { setNFT } from '@/lib/store/slices/userSlice';



export default function Statistics() {
    const { id } = useParams();
    const { user, nfts } = useAppSelector(state => state.searchUser)
    const dispatch = useDispatch();
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "dMV2JLYJiEYQL5J-");

    const getNFTquery = useQuery({
        enabled: !!user?.wallet,
        queryKey: ['getNFT', user?.wallet],
        queryFn: () => axiosInstance.get(
            `https://api.shyft.to/sol/v1/wallet/collections?network=devnet&wallet_address=${user?.wallet}`, {
            headers: {
                'x-api-key': 'dMV2JLYJiEYQL5J-',
                "X-Custom-Error": "none" 
            }
        }
        ),
    })

    useEffect(() => {
        if (getNFTquery.data) {
            if (id == "me") {
                dispatch(setNFT((getNFTquery.data)?.data?.result?.collections))
            }
            dispatch(setSearchUserNFT((getNFTquery.data)?.data?.result?.collections))
        }
    }, [getNFTquery.isPending])

    const stats = [
        { icon: <FaStar size={24} />, value: user?.points, label: 'points' },
        { icon: <FaTrophy size={24} />, value: 1, label: 'drop-out rank' },
        { icon: <FaHandHoldingHeart size={24} />, value: user?.bounties as number, label: 'Contributions' },
        { icon: <FaUsers size={24} />, value: user?.communityCalls as number, label: 'Community calls' },
    ];

    if (nfts) { stats.unshift({ icon: <FaWallet size={24} />, value: nfts.length, label: 'NFTs owned' }) }

    return (
        <div className="flex flex-col gap-8 mb-6">
            <h1 className="md:text-2xl text-lg lg:text-3xl">
                Statistics
            </h1>
            <div className="flex flex-wrap max-md:justify-center w-fit gap-4 md:gap-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="flex border-secondaryGray bg-gray shadow-custom shadow-gray  gap-4 md:p-8 p-4 max-md:w-[80%] md:min-w-[250px]">
                        <div className='mt-1'>{stat.icon}</div>
                        <div>
                            <p className="text-xl font-semibold">{stat.value}</p>
                            <p className="text-lg text-gray-400">{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
