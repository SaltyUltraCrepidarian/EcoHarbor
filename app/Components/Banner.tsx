'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { animation } from '../../variants';
import food from '../assets/food.png';
import Image from 'next/image';
import Footer from './Footer';

export default function Banner() {
  return (
    <section className="min-h-[85vh]  flex items-center banner ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex md:flex-row  lg:mt-24 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-1 text-center sm:hidden sm:flex-1 sm:flex-row sm:items-center md:items-center  lg:text-left font-primary leading-relaxed ">
            <motion.p
              variants={animation('up', 0.2)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.5 }}
              className="text-[28px] -ml-10 xs:gap-x-10 lg:text-[40px] font-extralight"
            >
              Share the <span className=" font-bold"> bounty:</span>
            </motion.p>
            <motion.p
              variants={animation('up', 0.3)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.7 }}
              className="text-[24px] -ml-10 lg:text-[30px] font-extralight"
            >
              Our <span className="font-bold">food</span> your{' '}
              <span className="font-bold">table</span>
            </motion.p>
          </div>

          <motion.div
            variants={animation('left', 0.4)}
            initial="hidden"
            whileInView={'show'}
            className=" flex-1 flex-col w-[250px] lg:max-w-[600px]  lg:flex mr-9"
          >
            <Image src={food} alt="pattern" className=" -mt-20 mr-10 gap-x-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
