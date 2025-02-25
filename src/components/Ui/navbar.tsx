import React from 'react';

export default function Navbar() {
    return (
        <nav className="bg-secondaryBlack p-4 flex mx-auto items-center">
            <div className="flex-1 flex justify-center">
                <div className="bg-primaryBlack p-2 rounded-md flex space-x-4">
                    <a href="#about" className="text-white px-3 py-2 rounded-md hover:bg-secondaryBlack focus:bg-secondaryBlack">About</a>
                    <a href="#community" className="text-white px-3 py-2 rounded-md hover:bg-secondaryBlack focus:bg-secondaryBlack">Community</a>
                    <a href="#leaderboard" className="text-white px-3 py-2 rounded-md hover:bg-secondaryBlack focus:bg-secondaryBlack">Leaderboard</a>
                    <a href="#contribute" className="text-white px-3 py-2 rounded-md hover:bg-secondaryBlack focus:bg-secondaryBlack">Start Contributing</a>
                </div>
            </div>
        </nav>
    );
}