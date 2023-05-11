import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { editLead, getLead, getMyTeam } from 'features/ganacrm/slice/crmSlice'
const EditLead = () => {
  const { id } = useParams()
  const ref = useRef()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { lead } = useSelector((store) => store.crm)
  const { team } = useSelector((store) => store.crm)
  const currentTeam = team.find((t) => t.id == lead.team)
  useEffect(() => {
    if (id) {
      dispatch(getLead(id))
      dispatch(getMyTeam())
    }
  }, [dispatch, id])

  const { company, contact_person, website } = lead
  console.log('first', lead, lead.team, 'vamos', currentTeam)
  // console.log('EditLead', company)
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  const schema = yup.object().shape(
    {
      company: yup.string().required('enter company name'),
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
      assigned_to: yup.number().integer(),
      // password: yup.string().min(4).max(20).required('enter password'),
    },

    [
      // Add Cyclic deps here because when require itself
      [
        'company',
        'contact_person',
        'phone',
        'website',
        'confidence',
        'email',
        'estimated_value',
        'priority',
      ],
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
  console.log('sdsd', values)

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
    if (lead) {
      console.log('Lead', lead)
      values.company = lead.company
      values.website = lead.website
      values.email = lead.email
      values.phone = lead.phone
      values.priority = lead.priority
      values.confidence = lead.confidence
      values.email = lead.email
      values.status = lead.status
      values.estimated_value = lead.estimated_value
      values.contact_person = lead.contact_person
      // values.assigned_to = lead.assigned_to.id
      // reset(lead)
    }

    // setValue('company', lead.company)
  }, [lead])

  const submitForm = (e) => {
    e.preventDefault()

    values.id = id
    // console.log('submitForm', values)
    dispatch(editLead(values))
    navigate(`/crm/dashboard/lead/${id}`)
  }

  // const submitForm = (data) => {
  //   data.id = id

  //   dispatch(editLead(data))
  //   // dispatch(editLead(values))
  // }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-5 mb-6 text-gray-600 border">
        <div className="flex justify-center">
          <form
            className="max-w-3xl p-8 "
            // onSubmit={handleSubmit(submitForm)}
            onSubmit={submitForm}
          >
            <fieldset>
              <legend className="text-4xl text-gray-700">EDIT LEAD</legend>
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
                    htmlFor="company"
                  >
                    company
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id=""
                    // name="company"
                    autoComplete="company"
                    {...register('company')}
                    placeholder="eg. ern enterprise"
                    value={values.company || ''}
                    onChange={handleInputChange}
                    // defaultValue={lead.company}
                    // value="company"
                    // onChange={(e) => {
                    //   setValue('company', e?.target.value)
                    //   console.log('right there')
                    // }}
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
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="status"
                  >
                    status
                  </label>
                  <select
                    {...register('status')}
                    value={values.status || ''}
                    onChange={handleInputChange}
                    // defaultValue={lead.status}
                    // onChange={(e) => setValue('status', e.target?.value)}
                    className="w-full"
                    required
                  >
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
                  <select
                    {...register('priority')}
                    value={values.priority || ''}
                    onChange={handleInputChange}
                    // defaultValue={lead.priority}
                    // onChange={(e) => setValue('priority', e.target?.value)}
                    className="w-full"
                    required
                  >
                    <option value="">choose priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <p className="text-xs italic text-red-500">
                    {errors.priority?.message}
                  </p>
                </div>
                <div className="w-full px-3 mt-4">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="assigned_to"
                  >
                    assigned_to
                  </label>
                  <select
                    {...register('assigned_to')}
                    value={values.assigned_to}
                    onChange={handleInputChange}
                    // defaultValue={lead.assigned_to}
                    // onChange={(e) => setValue('assigned_to', e.target?.value)}
                    className="w-full"
                    required
                  >
                    <option value="">choose assigned_to</option>
                    {currentTeam?.members.length &&
                      currentTeam?.members.map((member) => (
                        <option value={member.id} key={member.id}>
                          {member.username}
                        </option>
                      ))}
                  </select>
                  <p className="text-xs italic text-red-500">
                    {errors.assigned_to?.message}
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

export default EditLead

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
