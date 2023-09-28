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
      <Navbar />
      <Banner/>
      <Footer/>
      <main className="offer-cards-main main">
        {donationInfo.map((donationOffer, index) => (
          <section className="offer-card-section" key={index}>
            <OfferCard donationOffer={donationOffer} isAdmin={false} />
          </section>
        ))}
      </main>
    </>
  );
}
