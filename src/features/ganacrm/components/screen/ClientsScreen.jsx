import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, getMyTeam, getTeams } from "features/ganacrm/slice/crmSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "components/Message";
import { getClients } from "features/ganacrm/slice/clientSlice";
import SearchLeads from "./SearchLeads";

const ClientsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { clients, previousPage, nextPage, pageCount, totalPages } =
    useSelector((store) => store.clients);
  let [page, setPage] = useState(1);
  useEffect(() => {
    // dispatch(getLeads())
    dispatch(getClients({ page: page }));
  }, [page, dispatch]);

  const goToPreviosPage = () => {
    if (page > 0) {
      setPage((page -= 1));
    }
  };
  const goToNextPage = () => {
    setPage(page + 1);
  };

  const clientTotal = clients.length;

  const getPages = Math.round(pageCount / 4);
  console.log("total", getPages);
  console.log("set total", [...Array(getPages).keys()]);

  const getValue = async (e) => {
    console.log("search value   :  ", e.target.value);
    dispatch(getClients({ page: page, query: e.target.value }));
    // if ((e.target.value = "")) {
    //   //  await axiosDannyInstance .get(`leads/?q=${ e.target.value}`)
    //   dispatch(getLeads({ page: page, query: e.target.value }));
    // }
    // else {
    //   dispatch(getLeads({ query: "" }));
    // }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6">
        <dir className="grid w-full gap-4 mt-5">
          <h1 className="flex place-content-center">Clients</h1>
          <div>
            <SearchLeads getValue={getValue} />
          </div>
          <Link to="/crm/dashboard/clients/add">
            <span className="text-blue-600">Add Client</span>{" "}
          </Link>
        </dir>
        <div className="mt-0">
          <div className="overflow-x-auto">
            <div className="flex items-center justify-center overflow-hidden font-sans min-w-screen">
              <div className="w-full max-w-4xl">
                <div className="my-6 bg-white rounded shadow-md">
                  <table className="w-full table-auto min-w-max">
                    <thead>
                      <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Contact Person</th>

                        <th className="px-6 py-3 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-light text-gray-600">
                      {clients?.length > 0 &&
                        clients.map((client) => (
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={client.id}
                          >
                            <td className="px-6 py-3 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 48 48"
                                    // style=" fill:#000000;"
                                  >
                                    <path
                                      fill="#80deea"
                                      d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"
                                    ></path>
                                    <path
                                      fill="#80deea"
                                      d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"
                                    ></path>
                                    <path
                                      fill="#80deea"
                                      d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"
                                    ></path>
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="4"
                                      fill="#80deea"
                                    ></circle>
                                  </svg>
                                </div>
                                <span className="font-medium">
                                  {client.name}
                                </span>
                              </div>
                            </td>

                            <td className="px-6 py-3 text-left">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src="https://randomuser.me/api/portraits/men/1.jpg"
                                  />
                                </div>
                                <span>{client.contact_person}</span>
                              </div>
                            </td>
                            {/* <td className="px-6 py-3 text-center">
                              <div className="flex items-center justify-center">
                                <img
                                  className="w-6 h-6 transform border border-gray-200 rounded-full hover:scale-125"
                                  src={
                                    client.assigned_to
                                      ? client.assigned_to.profile_pic
                                      : 'https://randomuser.me/api/portraits/men/1.jpg'
                                  }
                                  // src="https://randomuser.me/api/portraits/men/1.jpg"
                                />
                                {client.assigned_to?.name}
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <span className="px-3 py-1 text-xs text-purple-600 bg-purple-200 rounded-full">
                                {client.status}
                              </span>
                            </td> */}
                            <td className="px-6 py-3 text-center">
                              <div class="flex item-center justify-center">
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <Link
                                    to={`/crm/dashboard/client/${client.id}`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  </Link>
                                </div>
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <Link
                                    to={`/crm/dashboard/client/${client.id}/edit`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                      />
                                    </svg>
                                  </Link>
                                </div>
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}

                      {/* <tr class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <div class="mr-2">
                              <img
                                class="w-6 h-6"
                                src="https://img.icons8.com/color/100/000000/vue-js.png"
                              />
                            </div>
                            <span class="font-medium">Vue Project</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <div class="mr-2">
                              <img
                                class="w-6 h-6 rounded-full"
                                src="https://randomuser.me/api/portraits/women/2.jpg"
                              />
                            </div>
                            <span>Anita Rodriquez</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <div class="flex items-center justify-center">
                            <img
                              class="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                              src="https://randomuser.me/api/portraits/men/1.jpg"
                            />
                            <img
                              class="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                              src="https://randomuser.me/api/portraits/women/2.jpg"
                            />
                            <img
                              class="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                              src="https://randomuser.me/api/portraits/men/3.jpg"
                            />
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                            Completed
                          </span>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <div class="flex item-center justify-center">
                            <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                            <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                            <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                  <div className="grid  grid-flow-col gap-2   place-content-center">
                    {previousPage != null && (
                      <btn
                        className="btn go my-3 w-[150px] py-5 text-center cursor-pointer text-white font-bold"
                        onClick={goToPreviosPage}
                      >
                        <span className=" ">Previous</span>{" "}
                      </btn>
                    )}
                    {nextPage != null && (
                      <btn
                        className="btn go my-3 w-[150px] py-5 text-center     cursor-pointer  text-white font-bold"
                        onClick={goToNextPage}
                      >
                        <span className=" "> Next</span>
                      </btn>
                    )}
                  </div>
                  <div className="statrts shere">
                    <div className="w-[60%]">
                      {getPages && (
                        <div>
                          <div className="">
                            <div className="flex ">
                              <select
                                name=""
                                id=""
                                value={page}
                                onChange={(e) => setPage(e.target.value)}
                                className="w-[60%]"
                              >
                                {[...Array(getPages).keys()].map((x) => (
                                  <option value={x + 1} key={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <span>Navigate through the pages</span>
                            <div className="another flex gap-2 py-7 justify-end  mx-auto ">
                              {[...Array(getPages).keys()].map((x) => (
                                <button
                                  value={x + 1}
                                  key={x + 1}
                                  className="flex space-x-4 btn yellow mr-4 active:text-red-600 active:bg-yellow-400 focus-within:bg-red-600"
                                  onClick={() => setPage(x + 1)}
                                >
                                  {x + 1}
                                </button>
                              ))}
                            </div>
                            <span className="btn go flex gap-x-4">
                              {[...Array(getPages).keys()]}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid max-w-4xl min-h-screen mx-auto align-middle justify-items-stretch">
        {!clients?.length && (
          <Message className="">there are currently no clients</Message>
        )}
      </div>
    </Layout>
  );
};

export default ClientsScreen;
