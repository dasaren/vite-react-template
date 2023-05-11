import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import TextField from 'components/TextField'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNewPost,
  createPost,
  editPost,
  getPost,
  getSinglePost,
} from '../postSlice'
import Button from 'components/Button'
import { getUsers } from 'features/redux-users/myUserSlice'
import slugify from 'react-slugify'
import { WindowSharp } from '@mui/icons-material'

const Create = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users } = useSelector((store) => store.myuser)
  const { tryUser } = useSelector((store) => store.myuser)
  const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  function slugifyy(string) {
    const a =
      'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b =
      'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  const [values, setValues] = useState({
    title: '',
    author: '',
    slug: '',
    excerpt: '',
    content: '',
  })
  const [postimage, setPostImage] = useState(null)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleChange = (e) => {
    if ([e.target.name] == 'image') {
      // setPostImage(
      //   {
      // 	image: e.target.files,
      // });
      setPostImage([...e.target.files])
      // console.log('e.target.file:', e.target.files)
      // console.log('e.target.file post Image:', postimage[0])
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handleSelect = (e) => {
    e.preventDefault()
    console.log('drop-down', e)
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log('unique values', values)

    let formData = new FormData()

    formData.append('title', values.title)
    formData.append('slug', slugifyy(values.title))
    formData.append('author', values.author)
    formData.append('excerpt', values.excerpt)
    formData.append('content', values.content)
    formData.append('image', postimage[0])

    console.log('firmdata with image:   ', formData)

    const title = values.title
    const content = values.content
    const slug = slugifyy(values.title.trim())
    const excerpt = values.excerpt
    // values.slug
    const author = values.author
    const image = postimage[0]
    // dispatch(createPost({title, slug, author, excerpt, image, content}))
    dispatch(createPost(formData))

    navigate('/postpage/admin')
    // windows.location.reload()
  }

  return (
    <Layout>
      <div className="grid grid-cols-12">
        <div className="h-screen col-span-4 mr-3 card" />
        <div className="col-span-8">
          <div>
            <div>
              <form onSubmit={submitForm}>
                <TextField
                  label="title"
                  name="title"
                  autoComplete="title"
                  // value={values.title}
                  onChange={(e) =>
                    setValues({ ...values, title: e.target.value })
                  }
                />
                {/* <TextField
                  label='excerpt'
                  name='excerpt'
                  value={values.excerpt}
                  onChange={handleChange}
                /> */}
                <TextField
                  label="content"
                  name="content"
                  autoComplete="content"
                  // value={values.content}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="excerpt"
                  name="excerpt"
                  autoComplete="excerpt"
                  // value={values.excerpt}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="slug"
                  name="slug"
                  type="text"
                  value={slugify(values.title)}
                  // onChange={e => handleChange(e)}
                />
                <select
                  name="author"
                  id="name"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">select user</option>
                  {users?.length &&
                    users.map((user) => (
                      <option value={user.id} key={user.id}>
                        {user.id}
                      </option>
                    ))}
                </select>
                {/* <TextField
                  label='select image'
                  name='image'
                  type='file'
                  accept = 'image/*'
                  className ='hidden'
                  // value={values.excerpt}
                  onChange={e => handleChange(e)}
                /> */}

                <div className="max-w-2xl ">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    accept="image/*"
                    name="image"
                    multiple
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <TextField
                  label="status"
                  type="checkBox"
                  value={values.status}
                  onChange={(e) => handleChange(e)}
                />
                <Button value="Submit" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create
