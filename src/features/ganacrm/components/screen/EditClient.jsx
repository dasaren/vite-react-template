import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { editLead, getLead, getMyTeam } from 'features/ganacrm/slice/crmSlice'
import { editClient, getClient } from 'features/ganacrm/slice/clientSlice'
const EditClient = () => {
  const { id } = useParams()
  const ref = useRef()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { client } = useSelector((store) => store.clients)

  useEffect(() => {
    if (id) {
      dispatch(getClient(id))
    }
  }, [dispatch, id])

  // console.log('first', client, client.team, 'vamos', currentTeam)
  // console.log('EditLead', company)
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  const schema = yup.object().shape(
    {
      name: yup.string().required('enter company name'),
      contact_person: yup.string().required('contact person is required'),
      website: yup.string().matches(URL, 'Enter a valid url'),
      // confidence: yup.string(),
      // estimated_value: yup
      //   .number()
      //   .integer()
      //   .transform((value) =>
      //     isNaN(value) || value === null || value === undefined ? 0 : value,
      //   ),

      email: yup.string().email().required('your email is required'),
      phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      // assigned_to: yup.number().integer(),
      // password: yup.string().min(4).max(20).required('enter password'),
    },

    [
      // Add Cyclic deps here because when require itself
      ['name', 'contact_person', 'phone', 'website', 'email'],
    ],
  )

  const [values, setValues] = useState({
    // company: lead.company,
    // email: lead.email,
    // website: lead.website,
    // confidence: lead.confidence,
    // estimated_value: lead.estimated_value,
    // status: lead.status,
    // phone: lead.phone,
    // priority: lead.priority,
    // contact_person: lead.contact_person,
  })
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isLoading, errors },
  } = useForm({
    // mode: 'onChange',
    resolver: yupResolver(schema),
    // defaultValues: {
    //   id: lead.id,
    //   company: lead.company,
    //   contact_person: lead.contact_person,
    //   website: lead.website,
    //   phone: lead.phone,
    //   email: lead.email,
    //   priority: lead.priority,
    //   confidence: lead.confidence,
    //   status: lead.status,
    // },
    // defaultValues: lead,
  })

  useEffect(() => {
    if (client) {
      console.log('client', client)
      values.name = client.name
      values.website = client.website
      values.email = client.email
      values.phone = client.phone
      values.email = client.email
      values.contact_person = client.contact_person

      // reset(client)
    }

    // setValue('company', client.company)
  }, [client])

  const submitFormer = (e) => {
    e.preventDefault()

    values.id = id

    dispatch(editClient(values))
    navigate(`/crm/dashboard/client/${id}`)
  }

  const submitForm = (data) => {
    data.id = id

    dispatch(editClient(data))
    navigate(`/crm/dashboard/client/${id}`)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-5 mb-6 text-gray-600 border">
        <div className="flex justify-center">
          <form
            className="max-w-3xl p-8 "
            // onSubmit={handleSubmit(submitForm)}
            onSubmit={submitFormer}
          >
            <fieldset>
              <legend className="text-4xl text-gray-700">EDIT CLIENT</legend>
              <div className="flex flex-wrap mb-6 -mx-3 " />
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="email"
                  >
                    email
                  </label>
                  <input
                    type="email"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="email"
                    name="email"
                    autoComplete="email"
                    {...register('email')}
                    value={values.email || ''}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    // defaultValue={values.email}
                    // onChange={(e) => setValue('email', e?.target.value)}
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="phone"
                  >
                    phone
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="phone"
                    name="phone"
                    autoComplete="phone"
                    value={values.phone || ''}
                    {...register('phone')}
                    placeholder="tel  no"
                    // defaultValue={lead.phone}
                    // onChange={(e) => setValue('phone', e?.target.value)}
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.phone?.message}
                  </p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="name"
                  >
                    name
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id=""
                    // name="name"
                    autoComplete="name"
                    {...register('name')}
                    placeholder="eg. ern enterprise"
                    value={values.name || ''}
                    onChange={handleInputChange}
                    // defaultValue={lead.name}
                    // value="name"
                    // onChange={(e) => {
                    //   setValue('name', e?.target.value)
                    //   console.log('right there')
                    // }}
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="contact_person"
                  >
                    contact person
                  </label>
                  <input
                    type="text"
                    // autoComplete="contact_person"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="contact_person"
                    name="contact_person"
                    {...register('contact_person')}
                    value={values.contact_person || ''}
                    onChange={handleInputChange}
                    // defaultValue={lead.contact_person}
                    // onChange={(e) =>
                    //   setValue('contact_person', e?.target.value)
                    // }
                    placeholder="contact person..."
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.contact_person?.message}
                  </p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="email"
                  >
                    website
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="website"
                    name="website"
                    // autoComplete="website"
                    {...register('website')}
                    value={values.website || ''}
                    onChange={handleInputChange}
                    // defaultValue={lead.website}
                    // onChange={(e) => setValue('website', e.target?.value)}
                    placeholder="www.example.com"
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.website?.message}
                  </p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="estimated_value"
                  >
                    estimated value
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id=""
                    name="estimated_value"
                    {...register('estimated_value')}
                    value={values.estimated_value || ''}
                    onChange={handleInputChange}
                    // defaultValue={lead.estimated_value}
                    // onChange={(e) =>
                    //   setValue('estimated_value', e?.target.value)
                    // }
                    placeholder="estimated value..."
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.estimated_value?.message}
                  </p>
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className="w-full text-2xl font-semibold text-white btn success"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default EditClient

{
  /* <div className="w-full px-3">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="password"
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
              </div> */
}
