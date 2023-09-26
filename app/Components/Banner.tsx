'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { animation } from '../../variants';
import pattern from '../assets/pattern.png'
import Image from 'next/image';

export default function Banner() {
  return (
    <section className="min-h-[85vh] lg:min-h-[78vh] flex items-center ">
      <div className="container mx-auto">
        <div className="flex flex-col bg-site bg-contain lg:mt-24 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-1 text-left  lg:text-left font-primary">
            <motion.p
              variants={animation('up', 0.2)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.5 }}
              className="text-[24px] -ml-10 lg:text-[40px] font-light"
            >
              Share the <span className=" font-bold"> bounty:</span>
            </motion.p>
            <motion.p
              variants={animation('up', 0.3)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.7 }}
              className="text-[20px] -ml-10 lg:text-[30px] font-light"
            >
              Our <span className="font-bold">food</span> your{' '}
              <span className="font-bold">table</span>
            </motion.p>
          </div>
          {/* <div className='hidden lg:flex flex-1  '> 
            <Image src={pattern} alt='pattern' className='w-[720px] '/>
          </div> */}
        </div>
      </div>
    </section>
  );
}
