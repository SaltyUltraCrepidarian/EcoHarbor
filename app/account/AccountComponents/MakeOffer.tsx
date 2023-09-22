'use client';
import React, { useState } from 'react';
import './MakeOffer.css';
import { defaultFormValues } from './makeOfferDefaultValues';

const MakeOffer = () => {
  const [offerInfo, setOfferInfo] = useState(defaultFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOfferInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/offer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offerInfo),
    });

    setOfferInfo(defaultFormValues);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.text;
  };

  return (
    <section className="make-offer-wrapper">
      <form onSubmit={handleSubmit} className="make-offer-form">
        <div className="label-input-wrap">
          <label>Description</label>
          <input
            type="text"
            placeholder="what are you offering?"
            name="description"
            onChange={handleChange}
            value={offerInfo.description}
            required
          />
        </div>

        <div className="label-input-wrap">
          <label>Available</label>
          <input
            type="text"
            name="available"
            onChange={handleChange}
            value={offerInfo.available}
            required
          />
        </div>

        <div className="label-input-wrap">
          <label>Location</label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            value={offerInfo.location}
            required
          />
        </div>

        <div className="label-input-wrap">
          <label>About</label>
          <textarea
            name="about"
            cols={30}
            rows={10}
            onChange={handleChange}
            value={offerInfo.about}
            required
          ></textarea>
        </div>

        <button className="account-button">Submit</button>
      </form>
    </section>
  );
};

export default MakeOffer;
