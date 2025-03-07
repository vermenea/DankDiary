'use client';

import { deletePost } from '@/actions/actions';
import Link from 'next/link';
import { useState } from 'react';

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

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPostList(postList.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <ul className='mb-8'>
      {postList.map((post, index) => (
        <li
          key={post.id}
          className='mb-4 flex items-center justify-center gap-2'
        >
          <Link
            href={`/posts/${post.slug}`}
            className='text-red-600 hover:text-red-800'
          >
            {index + 1}. {post.title}
          </Link>
          <br />
          <button
            onClick={() => handleDelete(post.id)}
            className='px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer'
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
