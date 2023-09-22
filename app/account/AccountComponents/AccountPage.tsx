'use client';
import React, { useState } from 'react';
import Footer from '../../Components/Footer';
import './account.css';
import Profile from './Profile';
import AccountForm from './AccountForm';
import Giveaways from './Giveaways';
import { OfferCardType, User } from '@/app/types';
import './account.css'

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
      <section className="account-section">
        <div className="account-buttons-wrapper">
          <button
            className="account-button"
            onClick={handleSelection}
            name={profile}
          >
            Profile
          </button>
          <button
            className="account-button"
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
        {selection === profile && <Profile userData={userData} />}
        {selection === form && <AccountForm />}
        {selection === giveaways && <Giveaways donationData={donationData} />}
        <Footer />
      </section>
    </>
  );
}
