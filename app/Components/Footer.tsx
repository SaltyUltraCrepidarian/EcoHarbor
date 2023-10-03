'use client';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import Button from './Button';
import './Footer.css';
import Link from 'next/link';
import Banner from './Banner';
import { motion } from 'framer-motion';
import { animation } from '../../variants';
import Navbar from './Navbar';

export default function Footer() {
  const { data: Session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <footer className="footer   flex  justify-around  text-secondary font-primary font-light text-xl leading-[0.8] mx-auto">
        <Link href={'/'} className="">
          What&apos;s Available
        </Link>
        <Link href={'/account'} className="">
          Account
        </Link>
      </footer>
    );
  } else {
    return (
      <>
       <Navbar />
        <Banner />
        <motion.footer
          variants={animation('up', 0.6)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}
          className="  mx-auto  -mt-28 footer text-lg text-secondary w-[250px] border-none rounded-md font-primary leading-[3]   lg:-mt-52 flex justify-center  lg:ml-32 lg:text-xl   lg:w-[345px] "
        >
          <Button
            className=" "
            action={signIn}
            text={'Join to Share'}
          />
        </motion.footer>
      </>
    );
  }
}
