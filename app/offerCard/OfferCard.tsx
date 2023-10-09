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
        <div className="relative">
          {isAdmin && (
            <button
              className=" absolute rounded-md  font-light text-md items-center h-[35px] w-[80px] hover:bg-opacity-95 bg-primary bg-opacity-75 mt-1 ml-2 text-fourth"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
          <img
            className="business-image border-r h-[250px] max-w-[200px] object-cover  p-0      "
            src={donationOffer.cardBusinessImage}
            alt="business image"
          />
        </div>

        <div className="offer-card-info font-primary font-light max-w-[200px] tracking-wide ">
          {/* <div className=" tracking-wider "> */}
          <p className="  uppercase font-primary font-semibold leading-1 ">
            {donationOffer.description}
          </p>
          <p className=" h-[150px] mb-60">{donationOffer.about}</p>
          <p className=" text-primary ">{donationOffer.location}</p>
          <p className=" text-black/30 mt-4 h-0">{donationOffer.available}</p>
          {/* </div> */}
        </div>
      </section>
    );
}
