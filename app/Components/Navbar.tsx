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
    console.log(response)
    return response;
  };

  useEffect(() => {
    //console.log(status)
    //if (status !== 'authenticated') return;

    (async () => {
      const responseUser =await checkIfNewUser();
      console.log('Api res'+responseUser)
      if(responseUser.trim() === ''){
        console.log('empty')
      }
      else{
        const newUser = JSON.parse(responseUser)
        console.log(newUser)
        if (newUser && newUser.businessAdress === '') {
          router.push('/registration')
      }
      // const newUser = JSON.parse(await checkIfNewUser());
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
