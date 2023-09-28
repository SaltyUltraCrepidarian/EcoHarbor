'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { defaultRegistrationValues } from '@/app/account/AccountComponents/makeOfferDefaultValues';
import { useState } from 'react';

export default function Registration() {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState<File | null>(null);
  const [registrationInfo, setRegistrationInfo] = useState(
    defaultRegistrationValues
  );
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <form
      className="make-offer-form"
      onSubmit={handleSubmit(async () => {
        router.refresh();
        router.push('/account');

        if (file) {
          try {
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: file,
              headers: {
                'Content-Type': 'image/jpeg',
              },
            });
          } catch (error) {
            console.error('Error:', error);
          }
        }

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
      <input
        type="file"
        {...register('businessPhoneNr')}
        onChange={handleFileChange}
      />
      <input
        {...register('businessAdress')}
        placeholder="Business Adress"
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );
}
