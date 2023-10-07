'use client';
import React, { useState } from 'react';
import { OfferCardType } from '../types';
import './OfferCard.css';
import EditOfferCard from './EditOfferCard';

type Props = {
  donationOffer: OfferCardType;
  isAdmin: boolean;
};

export default function OfferCard({ donationOffer, isAdmin }: Props) {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  if (editMode)
    return (
      <>
        <EditOfferCard handleEdit={handleEdit} donationOffer={donationOffer} />
      </>
    );

  if (!editMode)
    return (
      <section className="flex rounded-md items-center mx-auto overflow-hidden">
        <img
          className="business-image border-r h-[250px] max-w-[200px] object-cover  p-0      "
          src={donationOffer.cardBusinessImage}
          alt="do-better-next-time"
        />
        <div className="offer-card-info font-primary font-light max-w-[200px] tracking-wide ">
          {isAdmin && (
            <button
            className="  flex justify-center rounded-md  font-light text-md items-center h-[35px] w-[80px] hover:bg-accent bg-primary border text-fourth "
            onClick={handleEdit}
            >
              Edit
            </button>
          )}
          <p>Description: {donationOffer.description}</p>
          <p>Available: {donationOffer.available}</p>
          <p>Location: {donationOffer.location}</p>
          <p>About: {donationOffer.about}</p>
        </div>
      </section>
    );
}
