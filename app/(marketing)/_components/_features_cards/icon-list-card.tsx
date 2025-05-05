"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import BN from "@/components/assets/blocknote-i.png";
import LB from "@/components/assets/liveblocks-io.jpg";
import DN from "@/components/assets/DokunoteIconTP.png";

const IconListCard = () => {
  return (
    <div className="relative w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden flex items-center justify-center">

<div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-neutral-50 dark:from-neutral-800 to-transparent z-10 pointer-events-none"></div>
<div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-neutral-50 dark:from-neutral-800 to-transparent z-10 pointer-events-none"></div>
<div className="absolute bottom-4 left-0 w-full flex flex-col z-30 px-3">
  <h1>Powered By</h1>
  <p className="text-xs text-muted-foreground">Built with Clerk, Liveblocks, Gemini, and Blocknote — modern tools that power real-time collaboration and intelligence.</p>
</div>

      <div className="grid grid-cols-3 grid-rows-5 gap-4 items-center justify-between py-4 hover:scale-105 transform duration-300 -translate-y-6">
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 3, repeat: Infinity, repeatType: "mirror", delay: 0.2
        }}
        className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg border">
          <Image
            src={BN}
            alt="Blocknote"
            width={260}
            height={260}
            className="rounded-xl scale-105 object-cover contrast-105 dark:contrast-100 invert-0 dark:invert dark:hue-rotate-180 dark:brightness-95 w-full"
          />
        </motion.div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 3, repeat: Infinity, repeatType: "mirror", delay: 0.4
        }}
        className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg border-2">
          <Image
            src={LB}
            alt="Liveblocks"
            width={260}
            height={260}
            className="rounded-xl object-cover w-full"
          />
        </motion.div>
        <motion.div
        initial={{ scale: 1.2, opacity: 1 }}
        whileInView={{ scale: 0.8, opacity: 0.4 }}
        transition={{
          duration: 3, repeat: Infinity, repeatType: "mirror", delay: 1
        }}
        className="w-16 h-16 flex items-center justify-center rounded-2xl overflow-hidden">
        
        <Image
            src={DN}
            alt="Dokunote"
            width={260}
            height={260}
            className="rounded-xl  object-cover w-full scale-60"
          />

        </motion.div>
        <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 3, repeat: Infinity, repeatType: "mirror", delay: 0.6
        }}
        className="w-16 h-16 bg-neutral-300/30 dark:bg-blue-800/20 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg border">
          <svg
            height="48"
            style={{ flex: "none", lineHeight: 1 }}
            viewBox="0 0 24 24"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Gemini</title>
            <defs>
              <linearGradient
                id="lobe-icons-gemini-fill"
                x1="0%"
                x2="68.73%"
                y1="100%"
                y2="30.395%"
              >
                <stop offset="0%" stopColor="#1C7DFF"></stop>
                <stop offset="52.021%" stopColor="#1C69FF"></stop>
                <stop offset="100%" stopColor="#F0DCD6"></stop>
              </linearGradient>
              <linearGradient
                id="lobe-icons-gemini-fill"
                x1="0%"
                x2="68.73%"
                y1="100%"
                y2="30.395%"
              >
                <stop offset="0%" stopColor="#1C7DFF"></stop>
                <stop offset="52.021%" stopColor="#1C69FF"></stop>
                <stop offset="100%" stopColor="#F0DCD6"></stop>
              </linearGradient>
            </defs>
            <path
              d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12"
              fill='url("#lobe-icons-gemini-fill")'
              fillRule="nonzero"
            ></path>
          </svg>
        </motion.div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 3, repeat: Infinity, repeatType: "mirror", delay: 0.8
        }}
        className="w-16 h-16 bg-neutral-300/30 dark:bg-indigo-800/30 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg border">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="Clerk--Streamline-Simple-Icons"
            height="48"
            width="48"
          >
            <desc>Clerk Streamline Icon: https://streamlinehq.com</desc>
            <title>Clerk</title>
            <path
              d="m21.47 20.829 -2.881 -2.881a0.572 0.572 0 0 0 -0.7 -0.084 6.854 6.854 0 0 1 -7.081 0 0.576 0.576 0 0 0 -0.7 0.084l-2.881 2.881a0.576 0.576 0 0 0 -0.103 0.69 0.57 0.57 0 0 0 0.166 0.186 12 12 0 0 0 14.113 0 0.58 0.58 0 0 0 0.239 -0.423 0.576 0.576 0 0 0 -0.172 -0.453Zm0.002 -17.668 -2.88 2.88a0.569 0.569 0 0 1 -0.701 0.084A6.857 6.857 0 0 0 8.724 8.08a6.862 6.862 0 0 0 -1.222 3.692 6.86 6.86 0 0 0 0.978 3.764 0.573 0.573 0 0 1 -0.083 0.699l-2.881 2.88a0.567 0.567 0 0 1 -0.864 -0.063A11.993 11.993 0 0 1 6.771 2.7a11.99 11.99 0 0 1 14.637 -0.405 0.566 0.566 0 0 1 0.232 0.418 0.57 0.57 0 0 1 -0.168 0.448Zm-7.118 12.261a3.427 3.427 0 1 0 0 -6.854 3.427 3.427 0 0 0 0 6.854Z"
              className="fill-indigo-800 dark:fill-indigo-400"
              strokeWidth="1"
            ></path>
          </svg>
        </motion.div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
        <div className="w-16 h-16 bg-neutral-300/30 dark:bg-neutral-700/20 flex items-center justify-center rounded-2xl overflow-hidden"></div>
      </div>
    </div>
  );
};

export default IconListCard;
