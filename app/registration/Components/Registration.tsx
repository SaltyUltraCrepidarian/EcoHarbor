'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { defaultRegistrationValues } from '@/app/account/AccountComponents/makeOfferDefaultValues';
import { useState } from 'react';

export default function Registration() {
  const { register, handleSubmit } = useForm();
  const [registrationInfo, setRegistrationInfo] = useState(
    defaultRegistrationValues
  );
  const router = useRouter();

  // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   router.push('/account');

  //   try {
  //     const res = await fetch('/api/registration', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(registrationInfo),
  //     });

  //     setRegistrationInfo(defaultRegistrationValues);
  //     return res.text;
  //   } catch (err) {
  //     console.error('Failed to fetch data', err);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form
      className="make-offer-form"
      onSubmit={handleSubmit(async () => {
        router.refresh()
        router.push('/account');

        try {
          const res = await fetch('/api/registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationInfo),
          });

          setRegistrationInfo(defaultRegistrationValues);
          return res.text;
        } catch (err) {
          console.error('Failed to fetch data', err);
        }
      })}
    >
      <input
        {...register('businessName')}
        placeholder="Business Name"
        onChange={handleChange}
      />
      <input
        {...register('businessEmail')}
        placeholder="Business Email"
        onChange={handleChange}
      />
      <input
        {...register('businessPhoneNr')}
        placeholder="Contact Number"
        onChange={handleChange}
      />
      {/* ImageUpload */}
      <input
        {...register('businessAdress')}
        placeholder="Business Adress"
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );
}
