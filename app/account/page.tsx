export const dynamic = 'force-dynamic';

import React from 'react';
import AccountPage from './AccountComponents/AccountPage';
import { getServerSession } from 'next-auth';
import { authHandler } from '../api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { User } from '../types';
import prisma from '@/prisma/prismaConnect';

const fetchUserData = async () => {
  const session = await getServerSession(authHandler);
  if (session?.user !== null && session?.user?.email !== null) {
    const databaseUser = await prisma.userInfo.findUnique({
      where: {
        personalEmail: session?.user?.email,
      },
    });
    return databaseUser as User;
  }
  if (!session) throw new Error();
};

const fetchUserOffers = async () => {
  const userData = await fetchUserData();

  if (userData) {
    const userDonations = await prisma.donationInfo.findMany({
      where: {
        userInfoId: userData?.id,
      },
    });

    return userDonations;
  }
};

export default async function page() {
  const userData = await fetchUserData();
  const donationData = await fetchUserOffers();

  if (userData && donationData) {
    return (
      <>
        <AccountPage userData={userData} donationData={donationData} />
      </>
    );
  }
}
