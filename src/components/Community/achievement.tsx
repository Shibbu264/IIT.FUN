"use client"
import React, { useState } from 'react'

export default function Achievement() {
  return (
    <div className="w-[69%] max-lg:w-4/5 mx-auto bg-[#333333] text-white  p-6">
      {/* Left Section */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-xl md:text-3xl font-[400] leading-relaxed">
            Join now, or regret later—<br />
            just like your JEE rank.
          </h2>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex justify-around items-center">
          {/* First Box */}
          <div className="text-center max-md:min-h-44 flex flex-col">
            <p className="text-lime-400 text-6xl font-bold m-2">69</p>
            <p className="mt-2 m-2 lg:text-xl max-lg:text-md]">Reasons to drop everything and go full degen
            </p>
          </div>

          {/* Second Box */}
          <div className="text-center max-md:min-h-44 flex flex-col">
            <p className="text-lime-400 text-6xl font-bold m-2">420</p>
            <p className="mt-2 lg:text-xl max-lg:text-md m-2">420% APY? Sounds fake, but it’s crypto, so who knows?</p>
          </div>
        </div>
      </div>
    </div>
  )
}