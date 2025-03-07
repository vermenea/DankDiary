import { createPost } from '@/actions/actions';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Link
        href='/posts'
        className='absolute top-10 text-red-600 hover:text-red-800'
      >
        View posts
      </Link>
      <h1 className='text-4xl'>Welcome to my small blog :3</h1>

      <h2 className='text-2xl mt-12'>Create a post</h2>
      <form
        className='flex flex-col items-center justify-center w-full max-w-md  p-6 rounded-lg shadow-md'
        action={createPost}
      >
        <input
          type='text'
          name='title'
          placeholder='Title'
          className='w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'
        />
        <textarea
          name='content'
          placeholder='Content'
          className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'
        />
        <button
          type='submit'
          className='w-full p-2 bg-red-800 text-white rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-600'
        >
          Create post
        </button>
      </form>
    </main>
  );
}
