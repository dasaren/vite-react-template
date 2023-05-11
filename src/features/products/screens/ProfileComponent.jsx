// import { mytoken } from 'features/user/myUserSlice'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProfile, updateUser } from 'features/redux-users/myUserSlice'

import TextField from 'components/TextField'
import Button from 'components/Button'
import Layout from '../components/Layout'

const ProfileComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const { registered, loading } = useSelector((state) => state.myuser)
  let { slug } = useParams()

  useEffect(() => {
    if (slug) {
      dispatch(getProfile(slug))
    }
  }, [dispatch, getProfile])
  const { userProfile } = useSelector((store) => store.myuser)

  // const [profile, setProfile] = useState(tr)

  const [postimage, setPostImage] = useState(null)

  const handleInputValue = (e) => {
    if ([e.target.name] == 'image') {
      // setPostImage(
      //   {
      // 	image: e.target.files,
      // });
      setPostImage([...e.target.files][0])
      // console.log('e.target.file:', e.target.files)
    }

    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const schema = yup.object().shape({
    first_name: yup.string(),
    // last_name: yup.string().required('your fullname is required'),
    email: yup.string().email(),
    username: yup.string().min(2).max(20),
    profile_pic: yup.mixed(),
  })

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [profile, setProfile] = useState({
    username: userProfile.username,
    first_name: userProfile.first_name,
    email: '',
  })

  const submitForm = (data) => {
    console.log('form', data)
    // const formData = {
    //   username: data.username,
    //   first_name: data.first_name,
    //   profile_pic: data.profile_pic[0],
    // }
    const formData = new FormData()

    // formData.append('id', userProfile.id)
    formData.append('username', data.username)

    formData.append('first_name', data.first_name)

    formData.append('email', '')

    if (data.profile_pic[0]) {
      formData.append('profile_pic', data.profile_pic[0])
    }

    const id = userProfile.id

    dispatch(updateUser({ id, formData }))
    // navigate(`/products/user/profile/${profile.username}`)

    // navigate('/')
  }

  return (
    <Layout>
      <div>
        <form
          className="w-full max-w-lg p-8"
          onSubmit={handleSubmit(submitForm)}
          // onSubmit={submitFormer}
        >
          <div className="flex flex-wrap mb-6 -mx-3 " />
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                for="email"
              >
                email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                name="email"
                {...register('email')}
                placeholder="example@email.com"
              />
              <p className="text-xs italic text-red-500">
                {errors.email?.message}
              </p>
            </div>
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                for="username"
              >
                username
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="username"
                name="username"
                type="text"
                // autoComplete="username"
                {...register('username')}
                value={profile.username}
                onChange={handleInputValue}
              />
              <p className="text-xs italic text-red-500">
                {errors.username?.message}
              </p>
              {/* {!errors.password && (
                <p className="text-xs italic text-gray-600">
                  Make it as long and as crazy as you'd like
                </p>
              )} */}
            </div>
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                for="first_name"
              >
                first_name
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="first_name"
                value={profile.first_name}
                onChange={handleInputValue}
                {...register('first_name')}
                placeholder="******************"
              />
              <p className="text-xs italic text-red-500">
                {errors.username?.message}
              </p>
            </div>
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                for="profile_pic"
              >
                Profile pic
              </label>
              <input
                className="block w-full mt-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                accept="image/*"
                name="image"
                multiple
                {...register('profile_pic')}
                // onChange={(e) => handleInputValue(e)}
              />

              <p className="text-xs italic text-red-500">
                {errors.username?.message}
              </p>
            </div>
          </div>
          <input type="submit" value="Submit" className="btn success" />
        </form>
      </div>
      <div className="mt-4">
        new Customer:{' '}
        <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
          Register
        </Link>
      </div>
    </Layout>
  )
}

export default ProfileComponent
