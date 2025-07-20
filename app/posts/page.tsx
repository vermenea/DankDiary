import prisma from '@/lib/db';
import Link from 'next/link';

import PostsList from './PostsList';

export default async function PostsPage() {
  const posts = await prisma.post.findMany();

  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Link
        href='/'
        className='absolute top-10 text-red-600 hover:text-red-800'
      >
        Go back home
      </Link>
      <h1 className='text-4xl font-bold mb-8'>Posts</h1>
      <PostsList initialPosts={posts} />
    </main>
  );
}
