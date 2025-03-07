import prisma from '@/lib/db';

interface Params {
  slug: string;
}

export default async function PostsSingularPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });
  console.log(post?.content);
  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
