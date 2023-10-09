import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authHandler } from '../auth/[...nextauth]/route';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/prisma/prismaConnect';
const supabase = createClient(
  String(process.env.PROJECT_URL),
  String(process.env.SERVICE_ROLE),
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

const getUserId = async () => {
  const session = await getServerSession(authHandler);
  if (session?.user?.email) {
    const user = await prisma.userInfo.findUnique({
      where: {
        personalEmail: session?.user?.email,
      },
    });
    return user?.id;
  }
};

async function uploadFile(file: Blob, userId: number) {
  const uuidFileName = uuidv4() + '.jpg';
  const { data, error } = await supabase.storage
    .from('user-images')
    .upload(userId + '/' + uuidFileName, file);
  if (error) {
    console.error(error);
  } else {
    return data;
  }
}

const addImageUrlToUser = async (fileUrl: string) => {
  const session = await getServerSession(authHandler);
  if (session?.user?.email) {
    await prisma.userInfo.update({
      where: {
        personalEmail: session?.user?.email,
      },
      data: {
        businessImage: fileUrl,
      },
    });
    return new Response('Image URL added to user');
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  const fileBuffer = await req.blob();
  const userId = await getUserId();
  const uploadedFile = userId && (await uploadFile(fileBuffer, userId));
  if (uploadedFile && uploadedFile.path) {
    const fileUrl =
      'https://kdkdfxqzjaigzdizmryv.supabase.co/storage/v1/object/public/user-images/' +
      uploadedFile.path;
    const status = addImageUrlToUser(fileUrl);
  }
  return new Response('Image Uploaded', res);
}