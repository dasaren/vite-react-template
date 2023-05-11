import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import TextField from 'components/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { editPost, getPost, getSinglePost } from '../postSlice'
import Button from 'components/Button'
import slugify from 'react-slugify'

const Edit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  // const id = param
  const { post } = useSelector(store => store.posts)

  // const { title, content, excerpt, status } = post;

  const [values, setValues] = useState({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    id: post.id,
    status: post.status,
    slugify: post.slug,
    author: post.author
  })
  console.log('my values', values)

  useEffect(
    () => {
      dispatch(getPost(id))
    },
    [dispatch]
  )

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value.trim()
    })
  }

  const submitForm = e => {
    e.preventDefault()
    console.log('unique values', values)

    const id = post.id
    const author = post.author
    const title = values.title
    const content = values.content
    const slug = post.slug
    dispatch(editPost({ id, author, title, content, slug }))
    // dispatch (editPost({ id, author, title, content, slug }));
    navigate('/postpage/admin')
  }

  return (
    <Layout>
      <div className='grid grid-cols-12'>
        <div className='col-span-4'>a</div>
        <div className='col-span-8'>
          <div>
            <div>
              <form onSubmit={submitForm}>
                <TextField
                  label='title'
                  name='title'
                  value={values.title}
                  onChange={e =>
                    setValues({ ...values, title: e.target.value.trim() })}
                />
                <TextField
                  label='excerpt'
                  name='excerpt'
                  value={values.excerpt}
                  onChange={handleChange}
                />
                <TextField
                  label='content'
                  name='content'
                  value={values.content}
                  onChange={e => handleChange(e)}
                />
                <TextField
                  label='slug'
                  name='slug'
                  value={slugify(values.title)}
                  onChange={e => handleChange(e)}
                />
                <TextField
                  label='status'
                  type='checkBox'
                  value={values.status}
                  onChange={e => handleChange(e)}
                />
                <Button value='Submit' type='submit' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit
