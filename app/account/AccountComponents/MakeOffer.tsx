'use client';
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import './MakeOffer.css';
import { defaultFormValues } from './makeOfferDefaultValues';
import { useForm } from 'react-hook-form';
import { OfferCardType } from '@/app/types';

const MakeOffer = () => {
  const form = useForm<OfferCardType>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [offerInfo, setOfferInfo] = useState(defaultFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOfferInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const res = await fetch('/api/offer', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(offerInfo),
  //   });

  //   setOfferInfo(defaultFormValues);

  //   if (!res.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  //   return res.text;
  // };

  return (
    <form
      className=" form make-offer-form flex flex-col gap-[10px] max-w-[450px] bg-white p-[20px] rounded-md relative mx-auto mt-20"
      onSubmit={handleSubmit(async () => {
        if (offerInfo) {
          try {
            const res = await fetch('/api/offer', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(offerInfo),
            });

            form.reset(defaultFormValues);

            setOfferInfo(offerInfo);
            if (!res.ok) {
              throw new Error('Failed to fetch data');
            }

            return res.text;
          } catch (err) {
            console.error('failed to fetch data', err);
          }
        }
      })}
    >
      <p className=" title font-primary font-medium text-3xl text-primary tracking-tighter relative flex items-center pl-[30px]">
        Make a Donation
      </p>

      <label className=" relative">
        <input
          className=" input w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-40 rounded-md "
          {...register('description', {
            required: {
              value: true,
              message: "Please, tell us what you're offering",
            },
            maxLength: {
              value: 20,
              message: ' Description cannot be longer than 20 characters',
            },
          })}
          placeholder="what are you offering?"
          onChange={handleChange}
        />
        <span className="form-span">Description</span>
        <p className="error-message text-red-600 font-primary text-lg font-light">
          {' '}
          {errors.description?.message}
        </p>
      </label>

      <label className="relative">
        <input
          className=" input w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-40 rounded-md "
          {...register('available', {
            required: {
              value: true,
              message: ' Please insert a time or day',
            },
            maxLength: {
              value: 30,
              message: 'Limit is 30 characters',
            },
          })}
          placeholder="When"
          onChange={handleChange}
        />
        <span className="form-span">Availabe from</span>
        <p className="error-message text-red-600 font-primary text-lg font-light">
          {errors.available?.message}
        </p>
      </label>

      <label className="relative">
        <input
          className=" input w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-40 rounded-md "
          {...register('location', {
            required: {
              value: true,
              message: 'Please enter where it can be picked up from',
            },
            maxLength: {
              value: 30,
              message: 'Limit is 15 characters ',
            },
          })}
          placeholder="Where"
          onChange={handleChange}
        />
        <span className="form-span">Location</span>
        <p className="error-message text-red-600 font-primary text-lg font-light">
          {errors.location?.message}
        </p>
      </label>

      <label className="relative">
        <textarea
          className=" input w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-40 rounded-md "
          {...register('about', {
            required: {
              value: true,
              message: 'Sounds yummy! tell us a bit more :)',
            },
            minLength: {
              value: 8,
              message: 'Please write a little more information',
            },
            maxLength: {
              value: 80,
              message: 'Max limit exceeded',
            },
          })}
          cols={30}
          rows={10}
          onChange={handleChange}
        ></textarea>
         <span className='form-span'>About</span>
        <p className="error-message text-red-600 font-primary text-lg font-light">{errors.about?.message}</p>
      </label>
      <input
        type="submit"
        className=" bg-primary hover:bg-accent h-11 cursor-pointer text-fourth font-primary text-lg "
      />
    </form>
  );
};

export default MakeOffer;
