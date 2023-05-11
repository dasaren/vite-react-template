import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLead } from 'features/ganacrm/slice/crmSlice'
import axiosDannyInstance from 'app/utils/dannysaxios'
import { toast } from 'react-toastify'

const LeadSingle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { lead } = useSelector((store) => store.crm)
  console.log('lead me', lead)
  useEffect(() => {
    if (id) {
      dispatch(getLead(id))
    }
  }, [dispatch])

  const convertToClient = async () => {
    const data = {
      lead_id: id,
    }

    await axiosDannyInstance
      .post('leadclient/', data)
      .then((response) => {
        console.log('coverted succesfully')
        console.log(response)
        toast('lead converted to client successfully succesfully', {
          position: toast.POSITION.BOTTOM_LEFT,
          className: 'toast-message',
        })
      })
      .catch((error) => {
        console.log(error)
      })
    // navigate('/crm/dashboard/clients')
  }
  return (
    <Layout>
      <div className="grid max-w-4xl px-5 mx-auto my-10 ">
        <div className="text-center">
          <h1>{lead?.company}</h1>
          <div>
            <Link to={`/crm/dashboard/lead/${id}/edit`}>
              <span className="text-blue-500  hover:text-blue-800 hover:font-bold">
                Edit
              </span>
            </Link>
            <button
              className="btn text-blue-500 hover:text-blue-800 hover:font-bold"
              onClick={convertToClient}
            >
              Convert lead to client
            </button>
          </div>
        </div>
        <div className="grid grid-flow-row mt-10 md:grid-cols-12 gap-x-8 max-md:gap-y-8 ">
          <div className="col-span-6 card ">
            <h2 className="text-center">Details</h2>

            <div className="grid gap-4 division ">
              <p>
                <strong>Status: </strong>
                <span className="singlee">{lead.status}</span>
              </p>
              <p>
                <strong>Priority: </strong>
                {lead.priority}
              </p>
              <p>
                <strong>Confidence: </strong>
                {lead.confidence}
              </p>
              <p>
                <strong>Estimated value: </strong>
                {lead.estimated_value}
              </p>
              <p>
                <strong>Created at: </strong>
                {lead.created_at}
              </p>
              <p>
                <strong>Modified at: </strong>
                {lead.modified_at}
              </p>
              <p>
                <strong>Assigned to: </strong>
                {lead.assigned_to?.email}
              </p>
            </div>
          </div>
          <div className="col-span-6 card">
            <h2 className="text-center">Contact Info</h2>
            <div className="grid gap-4 text-left division">
              <p>
                <strong>Contact person: </strong>
                {lead.contact_person}
              </p>
              <p>
                <strong>Email: </strong>
                {lead.email}
              </p>
              <p>
                <strong>Phone: </strong>
                {lead.phone}
              </p>
              <p>
                <strong>Website: </strong>
                {lead.website}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LeadSingle
