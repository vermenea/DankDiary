'use server';

import { z } from 'zod';
import prisma from '@/lib/db';
import { revalidatePath, revalidateTag } from 'next/cache';
import { slugify } from '@/lib/slug';

const PostSchema = z.object({
  title: z.string().min(1, 'Add a title').max(120),
  content: z.string().min(1, 'You have to enter content of a post').max(5000),
});

type ActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

async function getUniqueSlug(base: string) {
  const baseSlug = slugify(base) || 'post';
  let s = baseSlug;
  let i = 1;
  while (await prisma.post.findUnique({ where: { slug: s } })) {
    s = `${baseSlug}-${i++}`;
  }
  return s;
}

export async function createPost(formData: FormData): Promise<ActionResult> {
  const raw = {
    title: String(formData.get('title') ?? ''),
    content: String(formData.get('content') ?? ''),
  };

  const parsed = PostSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? 'Błąd walidacji',
    };
  }

  const slug = await getUniqueSlug(parsed.data.title);

  await prisma.post.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      slug,
    },
  });

  revalidatePath('/posts');
  revalidateTag('posts');

  return { ok: true, message: 'Post has been created!' };
}

export async function editPost(
  formData: FormData,
  id: string
): Promise<ActionResult> {
  const raw = {
    title: String(formData.get('title') ?? ''),
    content: String(formData.get('content') ?? ''),
  };

  const parsed = PostSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? 'Validation error',
    };
  }

  const slug = await getUniqueSlug(parsed.data.title);

  await prisma.post.update({
    where: { id },
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      slug,
    },
  });

  revalidatePath('/posts');
  revalidateTag('posts');

  return { ok: true, message: 'Updated post' };
}

export async function deletePost(id: string): Promise<ActionResult> {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath('/posts');
    revalidateTag('posts');
    return { ok: true, message: 'Post has been deleted' };
  } catch {
    return { ok: false, message: "Sorry right now post couldn't be deleted" };
  }
}
