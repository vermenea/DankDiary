import prisma from '@/lib/db';

export default async function PostsSingularPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!params?.slug) {
    return <p>Post not found</p>;
  }

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
