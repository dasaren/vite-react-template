import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register as read } from 'features/redux-users/myUserSlice'
import { addMember } from 'features/ganacrm/slice/crmSlice'
import Layout from '../Layout'

const AddMember = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { registered, loading } = useSelector((state) => state.myuser)

  const schema = yup.object().shape({
    // username: yup.string().required('your fullname is required'),
    email: yup.string().email().required('your email is required'),
    // password: yup.string().min(4).max(20).required('enter password'),
    // password2: yup
    //   .string()
    //   .required('Password is mendatory')
    //   .oneOf([yup.ref('password')], 'Passwords does not match'),
  })

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    console.log('mine')
    console.log('form', data)
    // const email = data.email

    // dispatch(read({ username, password, email }))

    dispatch(addMember({ email: data.email, team: slug }))
    // if (registered) return <Navigate to="/crm/dashboard/team" />
    navigate('/crm/dashboard/team')
  }

  const submitted = (e) => {
    e.preventDefault()
    console.log('sing')
  }

  // if (registered) return <Navigate to="/crm/dashboard/team" />

  return (
    <Layout>
      <div className="max-w-4xl px-4 mx-auto my-10">
        <form
          className="w-full max-w-lg p-8 mx-auto card"
          onSubmit={handleSubmit(submitForm)}
          // onSubmit={submitted}
        >
          <span>{slug}</span>
          <fieldset className="p-4 border">
            <legend className="p-2 mb-3 text-4xl text-center outline ">
              ADD MEMBER
            </legend>

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
              {/* <div className="w-full px-3">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password"
                  name="password"
                  type="password"
                  {...register('password')}
                  placeholder="******************"
                />
                <p className="text-xs italic text-red-500">
                  {errors.password?.message}
                </p>
                {!errors.password && (
                  <p className="text-xs italic text-gray-600">
                    Make it as long and as crazy as you'd like
                  </p>
                )}
              </div>
              <div className="w-full px-3">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  for="password2"
                >
                  Password2
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password2"
                  name="password2"
                  type="password"
                  {...register('password2')}
                  placeholder="******************"
                />
                <p className="text-xs italic text-red-500">
                  {errors.password2?.message}
                </p>
                {!errors.password && (
                  <p className="text-xs italic text-gray-600">
                    Make it as long and as crazy as you'd like
                  </p>
                )}
              </div> */}
            </div>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <input
                type="submit"
                value="Add Member"
                className="w-full mt-4 btn btn-primary success"
              />
            )}
            {/* <input type="submit" value="Submit" className="btn success" /> */}
          </fieldset>
        </form>
      </div>
    </Layout>
  )
}

export default AddMember

{
  /* <div className="flex flex-wrap w-full mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  for="first_name"
                >
                  Username
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="enter name"
                  {...register('username')}
                />

                {(errors.first_name || errors.last_name) && (
                  <p className="text-xs italic text-red-500">
                    all name requirements should be filled
                  </p>
                )}
              </div>
            </div> */
}
