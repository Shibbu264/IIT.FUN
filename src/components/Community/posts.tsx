"use client"
import React, { useState } from 'react'
import styles from '@/components/Community/posts.module.css'
import { cn } from '@/lib/utils'

export default function posts() {
    return(
        <div className={cn(styles.container,"flex flex-col !gap-32")}>
       {[0,1,2].map((x:any,i:number)=>  <div key={i} className={cn(styles.container1,i%2==0?"ml-auto ":"mr-auto")}>
     <div  className={cn(styles.skewedBox1)}></div>
    </div>)}
        </div>
    )
}