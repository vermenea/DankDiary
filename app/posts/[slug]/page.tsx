import prisma from '@/lib/db';

export default async function PostsSingularPage({
  params,
} : {
  params: {
    slug: string;
  };
}) {

  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });
  
  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
