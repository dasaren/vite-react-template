import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from 'features/ganacrm/slice/clientSlice'

const NotesScreen = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const { notes } = useSelector((store) => store.clients)

  useEffect(() => {
    // dispatch(getLeads())
    dispatch(getNotes())
  }, [dispatch])

  return (
    <Layout>
      <div className="max-w-4xl px-6 mx-auto">
        <div className="grid w-full gap-4 mt-5">
          <h1 className="flex place-content-center">NOTES</h1>
          <Link to={`/crm/dashboard/notes/${id}/add`}>
            <span className="text-blue-600">Add Note</span>{' '}
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default NotesScreen
