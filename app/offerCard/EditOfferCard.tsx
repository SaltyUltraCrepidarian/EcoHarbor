import React, { useState } from 'react';
import { OfferCardType } from '../types';
import Button from '../Components/Button';

type Props = {
  handleEdit: Function;
  donationOffer: OfferCardType;
};

export default function EditOfferCard({ handleEdit, donationOffer }: Props) {
  const [offerValues, setOfferValues] = useState<OfferCardType>({
    id: donationOffer.id,
    description: donationOffer.description,
    available: donationOffer.available,
    location: donationOffer.location,
    about: donationOffer.about,
    createdAt: donationOffer.createdAt,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = async () => {
    const res = await fetch('/api/offer', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationOffer.id),
    });
    return res.text;
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/offer', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offerValues),
    });
    return res.text;
  };
  return (
    <>
      <section className="offer-card-section">
        <form onSubmit={handleSubmit}>
          <Button
            action={() => handleEdit()}
            className="account-button"
            text="Cancel"
          />
          <button className="account-button">Submit</button>

          <div className="label-input-wrap">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              onChange={handleOnChange}
              value={offerValues.description}
              required
            />
          </div>

          <div className="label-input-wrap">
            <label>Available:</label>
            <input
              type="text"
              name="available"
              onChange={handleOnChange}
              value={offerValues.available}
              required
            />
          </div>

          <div className="label-input-wrap">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              onChange={handleOnChange}
              value={offerValues.location}
              required
            />
          </div>

          <div className="label-input-wrap">
            <label>About:</label>
            <input
              type="text"
              name="about"
              onChange={handleOnChange}
              value={offerValues.about}
              required
            />
          </div>

          <p>Created at: {String(donationOffer.createdAt)}</p>
          <Button
            action={() => handleDelete()}
            className="account-button"
            text="Delete"
          />
        </form>
      </section>
    </>
  );
}
