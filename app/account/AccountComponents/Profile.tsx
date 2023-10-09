import Button from '@/app/Components/Button';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import './Profile.css';
import { User } from '@/app/types';
import EditProfile from './EditProfile';
import Registration from '@/app/registration/Components/Registration';
import ImageUpload from './ImageUpload';

type Props = {
  userData: User;
};

export default function Profile({ userData }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [imageUploadMode, setImageUploadMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleImageUpload = () => {
    setImageUploadMode(!imageUploadMode);
  };

  if (editMode)
    return (
      <>
        <EditProfile handleEdit={handleEdit} userData={userData} />
      </>
    );

  if (!editMode)
    return (
      <section className="p-[24px] max-w-[400px] gap-[10px] font-primary leading-7 ">
        <h4 className=" font-medium text-4xl tracking-tighter">
          Welcome, {userData.personalName.split(' ')[0]}!{' '}
          <img
            src={userData.personalImage}
            alt="profile-image"
            className=" w-16 h-16 rounded-md mb-4 inline"
          />
        </h4>

        <div className="flex mx-auto flex-col pb-2 border-b  border-primary">
          <p className=" text-lg font-semibold font-secondary text-primary">
            PERSONAL INFO:{' '}
          </p>
          <p>Personal name: {userData.personalName}</p>
          <p>Personal email: {userData.personalEmail}</p>
        </div>
        <div className="flex mx-auto flex-col pb-2 border-b border-primary ">
          <p className="text-lg font-semibold mt-8 mb-8 font-secondary text-primary">
            BUSINESS INFO :
          </p>

          {imageUploadMode ? (
            <>
              <img
                src={userData.businessImage}
                alt="business-image"
                className=" max-w-[250px] rounded-md mb-8"
              />
              <ImageUpload />
            </>
          ) : (
            <>
              <img
                src={userData.businessImage}
                alt="business-image"
                className=" max-w-[250px] rounded-md mb-8"
              />
              <Button
                action={handleImageUpload}
                className=" mx-auto flex  justify-center rounded-md   font-light text-md items-center h-[35px]  hover:bg-opacity-90  w-[80px] bg-primary border text-fourth text-md ml-0 -mt-7 mb-3 "
                text="Upload"
              />
            </>
          )}

          <p>Business Name: {userData.businessName}</p>
          <p>Contact Email: {userData.businessEmail}</p>
          <p>Phone number: {userData.businessPhoneNr}</p>
          <p>Adress: {userData.businessAdress}</p>
          <p>Your Rating: {userData.rating}</p>
        </div>
        <section className="flex flex-row w-[300px] mt-4">
          <Button
            action={() => signOut({ callbackUrl: '/' })}
            className=" mx-auto flex  justify-center rounded-md   font-light text-md items-center h-[35px]  hover:bg-accent  w-[80px] bg-primary border text-fourth text-md ml-0  "
            text="Sign Out"
          />
          <Button
            action={handleEdit}
            className=" mx-auto flex justify-center rounded-md  font-light text-md items-center h-[35px] w-[80px] hover:bg-accent bg-primary border text-fourth -ml-11 "
            text="Edit"
          />
        </section>
      </section>
    );
}
