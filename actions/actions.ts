'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  await prisma.post.create({
    data: {
      title: formData.get('title') as string,
      slug: (formData.get('title') as string).toLowerCase().replace(/\s/g, '-'),
      content: formData.get('content') as string,
      image: formData.get('image') as string,
    },
  });

  revalidatePath('/posts');
}

export async function editPost(formData: FormData, id: string) {
  await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: formData.get('title') as string,
      slug: (formData.get('title') as string).toLowerCase().replace(/\s/g, '-'),
      content: formData.get('content') as string,
    },
  });
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/posts');
}