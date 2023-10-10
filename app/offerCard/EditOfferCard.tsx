import React, { useState } from 'react';
import { OfferCardType } from '../types';
import Button from '../Components/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const showToastMessage = () => {
    const content = 'Submitted';
    const options = {
      position: toast.POSITION.TOP_RIGHT,
    };
    toast.success(content, options);
  };

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
      <form
        onSubmit={handleSubmit}
        className=" form make-offer-form flex flex-col gap-[10px] max-w-[450px] bg-white p-[20px] rounded-md relative mx-auto mt-12"
      >
        <Button
          className=" mx-auto flex   justify-center rounded-md   font-light text-md  hover:bg-accent items-center h-[35px] w-[80px] bg-primary border text-fourth text-md ml-0  "
          action={() => handleEdit()}
          text="Cancel"
        />
        <button onClick={showToastMessage} className=" mx-auto flex   justify-center rounded-md  hover:bg-accent  font-light text-md items-center h-[35px] w-[80px] bg-primary border text-fourth text-md ml-0  ">
          Submit
        </button>

        <label className="relative">
          <input
            className=" input w-full outline-none px-[8px] py-[16px] border-b opacity-40  "
            type="text"
            name="description"
            onChange={handleOnChange}
            value={offerValues.description}
            required
          />
          <span className="form-span">Description</span>
        </label>

        <label className="relative">
          <input
            className=" input w-full outline-none px-[8px] py-[16px] border-b opacity-40  "
            type="text"
            name="available"
            onChange={handleOnChange}
            value={offerValues.available}
            required
          />
          <span className="form-span">Available</span>
        </label>

        <label className="relative">
          <input
            className=" input w-full outline-none px-[8px] py-[16px] border-b opacity-40  "
            type="text"
            name="location"
            onChange={handleOnChange}
            value={offerValues.location}
            required
          />
          <span className="form-span">Location</span>
        </label>

        <label className="relative">
          <input
            className=" input w-full outline-none px-[8px] py-[16px] border-b opacity-40  "
            type="text"
            name="about"
            onChange={handleOnChange}
            value={offerValues.about}
            required
          />
          <span className="form-span">Location</span>
        </label>

        <Button
          action={() => handleDelete()}
          className=" bg-primary hover:bg-accent h-11 cursor-pointer text-fourth font-primary text-lg "
          text="Delete"
        />
        <ToastContainer />
      </form>
    </>
  );
}
