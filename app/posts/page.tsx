import prisma from '@/lib/db';
import PostsList from './PostsList';

export default async function PostsPage() {
  const posts = await prisma.post.findMany();

  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold mb-8'>Posts</h1>
      <PostsList initialPosts={posts} />
    </main>
  );
}
