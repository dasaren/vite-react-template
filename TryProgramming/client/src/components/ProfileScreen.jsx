import { getProfile, updateUser } from "features/redux-users/myUserSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TextField from "components/TextField";
import Button from "components/Button";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userp = useSelector((store) => store.myuser);
  const tr = userp.userProfile;

  let { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(getProfile(slug));
    }
  }, [dispatch]);
  const { userProfile } = useSelector((store) => store.myuser);

  // const { first_name, username, email } = userProfile
  const [profile, setProfile] = useState({
    username: userProfile.username,
    first_name: userProfile.first_name,
    email: "",
  });

  // const [profile, setProfile] = useState(tr)

  const [postimage, setPostImage] = useState(null);

  // console.log('userprofile1:   ')

  // if (localStorage.getItem('registered') == null) {
  //   navigate('/psignin')
  // }

  const handleInputValue = (e) => {
    if ([e.target.name] == "image") {
      // setPostImage(
      //   {
      // 	image: e.target.files,
      // });
      setPostImage([...e.target.files][0]);
      // console.log('e.target.file:', e.target.files)
    }

    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    // console.log('new-profile', profile)
    const formData = new FormData();
    const id = userProfile.id;
    const first_name = "gideom";
    const profile_pic = userProfile.profile_pic;
    // formData.append('id', userProfile.id)
    formData.append("username", profile.username);

    formData.append("first_name", profile.first_name);

    formData.append("email", "");
    if (postimage) {
      formData.append("profile_pic", postimage);
    }

    console.log("my formData:  ", formData.get("first_name"));

    const data = {
      // id: userProfile.id,
      // username: profile.username,
      // first_name: profile.first_name,
      // image: postimage,
    };

    dispatch(updateUser({ id, formData }));
    navigate(`/products/user/profile/${profile.username}`);
  };

  return (
    <Layout>
      <div className="grid grid-cols-12">
        <div className="col-span-3 ml-3">
          <h2>User Profile</h2>
          <div className="my-3">
            <form onSubmit={formSubmit} className="card my-3 rounded py-3">
              <TextField
                label="username"
                name="username"
                type="text"
                value={profile.username}
                onChange={handleInputValue}
                // onChange={(e) =>
                //   setProfile({ ...profile, username: e.target.value })
                // }
              />
              <TextField
                label="email"
                name="email"
                type="email"
                value={profile.email || ""}
                onChange={handleInputValue}
              />
              <TextField
                label="first_name"
                name="first_name"
                type="text"
                value={profile.first_name || ""}
                onChange={handleInputValue}
              />
              <input
                className="mt-4 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                accept="image/*"
                name="image"
                multiple
                onChange={(e) => handleInputValue(e)}
              />

              <Button type="submit">Edit Profile</Button>
            </form>
          </div>
        </div>
        <div className="col-span-9">My Orders</div>
      </div>
    </Layout>
  );
};

export default ProfileScreen;
