"use client"
import React, { useState } from 'react'

export default function Achievement() {
  return (
    <div className="w-[69%] mx-auto bg-[#333333] text-white py-10 px-6">
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
          <div className="text-center">
            <p className="text-lime-400 text-6xl font-bold m-2">69</p>
            <p className="mt-2 !text-base m-2 font-[400]">Reasons to drop everything and go full degen
            </p>
          </div>

          {/* Second Box */}
          <div className="text-center">
            <p className="text-lime-400 text-6xl font-bold m-2">420</p>
            <p className="mt-2 md:text-xl max-md:text-lg m-2">420% APY? Sounds fake, but it’s crypto, so who knows?</p>
          </div>
        </div>
      </div>
    </div>
  )
}