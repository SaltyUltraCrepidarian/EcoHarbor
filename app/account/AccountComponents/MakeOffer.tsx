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
    <section className="make-offer-wrapper">
      <form
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

              form.reset(defaultFormValues)
            
                setOfferInfo(offerInfo)
              if (!res.ok) {
                throw new Error('Failed to fetch data');
              }

              return res.text;
            } catch (err) {
              console.error('failed to fetch data', err);
            }
          }
        })}
        className="make-offer-form"
      >
        <div className="label-input-wrap">
          <label>Description</label>
          <input
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

          <p>{errors.description?.message}</p>
        </div>

        <div className="label-input-wrap">
          <label>Available</label>
          <input
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
          <p>{errors.available?.message}</p>
        </div>

        <div className="label-input-wrap">
          <label>Location</label>
          <input
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
          <p>{errors.location?.message}</p>
        </div>

        <div className="label-input-wrap">
          <label>About</label>
          <textarea
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
          <p>{errors.about?.message}</p>
        </div>
        <input
          type="submit"
          className=" bg-primary h-11 cursor-pointer text-fourth font-primary text-lg "
        />
      </form>
    </section>
  );
};

export default MakeOffer;
