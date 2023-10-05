import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authHandler } from '../auth/[...nextauth]/route';
import prisma from '@/prisma/prismaConnect';

// POST ONE OFFER CARD
export async function POST(req: NextRequest, res: NextResponse) {
  const registrationInfo = await req.text();
  const registrationInfoData = await JSON.parse(registrationInfo);

  const session = await getServerSession(authHandler);


  if (session?.user?.email) {
    await prisma.userInfo.update({
      where: {
        personalEmail: session?.user?.email,
      },
      data: {
        businessName: registrationInfoData.businessName,
        businessEmail: registrationInfoData.businessEmail,
        businessPhoneNr: registrationInfoData.businessPhoneNr,
        businessImage: registrationInfoData.businessImage,
        businessAdress: registrationInfoData.businessAdress,
      },
    });
    return new Response('Posted to donationInfo');
  }
}

