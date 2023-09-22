'use client';
import './Navbar.css';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import logo from '../assets/logo-no-background.png';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function Navbar() {
  const router = useRouter()
  const { data: session, status } = useSession();

  const checkIfNewUser = async () => {
    const res = await fetch(`/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const response = await res.text();
    
    return response;
  };

  useEffect(() => {
    if (status !== 'authenticated') return;

    (async () => {
      const newUser = JSON.parse(await checkIfNewUser());
      if (newUser && newUser.businessAdress === '') {
        router.push('/registration')
      }
    })();
  }, [session]);

  return (
    <nav className="navbar">
      <Link href="/" className="">
        <Image className="logo-image" alt="Logo" src={logo} width={60} />
      </Link>
    </nav>
  );
}
