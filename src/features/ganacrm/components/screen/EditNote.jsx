import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addLead } from 'features/ganacrm/slice/crmSlice'
import {
  addClient,
  editNote,
  getNote,
} from 'features/ganacrm/slice/clientSlice'

const EditNote = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  const schema = yup.object().shape({
    name: yup.string().required('enter name name'),
    body: yup.string(),
  })

  const { note } = useSelector((store) => store.clients)
   const [notes, setNotes] = useState({name: '', body:''})
  //  const [notes, setNotes] = useState({})
 
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    console.log('form', data)
    data.id = id
    dispatch(editNote(data))
    navigate(`/crm/dashboard/client/${id}`)
  }
  useEffect(() => {
    dispatch(getNote(id))
  }, [dispatch])

  useEffect(()=>{
    if(note){
      notes.name= note.name,
      notes.body= note.body
    }
  },[note])

  

    const handleInputChange = (e) => {

  
      setNotes({ ...notes, [e.target.name]: e.target.value })
    

  
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-5 mb-6 text-gray-600 border">
        <div className="flex justify-center">
          <form
            className="max-w-3xl p-8 "
            onSubmit={handleSubmit(submitForm)}
            // onSubmit={submitFormer}
          >
            <fieldset>
              <legend className="text-4xl text-gray-700">ADD NOTES</legend>
              <div className="flex flex-wrap mb-6 -mx-3 " />
              <div className="flex flex-wrap mb-6 -mx-3">
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
                    name="name"
                    value={notes.name}
                    {...register('name')}
                    // autoComplete="name"
                
                    onChange={handleInputChange}
               
                    placeholder="eg. ern enterprise"
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="body"
                  >
                    body
                  </label>

                  <textarea
                    autoComplete="body"
                    rows="10"
                    cols="50"
                  
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="body"
                    name="body"
                    value={notes.body || ''}
                    {...register('body')}
                    placeholder="write notes..."
                    onChange={handleInputChange}
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.body?.message}
                  </p>
                </div>

                {/* <div className="w-full px-3">
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
                </div> */}
                {/* <div className="w-full px-3 mt-4">
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
                </div> */}
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
                className="w-full text-2xl font-semibold text-white btn success"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default EditNote
