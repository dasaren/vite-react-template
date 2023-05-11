import Layout from 'components/Layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSinglePost } from './postSlice'

const SinglePost = () => {
  const dispatch = useDispatch()
    let  slug  = useParams()
  console.log('single', slug)
  const { singlePost } = useSelector(state => state.posts)
  let post = singlePost
  console.log('you', post)
  useEffect(
    () => {
      dispatch(getSinglePost(slug))
    },
    [dispatch]
  )
  return (
    <Layout>
      {post?.id &&
        <div className='grid gap-5 mx-auto md:grid-cols-12'>
          <div key={post.id} className='col-span-4 '>
            <div className=''>
              <div className='max-w-xs bg-white rounded-lg shadow-lg'>
                <div className=''>
                  <img
                    className='rounded-t-lg '
                    src={post.image}
                    alt='img'
                  />
                </div>
                <div className='p-6'>
                  <h5 className='mb-2 text-xl font-medium text-gray-900'>
                    {post.title.substr(0, 20)}
                  </h5>
                  <p className='mb-4 text-base text-gray-700'>
                    {post.excerpt.substr(0, 60)}...
                  </p>
                  <button
                    type='button'
                    className=' inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                  >
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </Layout>
  )
}

export default SinglePost
