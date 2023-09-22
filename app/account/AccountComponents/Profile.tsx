import Button from '@/app/Components/Button';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import './Profile.css';
import { User } from '@/app/types';
import EditProfile from './EditProfile';

type Props = {
  userData: User;
};

export default function Profile({ userData }: Props) {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  if (editMode)
    return (
      <>
        <EditProfile handleEdit={handleEdit} userData={userData} />
      </>
    );
    
  if (!editMode)
    return (
      <section className="profile-wrapper">
        <img src={userData.personalImage} alt="profile-image" />
        <h3>Welcome, {userData.personalName.split(' ')[0]}!</h3>

        <p>PERSONAL INFO: </p>
        <p>Personal name: {userData.personalName}</p>
        <p>Personal email: {userData.personalEmail}</p>
        <p>BUSINESS INFO (Shown):</p>
        <img
          src={userData.businessImage}
          alt="business-image"
          className="business-image"
        />
        <p>Business Name: {userData.businessName}</p>
        <p>Contact Email: {userData.businessEmail}</p>
        <p>Phone number: {userData.businessPhoneNr}</p>
        <p>Adress: {userData.businessAdress}</p>
        <p>Your Rating: {userData.rating}</p>

        <Button
          action={() => signOut({ callbackUrl: '/' })}
          className="account-button"
          text="Sign Out"
        />
        <Button action={handleEdit} className="account-button" text="Edit" />
      </section>
    );
}
