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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
       setFile(selectedFile);
    }
    console.log('this is file: ', file);
  };

  return (
    <form
      className=" form make-offer-form flex flex-col gap-[10px] max-w-[350px] bg-white p-[20px] rounded-md relative mx-auto mt-20"
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
          setRegistrationInfo(registrationInfo);
          setRegistrationInfo(defaultRegistrationValues);
          return res.text;
        } catch (err) {
          console.error('Failed to fetch data', err);
        }
      })}
    >
      <p className=" title font-primary font-medium text-3xl text-primary tracking-tighter relative flex items-center pl-[30px]">
        Register
      </p>
      <p className=" text-black/54 opacity-30 font-light text-md">
        Register and get full access to our App
      </p>
      <label>
        <input
          type="file"
          {...register('businessImage')}
          onChange={handleFileChange}
        />

      </label>
      <label className=" relative">
        <input
          className=" input w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-40 rounded-md "
          {...register('businessName', {
            required: {
              value: true,
              message: 'Please, insert your business name.',
            },
            
          })}
          placeholder="Business Name *"
          onChange={handleChange}
          
        />
        <span className='form-span'>Business Name</span>
        <p className="error-message text-red-600 font-primary text-lg font-light">{errors.businessName?.message}</p>
      </label>
      <label className=" relative">
        <input
     
          className=" input w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-40 rounded-md "
          {...register('businessEmail', {
            required: 'Please, insert your email.',
            pattern: {
              value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              message:
                'Please, insert your real email, in the format xxx@xxx.xxx.',
            },
          })}
          placeholder="Business Email *"
          onChange={handleChange}
          // onFocus={(e) => e.target.nextElementSibling!.classList.add('focused')}
          // onBlur={(e) => {
          //   if (!e.target.value) {
          //     e.target.nextElementSibling!.classList.remove('focused');
          //   }
          // }}
        />
        <span className='form-span'>Business Email</span>

        <p className="error-message text-red-600 font-primary text-lg font-light">{errors.businessEmail?.message}</p>
      </label>
      <label htmlFor="" className=" relative">
        <input
          className=" input w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-40 rounded-md "
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
        <span className='form-span'>Contact Number</span>
        <p className="error-message text-red-600 font-primary text-lg font-light">{errors.businessPhoneNr?.message}</p>
      </label>
      <label htmlFor="" className=" relative">
        <input
          className=" input w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-40 rounded-md "
          {...register('businessAdress', {
            required: {
              value: true,
              message: 'Please, insert your business adress.',
            },
          })}
          placeholder="Business Adress *"
          onChange={handleChange}
        />
        <span className='form-span'>Business Adress</span>
        <p className="error-message text-red-600 font-primary text-lg font-light">{errors.businessAdress?.message}</p>
      </label>

      <input className=' bg-primary h-11 cursor-pointer text-fourth font-primary text-lg ' type="submit" />
    </form>
  );
}
