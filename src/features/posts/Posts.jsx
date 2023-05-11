import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import SinglePost from './SinglePost'

const Posts = ({ posts }) => {
  //   const { posts } = useSelector(state => state.posts)
  const navigate = useNavigate()

  const postSingle = post => {
    // <SinglePost post={post} />
    console.log('see post', post)

    navigate(`/postpage/${post.slug}`)
  }

  // // 👇️ http://localhost:3001/about
  // console.log(window.location.href)

  // // 👇️ /about
  // console.log(window.location.pathname)

  // // 👇️ http:
  // console.log(window.location.protocol)

  // // localhost
  // console.log('sd', window.location.search)

  // const location = useLocation()
  // console.log('hash', location.hash)
  // console.log('pathname', location.pathname)
  // console.log('search', location.search)

  return (
    <div className='mb-6'>
      <div className='grid gap-5  lg:grid-cols-12  md:grid-cols-6  sm:grid-cols-2 md:grid-flow-row  max-md:justify-center'>
        {posts.length
          ? posts.map(post => {
            return (
              <div key={post.id} className='lg:col-span-4  md:col-span-2 sm:col-span-1'>
                <div className=''>
                  <div className='max-w-xs bg-white rounded-lg shadow-lg'>
                    <div className=''>
                      <img
                        className='rounded-t-lg h-[280px] '
                        src={post.image}
                        alt='img'
                      
                        />
                    </div>
                    <div className='p-6'>
                      <h5 className='mb-2 text-xl font-medium text-gray-900'>
                        {post.title.substr(0, 20)}
                      </h5>
                      <p className='mb-4 text-base text-gray-700'>
                        {post.excerpt?.length &&    post.excerpt.substr(0, 20)}...
                        </p>
                      <p className='mb-4 text-base text-gray-700'>
                        {post.content.substr(0, 60)}...
                        </p>

                      <button
                        type='button'
                        className=' inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                        onClick={() => postSingle(post)}
                        >
                          Button
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          : <div className='w-screen p-6 mx-auto text-4xl text-center text-blue-600 card'>
              Item you are looking for does not exist
            </div>}
      </div>
    </div>
  )
}

export default Posts
