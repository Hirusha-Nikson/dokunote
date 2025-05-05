"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { ModeToggle } from "@/components/mode-toggle";
import Authentication from "../_components/_features_cards/authentication";
import CitesFormatCard from "../_components/_features_cards/cites-formats";
import CollaborateCard from "../_components/_features_cards/collaborate-card";
import CommentsCard from "../_components/_features_cards/comments-card";
import NotificationCard from "../_components/_features_cards/notifications";
import ExportFileCard from "../_components/_features_cards/export-type-card";
import PDFSummarizeCard from "../_components/_features_cards/pdf-summarize";
import IconListCard from "../_components/_features_cards/icon-list-card";
import { Hash } from "lucide-react";

const Features = () => {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 2000], [600, -100]); //col-1
  const y2 = useTransform(scrollY, [0, 3000], [300, -100]); //col-2
  const y3 = useTransform(scrollY, [0, 1900], [900, -100]); //col-3
  const y4 = useTransform(scrollY, [0, 1500], [500, 0]); //col-4
  const y5 = useTransform(scrollY, [0, 1600], [500, 100]); //col-5
  const y6 = useTransform(scrollY, [0, 3000], [200, -100]); //col-6

  return (
    <div className="w-full mx-auto min-h-screen my-12">
      <div className="w-full mx-auto flex justify-center items-center">
        <div className="grid grid-cols-6 justify-between items-center gap-4 w-full">
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
            style={{ y: y1 }}
            className="col-span-1 flex flex-col gap-4"
          >
            <Authentication />
            <PDFSummarizeCard />
          </motion.div>
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-3">
            <div className="h-full w-full grid grid-rows-3">
              <div className="row-span-1 flex items-end justify-end translate-y-16">
                <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full translate-x-16 flex flex-col">
                  <div className="flex gap-1 items-center text-sky-500">
                    <Hash className="size-3.5" />
                    <span>Features</span>
                  </div>
                  <h1 className="text-5xl font-bold flex flex-col">
                    <span>Where Research</span> <span>Meets Simplicity.</span>
                  </h1>
                </motion.div>
              </div>
              <div className="row-span-2">
                <div className="grid grid-cols-3 gap-4 w-full h-full">
                  <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ y: y2 }}
                  className="col-span-1">
                    <CollaborateCard />
                  </motion.div>
                  <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                    style={{ y: y3 }}
                    className="col-span-1 flex flex-col gap-4"
                  >
                    <CitesFormatCard />
                    <motion.div className="flex items-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl border-2 shadow-lg p-4 gap-4 hover:scale-105 transform duration-300">
                      <ModeToggle />
                      <div>
                        <h1 className="font-semibold">Themes</h1>
                        <p className="text-muted-foreground text-xs">
                          Easy toggle between light and dark mode
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                  <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                    style={{ y: y4 }}
                    className="col-span-1 flex flex-col gap-4"
                  >
                    <motion.div className="flex items-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl border-2 shadow-lg p-4 gap-8 hover:scale-105 transform duration-300">
                      <div>
                        <p className="text-muted-foreground text-xs">
                          powered with
                        </p>
                        <h1 className="font-semibold">Google Gemini</h1>
                      </div>

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

                    <CommentsCard />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ y: y5 }}
            className="col-span-1 flex flex-col gap-4"
          >
            <NotificationCard />
            <ExportFileCard />
          </motion.div>
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ y: y6 }}
          className="col-span-1">
            <IconListCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
