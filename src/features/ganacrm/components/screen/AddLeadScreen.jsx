import React from 'react'
import Layout from '../Layout'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addLead } from 'features/ganacrm/slice/crmSlice'

const AddLeadScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  const schema = yup.object().shape({
    company: yup.string().required('enter company name'),
    contact_person: yup.string().required('contact person is required'),
    website: yup.string().matches(URL, 'Enter a valid url'),
    confidence: yup.string(),
    estimated_value: yup
      .number()
      .integer()
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value,
      ),
    priority: yup.string().required('select one of the options'),
    status: yup.string().required('select one of the options'),
    email: yup.string().email().required('your email is required'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    // password: yup.string().min(4).max(20).required('enter password'),
  })

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    console.log('form', data)
    dispatch(addLead(data))
    navigate('/crm/dashboard/leads')
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-5 text-gray-600 border mb-6">
        <div className="flex justify-center">
          <form
            className="max-w-3xl p-8 "
            onSubmit={handleSubmit(submitForm)}
            // onSubmit={submitFormer}
          >
            <fieldset>
              <legend className="text-4xl text-gray-700">ADD LEAD</legend>
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
                    placeholder="example@email.com"
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
                    {...register('phone')}
                    placeholder="tel  no"
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.phone?.message}
                  </p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="company"
                  >
                    company
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id=""
                    name="company"
                    autoComplete="company"
                    {...register('company')}
                    placeholder="eg. ern enterprise"
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.company?.message}
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
                    autoComplete="contact_person"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="contact_person"
                    name="contact_person"
                    {...register('contact_person')}
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
                    autoComplete="website"
                    {...register('website')}
                    placeholder="enter confidence..."
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
                    placeholder="estimated value..."
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.estimated_value?.message}
                  </p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="status"
                  >
                    status
                  </label>
                  <select {...register('status')} className="w-full" required>
                    <option value="">choose status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="inprogress">In progress</option>
                    <option value="lost">Lost</option>
                    <option value="won">Won</option>
                  </select>
                  <p className="text-xs italic text-red-500">
                    {errors.status?.message}
                  </p>
                </div>
                <div className="w-full px-3 mt-4">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="status"
                  >
                    priority
                  </label>
                  <select {...register('priority')} className="w-full" required>
                    <option value="">choose priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <p className="text-xs italic text-red-500">
                    {errors.priority?.message}
                  </p>
                </div>
                {/* <div className="w-full px-3">
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
              </div> */}
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn success w-full text-white text-2xl font-semibold"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default AddLeadScreen
