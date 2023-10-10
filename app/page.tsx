export const dynamic = 'force-dynamic';
import OfferCard from './offerCard/OfferCard';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import prisma from '@/prisma/prismaConnect';
import Banner from './Components/Banner';

const fetchDonationInfo = async () => {
  const donationInfo = await prisma.donationInfo.findMany({
    select: {
      id: true,
      cardBusinessImage: true,
      description: true,
      available: true,
      location: true,
      about: true,
      createdAt: true,
    },
  });

  return donationInfo;
};

export default async function Home() {
  const donationInfo = await fetchDonationInfo();

  return (
    <>
      <Footer />
      <main className="offer-cards-main main  ">
        <div className=" overflow-x-auto">
          <div className="flex gap-x-4 mt-20 mb-11">
            {donationInfo.map((donationOffer, index) => (
              <section
                className="offer-card-section flex-shrink-0 h-full bg-white "
                key={index}
              >
                <OfferCard donationOffer={donationOffer} isAdmin={false} />
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
