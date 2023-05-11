// import React from 'react'

import { useLocation } from 'react-router-dom'
import Posts from './Posts'
import AdminPosts from './admin/AdminPosts'

const PostLoading = ({ isLoading, posts }) => {
  const location = useLocation()

  const showLoading = (
    <div className='text-4xl text-blue-700'>waiting for component to load</div>
  )

  return (
    <div>
      {!isLoading && location.pathname === '/postpage'
        ? <Posts posts={posts} />
        : !isLoading && location.pathname === '/postpage/admin'
          ? <AdminPosts posts={posts} />
          : showLoading}
    </div>
  )
}

export default PostLoading

// import React from 'react'

// function PostLoading (Component) {
//   return function PostLoadingComponent ({ isLoading, ...props }) {
//     if (!isLoading) return <Component {...props} />
//     return (
//       <p style={{ fontSize: '25px' }}>
//         We are waiting for the data to load!...
//       </p>
//     )
//   }
// }
// export default PostLoading
