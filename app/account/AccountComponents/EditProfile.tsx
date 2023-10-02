import Button from '@/app/Components/Button';
import { User } from '@/app/types';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

type Props = {
  handleEdit: Function;
  userData: User;
};

export default function EditProfile({ handleEdit, userData }: Props) {
  const [profileValues, setProfileValues] = useState<User>({
    personalImage: userData.personalImage,
    personalName: userData.personalName,
    personalEmail: userData.personalEmail,
    businessImage: userData.businessImage,
    businessName: userData.businessName,
    businessEmail: userData.businessEmail,
    businessPhoneNr: userData.businessPhoneNr,
    businessAdress: userData.businessAdress,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const res = await fetch('/api/edit-profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileValues),
    });
    setProfileValues(profileValues)
    console.log(res);
    return res.text;
  };

  return (
    <section className="profile-wrapper">
      <form onSubmit={handleSubmit}>
        <img src={userData.personalImage} alt="profile-image" />
        <h3>Welcome, {userData.personalName.split(' ')[0]}!</h3>
        <p>PERSONAL INFO: </p>
        <div className="label-input-wrap">
          <label>Personal Name:</label>
          <input
            type="text"
            name="personalName"
            onChange={handleOnChange}
            value={profileValues.personalName}
            required
          />
        </div>
        <div className="label-input-wrap">
          <p>BUSINESS INFO (Shown):</p>
          <label>Business Image:</label>
          <img
            className=" w-[250px] rounded-md"
            src={userData.businessImage}
            alt="business-image"
          />

          <ImageUpload />
        </div>
        <div className="label-input-wrap">
          <label>Business Name:</label>
          <input
            type="text"
            name="businessName"
            onChange={handleOnChange}
            value={profileValues.businessName}
            required
          />
        </div>
        <div className="label-input-wrap">
          <label>Business Email:</label>
          <input
            type="text"
            name="businessEmail"
            onChange={handleOnChange}
            value={profileValues.businessEmail}
            required
          />
        </div>
        <div className="label-input-wrap">
          <label>Phone Number:</label>
          <input
            type="text"
            name="businessPhoneNr"
            onChange={handleOnChange}
            value={profileValues.businessPhoneNr}
            required
          />
        </div>
        <div className="label-input-wrap">
          <label>Business Adress:</label>
          <input
            type="text"
            name="businessAdress"
            onChange={handleOnChange}
            value={profileValues.businessAdress}
            required
          />
        </div>
        <button className=" mx-auto flex   justify-center rounded-md   font-light text-md items-center h-[35px] w-[80px] bg-primary border text-fourth text-md ml-0  ">
          Submit
        </button>
      </form>
      <section className='flex fex-row w-[150px]'>
        <Button
          action={handleEdit}
          className=" mx-auto flex  justify-center rounded-md   font-light text-md items-center h-[35px] w-[80px] border-primary border text-primary text-md ml-0 mt-3 "
          text="Cancel"
        />

        <Button
          action={() => alert('Delete Selected')}
          className=" mx-auto flex  justify-center rounded-md   font-light text-md items-center h-[35px] w-[80px] border-primary border text-primary text-md ml-0  mt-3 "
          text="Delete"
        />
      </section>
    </section>
  );
}
