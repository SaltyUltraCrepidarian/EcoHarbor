import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authHandler } from '../auth/[...nextauth]/route';
import prisma from '@/prisma/prismaConnect';

export async function PATCH(req: NextRequest, res: NextResponse) {
  const updatedUserProfile = await req.text();
  const updatedUserProfileData = JSON.parse(updatedUserProfile);

  const session = await getServerSession(authHandler);

  if (session?.user?.email) {
    await prisma.userInfo.update({
      where: {
        personalEmail: session.user.email,
      },
      data: {
        personalName: updatedUserProfileData.personalName,
        businessName: updatedUserProfileData.businessName,
        businessEmail: updatedUserProfileData.businessEmail,
        //  businessImage: updatedUserProfile.businessImage,
        businessPhoneNr: updatedUserProfileData.businessPhoneNr,
        businessAdress: updatedUserProfileData.businessAdress,
      },
    });
  }
  return new Response('Updated User Information');
}
