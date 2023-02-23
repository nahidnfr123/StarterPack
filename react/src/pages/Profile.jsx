import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import React from "react";
import Avatar from "@mui/material/Avatar";

function Profile() {
  const auth = useSelector((state) => state.auth)
  const user = auth.user

  return (
      <>
        <h1>Profile</h1>
        <Avatar
            alt={user?.name}
            src={user?.avatar}
            sx={{width: 100, height: 100}}/>
        <div>Name: <strong>{user?.name}</strong></div>
        <div>Email: <strong>{user?.email}</strong></div>
        <div>Phone: <strong>{user?.phone}</strong></div>
        <div>
          <Link to="/edit-profile" variant="body2">
            <Button variant="contained">Edit Profile</Button>
          </Link>
        </div>
      </>
  );
}

export default Profile;
