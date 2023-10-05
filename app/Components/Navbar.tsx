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
    const response = await res.text();
    return response;
  };

  useEffect(() => {
    (async () => {
      const responseUser = await checkIfNewUser();

      const newUser = JSON.parse(responseUser);
      if (newUser && newUser.businessAdress === '') {
        router.push('/registration');
      }
    })();
  }, []);

  return (
    <nav className="navbar">
      <Link href="/" className="">
        <Image className="logo-image" alt="Logo" src={logo} width={60} />
      </Link>
    </nav>
  );
}
