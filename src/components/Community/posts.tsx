"use client"
import React from 'react'
import styles from '@/components/Community/posts.module.css'
import { cn } from '@/lib/utils'

const images = [
  '/zoblr.jpeg',
  '/zodubai.jpeg',
  '/zosf.jpeg'
];

const labels = [
  'ZO HOUSE BANGALORE',
  'ZO HOUSE DUBAI',
  'ZO HOUSE SF'
];

export default function Posts() {
    return (
        <div className={cn(styles.container, '!gap-16')}>
            {images.map((src, i) => (
                <div key={i} className="flex items-center justify-between w-full">
                    {/* "ZO" text positioned dynamically */}
                    {i % 2 !== 0 && (
                    <div className="flex flex-1 justify-center items-center">
                        <span className="md:text-8xl max-md:hidden text-6xl font-extrabold text-primaryGreen -rotate-[30deg]">
                            ZO
                        </span>
                    </div>
                    )}

                    {/* Image container */}
                    <div className={cn(styles.container1)}>
                        <div className={cn(styles.skewedBox1)}>
                            <img src={src} alt={`Image ${i + 1}`} className={styles.image} />
                            <div className={cn(styles.text, "text-center font-bold mt-2")}>
                                {labels[i]}
                            </div>
                        </div>
                    </div>

                    {/* "ZO" text positioned dynamically */}
                    {i % 2 === 0 && (
                         <div className="flex flex-1 justify-center items-center">
                        <span className="md:text-8xl max-md:hidden text-6xl font-extrabold text-white -rotate-[30deg]">
                            ZO
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
