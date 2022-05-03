import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../assets/Button";
import Loading from "../assets/Loading";
import { UserSchema } from "../reducers/usersSlice";
import userCalls from "../services/users";


const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let fetching = true;
    if (id) {
      (async () => {
        try {
          const user = await userCalls.getUserById(id);
          if (fetching) {
            console.log(user);
            setSelectedUser(user as UserSchema);
          }
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      })();
    }

    return () => {
      fetching = false;
    }
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  if (!selectedUser) {
    return <h1>No user found!</h1>
  }

  return (
    <div>
      <h1>User: {selectedUser.username}</h1>
      <p>Location: {selectedUser.location}</p>
      <p>Joined: {new Date(selectedUser.date_joined).getTime()}</p>
      <Button
          className="goBack"
          type="button"
          text="Back"
          clickHandler={() => navigate(-1)}
        />
    </div>
  )
}

export default User