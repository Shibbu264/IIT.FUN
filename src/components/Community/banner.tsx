"use client"
import React, { useState } from 'react'
import styles from './banner.module.css';

const Banner = () => {
  return (
    <>
    <div className={styles.bannerContainer}>
    <div className={styles.firstBanner}>
      Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter
    </div>
      <div className={styles.secondBanner}>
        WE ARE INCUBATED IN ZO HOUSE * WE ARE INCUBATED IN ZO HOUSE * WE ARE INCUBATED IN ZO HOUSE 
      </div>
      </div>
    </>
  );
};

export default Banner;