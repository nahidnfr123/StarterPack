import {useSelector} from "react-redux";
import Button from "@mui/material/Button";

function Profile() {
  const auth = useSelector((state) => state.auth)
  const user = auth.user

  return (
    <>
      <h1>Profile</h1>
      <div>Name: <strong>{user.name}</strong></div>
      <div>Email: <strong>{user.email}</strong></div>
      <div>
        <Button variant="contained" href='/edit-profile'>Edit Profile</Button>
      </div>
    </>
  );
}

export default Profile;
