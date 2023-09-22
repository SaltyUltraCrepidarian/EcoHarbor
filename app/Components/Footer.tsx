'use client';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import Button from './Button';
import './Footer.css';
import Link from 'next/link';

export default function Footer() {
  const { data: Session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <footer className="footer">
        <Link href={'/'} className="footer-button-loggedIn">
          What&apos;s Available!
        </Link>
        <Link href={'/account'} className="footer-button-loggedIn">
          Account
        </Link>
      </footer>
    );
  } else {
    return (
      <footer className="footer">
        <Button
          className="footer-button"
          action={signIn}
          text={'Join to Share'}
        />
      </footer>
    );
  }
}
