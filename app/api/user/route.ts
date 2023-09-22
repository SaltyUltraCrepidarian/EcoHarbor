import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authHandler } from '../auth/[...nextauth]/route';
import prisma from '@/prisma/prismaConnect';

export async function POST(req: NextRequest, res: NextResponse) {
  const userData = await req.text();
  const userInfoData = await JSON.parse(userData);

  await prisma.userInfo.create({
    data: {
      personalName: userInfoData.personalName,
      personalEmail: userInfoData.personalEmail,
      personalImage: userInfoData.personalImage,
      businessName: userInfoData.businessName,
      businessEmail: userInfoData.businessEmail,
      businessPhoneNr: userInfoData.businessPhoneNr,
      businessImage: userInfoData.businessImage,
      businessAdress: userInfoData.businessAdress,
      rating: userInfoData.rating,
    },
  });
  return new Response('Posted to userInfo');
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authHandler);

  if (session?.user !== null && session?.user?.email !== null) {
    const databaseUser = await prisma.userInfo.findUnique({
      where: {
        personalEmail: session?.user?.email,
      },
    });

    return new Response(JSON.stringify(databaseUser));
  }
}
