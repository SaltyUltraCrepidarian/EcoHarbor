'use client';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import Button from './Button';
import './Footer.css';
import Link from 'next/link';
import Banner from './Banner';

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
      <Banner/>
      <footer className="footer button w-[200px] sm-mt-11 lg:w-[300px] lg:-mt-44 flex ml-16 ">
        <Button
          className="button-footer "
          action={signIn}
          text={'Join to Share'}
        />
      </footer>
      </>
    );
  }
}
