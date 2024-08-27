import { useContext } from "react";
import { PocketbaseContext } from "../App";
const Login = () => {
  const pb = useContext(PocketbaseContext);
  return (
    <>
      <div>{pb.authStore.isValid}</div>
      <h2>Hello world</h2>
    </>
  );
};

export default Login;
