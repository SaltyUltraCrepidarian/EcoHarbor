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
      <>
        <section className="flex rounded-md  mx-auto overflow-hidden flex-row">
          <div className="relative w-full">
            {isAdmin && (
              <button
                className=" absolute rounded-md  font-light text-md items-center h-[35px] w-[80px] hover:bg-opacity-95 bg-primary bg-opacity-75 mt-1 ml-2 text-fourth"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
            <img
              className=" border-r h-[180px] w-[300px] object-cover  p-0 "
              src={donationOffer.cardBusinessImage}
              alt="business image"
            />
          </div>
        </section>
        <div className="  p-2 offer-card-info font-primary font-light w-full tracking-wide  ">
          {/* <div className=" tracking-wider "> */}
          <p className="  uppercase font-primary font-semibold overflow-scroll ">
            {donationOffer.description}
          </p>
          <p className=" ">{donationOffer.about}</p>
          <p className=" text-primary border-b pb-1  mb-4 w-full ">{donationOffer.location}</p>
          <p className=" text-black/30  ">{donationOffer.available}</p>
          {/* </div> */}
        </div>
      </>
    );
}
