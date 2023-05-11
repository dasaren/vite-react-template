import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import TextField from 'components/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, editPost, getPost, getSinglePost } from '../postSlice'
import Button from 'components/Button'
import { getUsers } from 'features/redux-users/myUserSlice'
import slugify from 'react-slugify'


const FirstCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users } = useSelector(store => store.myuser)
  const { tryUser } = useSelector(store => store.myuser)



  function slugifyy(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}

  const [values, setValues] = useState({
    title: '',
    author: '',
    slug: '',
    excerpt: '',
    content: ''
  })


  useEffect(
    () => {
      dispatch(getUsers())
    },
    [dispatch]
  )

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleSelect = e => {
    e.preventDefault()
    console.log('drop-down', e)
  }

  const submitForm = e => {
    e.preventDefault()
    // console.log('unique values', values)
    const title = values.title
    const content = values.content
    const slug = slugifyy(values.title.trim())
    const excerpt = values.excerpt
    // values.slug
    const author = values.author
    dispatch(createPost({ author, title, content, slug, excerpt }))

    navigate('/postpage/admin')
  }

  return (
    <Layout>
      <div className='grid grid-cols-12'>
        <div className='h-screen col-span-4 mr-3 card' />
        <div className='col-span-8'>
          <div>
            <div>
              <form onSubmit={submitForm}>
                <TextField
                  label='title'
                  name='title'
                  autoComplete='title'
                  // value={values.title}
                  onChange={e =>
                    setValues({ ...values, title: e.target.value })}
                />
                {/* <TextField
                  label='excerpt'
                  name='excerpt'
                  value={values.excerpt}
                  onChange={handleChange}
                /> */}
                <TextField
                  label='content'
                  name='content'
                  autoComplete='content'
                  // value={values.content}
                  onChange={e => handleChange(e)}
                />
                <TextField
                  label='excerpt'
                  name='excerpt'
                  autoComplete='excerpt'
                  // value={values.excerpt}
                  onChange={e => handleChange(e)}
                />
                <TextField
                  label='slug'
                  name='slug'
                  type='text'
                  value= {slugify(values.title) }
                  // onChange={e => handleChange(e)}
                />
                <select name='author' id='name'  onChange={e => handleChange(e)} >
                  <option value="">select user</option>
                  {users?.length && users.map((user) =>
                    <option value={user.id} key={user.id}>{ user.id}</option>
                  )
                }
            </select>

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

export default FirstCreate
