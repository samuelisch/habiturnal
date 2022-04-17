import { ReactElement } from "react";
import Button from "./components/Button";
import userCalls from "./serverCalls/users";
import habitCalls from "./serverCalls/habits";

const App = (): ReactElement | null => {
  const getUsersIndex = async (): Promise<void> => {
    const data = await userCalls.getUsers()
    console.log(data)
  }

  const getHabitsIndex = async (): Promise<void> => {
    const data = await habitCalls.getHabits()
    console.log(data)
  }

  return (
    <>
      <h1>Hello world!</h1>
      <Button className="callUsersIndex" type="button" text="Retrieve user index" clickHandler={getUsersIndex} />
      <Button className="callHabitsIndex" type="button" text="Retrieve habits index" clickHandler={getHabitsIndex} />
    </>
  );
}

export default App;
