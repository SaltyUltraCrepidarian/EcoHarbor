// import { PrismaClient } from '@prisma/client';
// import './landingPage.css';
// import OfferCard from '../offerCard/OfferCard';

// const prisma = new PrismaClient();

// const fetchDonationInfo = async () => {
//   const donationInfo = await prisma.donationInfo.findMany({
//     select: {
//       id: true,
//       description: true,
//       available: true,
//       location: true,
//       about: true,
//       createdAt: true,
//     },
//   });

//   return donationInfo;
// };

// export default async function LandingPage() {
//   const donationInfo = await fetchDonationInfo();

//   return (
//     <>
//       <main className="offer-cards-main">
//         <div className="">
//           {donationInfo.map((donationOffer) => (
//             <OfferCard donationOffer={donationOffer} isAdmin={false} />
//           ))}
//         </div>
//       </main>
//     </>
//   );
// }
