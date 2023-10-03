'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { defaultRegistrationValues } from '@/app/account/AccountComponents/makeOfferDefaultValues';
import { useState } from 'react';
import { RegistrationFormValues } from '@/app/types';

export default function Registration() {
  const form = useForm<RegistrationFormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
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
          setRegistrationInfo(registrationInfo)
          setRegistrationInfo(defaultRegistrationValues);
          return res.text;
        } catch (err) {
          console.error('Failed to fetch data', err);
        }
      })}
    >
      <input
        type="text"
        id="businessName"
        {...register('businessName', {
          required: {
            value: true,
            message: 'Please, insert your business name.',
          },
        })}
        placeholder="Business Name *"
        onChange={handleChange}
      />
      <p>{errors.businessName?.message}</p>

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
        onChange={handleChange}
      />
      <p>{errors.businessEmail?.message}</p>

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
        onChange={handleChange}
      />
      <p>{errors.businessPhoneNr?.message}</p>

      <input
        type="file"
        {...register('businessImage')}
        onChange={handleFileChange}
      />

      <input
        {...register('businessAdress', {
          required: {
            value: true,
            message: 'Please, insert your business adress.',
          },
        })}
        placeholder="Business Adress *"
        onChange={handleChange}
      />
      <p>{errors.businessAdress?.message}</p>

      <input type="submit" />
    </form>
  );
}
