'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { animation } from '../../variants';
import food from '../assets/food.png';
import Image from 'next/image';
import Footer from './Footer';

export default function Banner() {
  return (
    <section
      className="min-h-[85vh] w-full lg:min-h-[80vh] flex items-center "
      id="home"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:mt-24 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-1 text-center font-secondary lg:text-left ">
            <motion.p
              variants={animation('up', 0.3)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.5 }}
              className="text-[30px] font-primary font-light leading-[0.8] lg:text-[45px] mb-4 "
            >
              Share the <span className=" font-semibold"> bounty:</span>
            </motion.p>

            <motion.p
              variants={animation('up', 0.4)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.5 }}
              className="mb-6  text-[28px] font-primary font-extralight mx-w-lg mx-auto lg:mx-0 lg:text-[40px]"
            >
              Our <span className="font-semibold">food</span> your{' '}
              <span className="font-semibold">table</span>
            </motion.p>
          </div>
     
          <motion.div
            variants={animation('left', 0.5)}
            initial="hidden"
            whileInView={'show'}
            className="  hidden lg:flex flex-1 max-w-[320px] lg:max-w-[420px] "
          >
            <Image src={food} alt="food"/>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
