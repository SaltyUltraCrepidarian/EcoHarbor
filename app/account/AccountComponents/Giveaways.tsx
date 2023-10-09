import OfferCard from '@/app/offerCard/OfferCard';
import { OfferCardType } from '@/app/types';
import React from 'react';

type Props = {
  donationData: OfferCardType[];
};

export default function Giveaways({ donationData }: Props) {
  return (
    <main className='giveaway-main mt-16'>
      {donationData.map((donation, index) => {
        return (
          <section className="offer-card-section" key={index}>
            <OfferCard donationOffer={donation} isAdmin={true} />
          </section>
        );
      })}
    </main>
  );
}
