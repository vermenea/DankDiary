import prisma from '@/lib/db';
import Link from 'next/link';

export default async function PostsSingularPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Link
        href='/'
        className='absolute top-10 text-red-600 hover:text-red-800'
      >
        Go back home
      </Link>
      <h1>{post.title}</h1>
      <p className='text-center p-2'>{post.content}</p>
    </main>
  );
}
