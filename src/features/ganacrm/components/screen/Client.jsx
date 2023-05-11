import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getClient, getNotes } from 'features/ganacrm/slice/clientSlice'
import Message from 'components/Message'

const Client = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { client } = useSelector((store) => store.clients)
  const { notes } = useSelector((store) => store.clients)

  useEffect(() => {
    if (id) {
      dispatch(getClient(id))
      dispatch(getNotes(id))
    }
  }, [dispatch])
  return (
    <Layout>
      <div className="grid max-w-4xl px-5 mx-auto my-10 ">
        <div className="text-center">
          <h1>{client?.name}</h1>
          <div className="space-x-5 ">
            <Link to={`/crm/dashboard/client/${id}/edit`}>
              <span className="text-blue-500 hover:text-blue-700">Edit</span>
            </Link>
            <Link to={`/crm/dashboard/notes/${id}/add`}>
              <span className="text-blue-500 hover:text-blue-700">
                Add Notes
              </span>
            </Link>
          </div>
        </div>
        <div className="grid grid-flow-row mt-10 md:grid-cols-12 gap-x-8 max-md:gap-y-8 ">
          <div className="col-span-6 card ">
            <h2 className="text-center">Details</h2>

            <div className="grid gap-4 division ">
              <p>
                <strong>Created at: </strong>
                {client.created_at}
              </p>
              <p>
                <strong>Modified at: </strong>
                {client.modified_at}
              </p>
              <p>
                <strong>Assigned to: </strong>
                {client.assigned_to?.email}
              </p>
            </div>
          </div>
          <div className="col-span-6 card">
            <h2 className="text-center">Contact Info</h2>
            <div className="grid gap-4 text-left division">
              <p>
                <strong>Contact person: </strong>
                {client.contact_person}
              </p>
              <p>
                <strong>Email: </strong>
                {client.email}
              </p>
              <p>
                <strong>Phone: </strong>
                {client.phone}
              </p>
              <p>
                <strong>Website: </strong>
                {client.website}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div>
            <h1>NOTES</h1>
            <Link to={`/crm/dashboard/notes/${id}/add`}>
              <span className="text-blue-500 hover:text-blue-700">
                Add Notes
              </span>
            </Link>
          </div>
          <div className="grid gap-y-7">
            {notes?.length > 0 &&
              notes.map((note, index, array) => (
                <div className="grid grid-rows-6 card gap-4" key={note.id}>
                  <div className="row-span-2 bg-slate-300 text-3xl">
                    {' '}
                    {note.name}
                  </div>
                  <div className="row-span-4 grid bg-yellow-100">
                    {note.body}

                    <Link to={`/crm/dashboard/note/${note.id}/edit`} className="items-center justify-center  btn danger text-white font-bold w-[100px] h-[50px] flex justify-self-end mr-2">
                      <button >
                        <span> Edit Note</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <div>{!notes.length && <Message>Clients has no notes</Message>}</div>
        </div>
      </div>
    </Layout>
  )
}

export default Client
