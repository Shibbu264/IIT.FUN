"use client"
import React from 'react'
import styles from '@/components/Community/posts.module.css'
import { cn } from '@/lib/utils'

const images = [
  '/zoblr.jpeg',
  '/zodubai.jpeg',
  '/zosf.jpeg'
];

export default function Posts() {
    return(
        <div className={cn(styles.container,'!gap-16')}>
            {images.map((src, i) => (
                <div key={i} className={cn(styles.container1, i % 2 === 0 ? "ml-auto" : "mr-auto")}>
                    <div className={cn(styles.skewedBox1)}>
                        <img src={src} alt={`Image ${i + 1}`} className={styles.image} />
                    </div>
                </div>
            ))}
        </div>
    )
}