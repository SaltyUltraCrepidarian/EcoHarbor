'use client';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import Button from './Button';
import './Footer.css';
import Link from 'next/link';
import Banner from './Banner';
import { motion } from 'framer-motion';
import { animation } from '../../variants';

export default function Footer() {
  const { data: Session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <footer className="footer button">
        <Link href={'/'} className="footer-button-loggedIn">
          What&apos;s Available?
        </Link>
        <Link href={'/account'} className="footer-button-loggedIn">
          Account
        </Link>
      </footer>
    );
  } else {
    return (
      <>
      
        <motion.footer
          variants={animation('up', 0.6)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}
          className="footer button w-[250px] h-[45px] lg:w-[345px] -mt-52 flex lg:ml-36 rounded-md font-primary text-lg border-none "
        >
          <Button
            className="button-footer "
            action={signIn}
            text={'Join to Share'}
          />
        </motion.footer>
      </>
    );
  }
}
