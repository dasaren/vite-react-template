import { getMyTeam } from "features/ganacrm/slice/crmSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";

const Team = () => {
  const dispatch = useDispatch();
  const inputElement = useRef();
  const navigate = useNavigate();
  const { team } = useSelector((store) => store.crm);
  const { tryUser } = useSelector((store) => store.myuser);

  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  console.log("team", team);

  useEffect(() => {
    dispatch(getMyTeam());
  }, [dispatch, getMyTeam]);

  const selectTeam = (e) => {
    console.log("u clicked me :  ", e.target);

    // span.className.toggle = 'hidden'
    navigate(`/crm/dashboard/team/add-member/${e.target.id}`);
  };

  const getMe = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
    //
    inputElement.current.className = "text-blue-800";
  };
  return (
    <Layout>
      <div className="container max-w-4xl px-5 mx-auto mt-10">
        <div>
          <div className="mb-10 ">
            List of teams you belong to:{" "}
            {team?.length &&
              team.map((item, index) => (
                <div>
                  <span
                    id={item.name}
                    key={item.id}
                    className="font-bold text-purple-600 cursor-pointer"
                  >
                    {item.name}
                  </span>
                </div>
              ))}
          </div>

          {/* {
            <span
              className="mt-5 text-blue-500 cursor-pointer"
              onClick={() => {
                setToggle(!toggle)
              }}
            >
              Add Member
            </span>
          } */}
          {/* </Link> */}
          {toggle && (
            <div className="">
              Choose team to add a member to:{" "}
              {team?.length &&
                team.map((item, index) => (
                  <div
                    id={item.name}
                    key={item.id}
                    className="font-bold text-blue-600 cursor-pointer hover: hover:text-blue-700 hover:transform hover:text-lg h-7"
                    onClick={selectTeam}
                  >
                    {index + 1}. {item.name},{" "}
                  </div>
                ))}
            </div>
          )}
        </div>
        {team?.length
          ? team.map((tm) => (
              <div
                key={tm.id}
                className="grid max-w-4xl px-3 mx-auto mb-14 card"
              >
                {tm.created_by.email == tryUser.email && (
                  <span
                    ref={inputElement}
                    className="mt-5 text-blue-500 cursor-pointer"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    Add Member
                  </span>
                )}
                <div className="h-[270px]">
                  <h1 class="title text-center mb-8">{tm?.name}</h1>
                  <div className="grid">
                    <div className="grid gap-4">
                      <p>
                        <strong>Plan: </strong>
                        {tm.plan?.name}
                      </p>

                      <p>
                        <strong>Max clients: </strong>
                        {tm.plan?.max_clients}
                      </p>
                      <p>
                        <strong>Max leads: </strong>
                        {tm.plan?.max_leads}
                      </p>
                      {/* <p v-if="$store.state.team.plan !== 'Free'"><strong>Plan end date: </strong>{{ team.plan_end_date }}</p> */}
                    </div>
                    <div className="  ">
                      <p className="cursor-wait font-bold">
                        <Link to="/crm/plan">
                          <span
                            className={` text-blue-700, ${
                              !toggle ? "text-yellow-300" : "text-red-800"
                            } `}
                            onMouseOver={() => {
                              // setShow(true);
                              // inputElement.current.style.display = "none";
                              getMe();
                            }}
                            onClick={getMe}
                          >
                            Change plan
                          </span>{" "}
                        </Link>
                        <br />
                        {show && (
                          <span className=" italic pr-8">
                            👆 Click to change plan
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <h2 class="subtitle">Members</h2>
                  <div>
                    <table class="min-w-full border-collapse block md:table">
                      <thead class="block md:table-header-group">
                        <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                            Username
                          </th>
                          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                            Full Name
                          </th>
                          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                            Email Address
                          </th>
                        </tr>
                      </thead>
                      <tbody class="block md:table-row-group">
                        {tm.members &&
                          tm.members.map((mem) => (
                            <tr
                              class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                              key={mem.id}
                            >
                              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  User Name
                                </span>
                                {mem.username}
                                {/* {JSON.stringify(tm.member)} */}
                              </td>
                              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  Full Name
                                </span>
                                {mem.first_name}
                              </td>
                              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  Email Address
                                </span>
                                {mem.email}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          : ""}
        <div></div>
      </div>
    </Layout>
  );
};

export default Team;
