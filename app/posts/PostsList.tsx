'use client';

import { deletePost } from '@/actions/actions';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface Post {
  id: string;
  slug: string;
  title: string;
}

interface PostsListProps {
  initialPosts: Post[];
}

export default function PostsList({ initialPosts }: PostsListProps) {
  const [postList, setPostList] = useState(initialPosts);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const snapshot = postList;
    setPendingId(id);
    setPostList((prev) => prev.filter((p) => p.id !== id));

    const res = await deletePost(id);

    if (!res.ok) {
      setPostList(snapshot);
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }

    setPendingId(null);
  };

  if (postList.length === 0) {
    return <p className="text-sm text-gray-500">Brak postów.</p>;
  }

  return (
    <ul className="mb-8">
      {postList.map((post, index) => {
        const isPending = pendingId === post.id;
        return (
          <li key={post.id} className="mb-4 flex items-center justify-center gap-2">
            <Link href={`/posts/${post.slug}`} className="text-red-600 hover:text-red-800">
              {index + 1}. {post.title}
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              disabled={isPending}
              className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
            >
              {isPending ? 'Deleting…' : 'Delete'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
