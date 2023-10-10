import Button from '@/app/Components/Button';
import { RegistrationFormValues, User } from '@/app/types';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const showToastMessage = () => {
    const content = 'Submitted';
    const options = {
      position: toast.POSITION.TOP_RIGHT,
    };
    toast.success(content, options);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form
        className=" form font-primary  make-offer-form flex flex-col gap-[10px] max-w-[450px] lg:max-w-[600px] bg-white p-[20px] rounded-md relative mx-auto mt-20"
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
            showToastMessage();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
          return res.text;
        })}
      >
        <p className=" -ml-8 font-primary font-medium  mb-3 text-3xl text-primary tracking-tighter relative flex items-center pl-[30px]">
          Edit your profile
        </p>
        {/* <img src={userData.personalImage} alt="profile-image" className='w-[200px]' /> */}
        {/* <h3>Welcome, {userData.personalName.split(' ')[0]}!</h3> */}
        <p className="font-semibold font-secondary text-lg">PERSONAL INFO: </p>
        <label className="relative">
          <input
            className=" input w-full outline-none px-[10px] py-[16px]  border-b border-l opacity-40 rounded-md "
            type="text"
            name="personalName"
            onChange={handleOnChange}
            value={profileValues.personalName}
            required
          />
          <span className="form-span">Personal Name</span>
        </label>
        <p className="font-semibold font-secondary text-lg">BUSINESS INFO:</p>
        <label>Business Image:</label>
        <img
          className=" w-[250px] rounded-md"
          src={userData.businessImage}
          alt="business-image"
        />

        <ImageUpload />
        <label className="relative">
          <input
            className=" input w-full outline-none px-[10px] py-[16px]  border-b border-l opacity-40 rounded-md "
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
          <span className="form-span">Business Name </span>

          <p className="error-message text-red-600 font-primary text-lg font-light">
            {errors.businessName?.message}
          </p>
        </label>

        <label className="relative">
          <input
            className=" input w-full outline-none px-[10px] py-[16px]  border-b border-l opacity-40 rounded-md "
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
          <span className="form-span">Business Email </span>

          <p className="error-message text-red-600 font-primary text-lg font-light">
            {errors.businessEmail?.message}
          </p>
        </label>

        <label className="relative">
          <input
            className=" input w-full outline-none px-[10px] py-[16px]  border-b border-l opacity-40 rounded-md "
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
          <span className="form-span">Phone Number </span>

          <p className="error-message text-red-600 font-primary text-lg font-light">
            {errors.businessPhoneNr?.message}
          </p>
        </label>

        <label className="relative">
          <input
            className=" input w-full outline-none px-[10px] py-[16px]  border-b border-l opacity-40 rounded-md "
            {...register('businessAdress', {
              required: {
                value: true,
                message: 'Please, insert your business adress.',
              },
            })}
            placeholder="Business Address *"
            onChange={handleOnChange}
            value={profileValues.businessAdress}
          />
          <span className="form-span">Business Address </span>

          <p className="error-message text-red-600 font-primary text-lg font-light">
            {errors.businessAdress?.message}
          </p>
        </label>

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
          className=" mx-auto flex  justify-center rounded-md   font-light text-md items-center h-[35px] w-[100px] border-primary border text-primary text-md ml-0 mt-3 mr- "
          text="Cancel"
        />

        <Button
          action={() => alert('Delete Selected')}
          className=" mx-auto flex  justify-center rounded-md   font-light text-md items-center h-[35px] w-[100px] border-primary border text-primary text-md ml-0  mt-3 "
          text="Delete"
        />
      </section>
      <ToastContainer />
    </>
  );
}
