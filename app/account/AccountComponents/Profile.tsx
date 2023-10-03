import Button from '@/app/Components/Button';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import './Profile.css';
import { User } from '@/app/types';
import EditProfile from './EditProfile';
import Registration from '@/app/registration/Components/Registration';

type Props = {
  userData: User;
};

export default function Profile({ userData }: Props) {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  if (!userData)
    return (
      <>
        <Registration />
      </>
    );

  if (editMode)
    return (
      <>
        <EditProfile handleEdit={handleEdit} userData={userData} />
      </>
    );

  if (!editMode)
    return (
      <section className="p-[24px] font-primary leading-7 tracking-wider">
        <h4 className=" font-semibold text-4xl">
          Welcome, {userData.personalName.split(' ')[0]}!{' '}
          <img
            src={userData.personalImage}
            alt="profile-image"
            className=" w-16 h-16 rounded-md mb-4 inline"
          />
        </h4>

        <p className=" text-xl font-semibold">PERSONAL INFO: </p>
        <p className="">Personal name: {userData.personalName}</p>
        <p>Personal email: {userData.personalEmail}</p>
        <p className="text-xl font-semibold mt-8 mb-8">BUSINESS INFO :</p>
        <img
          src={userData.businessImage}
          alt="business-image"
          className=" max-w-[250px] rounded-md mb-8"
        />
        <p>Business Name: {userData.businessName}</p>
        <p>Contact Email: {userData.businessEmail}</p>
        <p>Phone number: {userData.businessPhoneNr}</p>
        <p>Adress: {userData.businessAdress}</p>
        <p>Your Rating: {userData.rating}</p>
        <section className="flex flex-row w-[300px] mt-4">
          <Button
            action={() => signOut({ callbackUrl: '/' })}
            className=" mx-auto flex  justify-center rounded-md   font-light text-md items-center h-[35px]  hover:bg-opacity-90  w-[80px] bg-primary border text-fourth text-md ml-0  "
            text="Sign Out"
          />
          <Button
            action={handleEdit}
            className=" mx-auto flex justify-center rounded-md   font-light text-md items-center h-[35px] w-[80px] hover:bg-opacity-90 bg-primary border text-fourth -ml-11 "
            text="Edit"
          />
        </section>
      </section>
    );
}
