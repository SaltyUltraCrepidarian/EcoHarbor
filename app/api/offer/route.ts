import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authHandler } from '../auth/[...nextauth]/route';
import prisma from '@/prisma/prismaConnect';

export async function POST(req: NextRequest, res: NextResponse) {
  const offerInfo = await req.text();
  const offerInfoData = await JSON.parse(offerInfo);

  const session = await getServerSession(authHandler);

  if (session?.user?.email) {
    const databaseUser = await prisma.userInfo.findUnique({
      where: {
        personalEmail: session?.user?.email,
      },
    });
    await prisma.donationInfo.create({
      data: {
        userInfo: {
          connect: {
            id: databaseUser?.id,
          },
        },
        
        userInfoId: offerInfoData.userInfoId,
        description: offerInfoData.description,
        available: offerInfoData.available,
        location: offerInfoData.location,
        about: offerInfoData.about,
      },
    });
  }
  return new Response('Posted to donationInfo');
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const offerId = await req.text();
  const parsedOfferId = await JSON.parse(offerId);

  await prisma.donationInfo.delete({
    where: {
      id: parsedOfferId,
    },
  });
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  const offerInfo = await req.text();
  const offerInfoData = await JSON.parse(offerInfo);

  await prisma.donationInfo.update({
    where: {
      id: offerInfoData.id,
    },
    data: {
      description: offerInfoData.description,
      available: offerInfoData.available,
      location: offerInfoData.location,
      about: offerInfoData.about,
    },
  });
}