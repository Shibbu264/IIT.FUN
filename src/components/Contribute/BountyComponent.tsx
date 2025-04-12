import { openDialog } from "@/lib/store/slices/dialogSlice";
import React from "react";
import { useDispatch } from "react-redux";

interface Job {
    id: number;
    title: string;
    description: string;
    image: string;
    amount: number;
    unit: string;
}

export default function BountyComponent({ job }: { job: Job }) {
    const { id, title, description, image, amount, unit } = job;
    const dispatch = useDispatch()
    return (
        <div
            onClick={() => dispatch(openDialog({
                type: 'bountyRegistration', data: {
                    bounty: job
                }
            }))}
            key={id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-900 text-white p-4 sm:p-6 md:p-6 border border-lime-500 hover:bg-gray-800 transition cursor-pointer"
        >
            {/* Left Section */}
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <img
                    src={image}
                    alt={title}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 flex-shrink-0"
                />
                <div>
                    <h2 className="font-semibold text-sm sm:text-base">
                        <span>{title}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">{description}</p>
                </div>
            </div>

            {/* Right Section */}
            {amount > 0 &&
                <div className="text-right flex items-center space-x-2">
                    <p className="font-semibold text-sm sm:text-base">{amount}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{unit}</p>
                </div>
            }
        </div>
    );
}
