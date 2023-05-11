import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SinglePost from './SinglePost'

const Search = ({ posts }) => {
  //   const { posts } = useSelector(state => state.posts)
  const navigate = useNavigate()
  const postSingle = post => {
    // <SinglePost post={post} />
    console.log('see post', post)

    navigate(`/postpage/${post.slug}`)
  }

  return (
    <div>
      <div className='grid gap-5 md:grid-cols-12 '>
        {posts.length &&
          posts.map(post => {
            return (
              <div key={post.id} className='col-span-4 '>
                <div className=''>
                  <div className='max-w-xs bg-white rounded-lg shadow-lg'>
                    <div className=''>
                      <img
                        className='rounded-t-lg '
                        src='https://source.unsplash.com/random/'
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
                        onClick={() => postSingle(post)}
                      >
                        Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Search

// const Searchme = () => {
//   return (
//       <Layout>
//           <main>
// 				<div  className='' container spacing={5} alignItems="flex-end">
// 					{appState.posts.map((post) => {
// 						return (
// 							// Enterprise card is full width at sm breakpoint
// 							<Grid item key={post.id} xs={12} md={4}>
// 								<Card className={classes.card}>
// 									<Link
// 										color="textPrimary"
// 										href={'/post/' + post.slug}
// 										className={classes.link}
// 									>
// 										<CardMedia
// 											className={classes.cardMedia}
// 											image="https://source.unsplash.com/random"
// 											title="Image title"
// 										/>
// 									</Link>
// 									<CardContent className={classes.cardContent}>
// 										<Typography
// 											gutterBottom
// 											variant="h6"
// 											component="h2"
// 											className={classes.postTitle}
// 										>
// 											{post.title.substr(0, 50)}...
// 										</Typography>
// 										<div className={classes.postText}>
// 											<Typography color="textSecondary">
// 												{post.excerpt.substr(0, 40)}...
// 											</Typography>
// 										</div>
// 									</CardContent>
// 								</Card>
// 							</Grid>
// 						);
// 					})}
// 				</div>
// 			</main>
//     </Layout>
//   )
// }

// export default Searchme
