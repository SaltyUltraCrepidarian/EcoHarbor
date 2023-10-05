import Button from '@/app/Components/Button';
import { RegistrationFormValues, User } from '@/app/types';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { useForm } from 'react-hook-form';

type Props = {
  handleEdit: Function;
  userData: User;
};

export default function EditProfile({ handleEdit, userData }: Props) {
  const form = useForm<RegistrationFormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

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

  return (
    <section className="profile-wrapper">
      <form
        onSubmit={handleSubmit(async () => {
          const res = await fetch('/api/edit-profile', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileValues),
          });
          setProfileValues(profileValues);
          if (res.status === 200) {
            window.location.reload();
          }
          return res.text;
        })}
      >
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
            {...register('businessName', {
              required: {
                value: true,
                message: 'Please, insert your business name.',
              },
            })}
            placeholder="Business Name *"
            onChange={handleOnChange}
            value={profileValues.businessName}
          />
          <p className="error-message">{errors.businessName?.message}</p>
        </div>

        <div className="label-input-wrap">
          <label>Business Email:</label>
          <input
            {...register('businessEmail', {
              required: 'Please, insert your email.',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message:
                  'Please, insert your real email, in the format xxx@xxx.xxx.',
              },
            })}
            placeholder="Business Email *"
            onChange={handleOnChange}
            value={profileValues.businessEmail}
          />
          <p className="error-message">{errors.businessEmail?.message}</p>
        </div>

        <div className="label-input-wrap">
          <label>Phone Number:</label>
          <input
            {...register('businessPhoneNr', {
              pattern: {
                value: /^\+[\d\s]+$/g,
                message: 'The phone number must have the format +xx xxxxxx.',
              },
              minLength: {
                value: 6,
                message:
                  'Please, insert your real phone number (with at least 6 digits).',
              },
            })}
            placeholder="Contact Number"
            onChange={handleOnChange}
            value={profileValues.businessPhoneNr}
          />
          <p className="error-message">{errors.businessPhoneNr?.message}</p>
        </div>

        <div className="label-input-wrap">
          <label>Business Adress:</label>
          <input
            {...register('businessAdress', {
              required: {
                value: true,
                message: 'Please, insert your business adress.',
              },
            })}
            placeholder="Business Adress *"
            onChange={handleOnChange}
            value={profileValues.businessAdress}
          />
          <p className="error-message">{errors.businessAdress?.message}</p>
        </div>

        <button
          type="submit"
          className=" mx-auto flex   justify-center rounded-md   font-light text-md items-center h-[35px] w-[80px] bg-primary border text-fourth text-md ml-0  "
        >
          Submit
        </button>
      </form>
      <section className="flex fex-row w-[150px]">
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
