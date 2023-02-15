import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import React from "react";

function Profile() {
  const auth = useSelector((state) => state.auth)
  const user = auth.user

  return (
    <>
      <h1>Profile</h1>
      <div>Name: <strong>{user.name}</strong></div>
      <div>Email: <strong>{user.email}</strong></div>
      <div>
        <Link to="/edit-profile" variant="body2">
          <Button variant="contained">Edit Profile</Button>
        </Link>
      </div>
    </>
  );
}

export default Profile;
