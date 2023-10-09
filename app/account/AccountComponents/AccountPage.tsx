'use client';
import React, { useState } from 'react';
import Footer from '../../Components/Footer';
import './account.css';
import Profile from './Profile';
import AccountForm from './AccountForm';
import Giveaways from './Giveaways';
import { OfferCardType, User } from '@/app/types';
import './account.css';

type Props = {
  userData: User;
  donationData: OfferCardType[];
};

export default function AccountPage({ userData, donationData }: Props) {
  const [selection, setSelection] = useState('profile');

  const profile = 'profile';
  const form = 'form';
  const giveaways = 'giveAways';

  const handleSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelection(e.currentTarget.name);
  };

  return (
    <>
      <section className="w-screen">
        <div className=" ">
          <Footer />
          <div className="container  font-primary rounded-md max-w-[450px] mx-auto px-5 flex justify-between  flex-row text-lg">
            <button
              className=" mx-auto flex justify-center  hover:bg-secondary/75 rounded-md   font-light text-md items-center h-[35px] w-[100px] border-primary border text-primary   mt-8 "
              onClick={handleSelection}
              name={profile}
            >
              Profile
            </button>
            <button
              className=" mx-auto flex font-light  hover:bg-secondary/75 rounded-md justify-center text-md items-center h-[35px] w-[100px] border-primary border text-primary    mt-8  "
              onClick={handleSelection}
              name={form}
            >
              Donate
            </button>
            <button
              className=" mx-auto flex justify-center  hover:bg-secondary/75  rounded-md font-light text-md items-center h-[35px] w-[100px] border-primary border text-primary     mt-8 "
              onClick={handleSelection}
              name={giveaways}
            >
              Donations
            </button>
          </div>
          <div>
            {selection === profile && <Profile userData={userData} />}
            {selection === form && <AccountForm />}
            {selection === giveaways && (
              <Giveaways donationData={donationData} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
