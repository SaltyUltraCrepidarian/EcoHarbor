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
      <section className=" lg w-full overflow-hidden z-50">
        <div className=" container mx-auto ">
          <Footer />
          <div className="w-full fixed bottom-8 bg-primary/20 backdrop:blur   text-fourth text-black font-primary   h-[70px] backdrop-blur rounded-full max-w-[450px] mx-auto px-5 flex justify-between items-center text-xl">
            <button
              className="account-button"
              onClick={handleSelection}
              name={profile}
            >
              Profile
            </button>
            <button
              className="account-button bottom-8 "
              onClick={handleSelection}
              name={form}
            >
              Form
            </button>
            <button
              className="account-button"
              onClick={handleSelection}
              name={giveaways}
            >
              Giveaways
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
