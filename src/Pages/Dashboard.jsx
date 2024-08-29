import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { PocketbaseContext } from "../App";

const Dashboard = () => {
  const pb = useContext(PocketbaseContext);
  const navigate = useNavigate();
  const clickHandler = () => {
    pb.authStore.clear();
    navigate("/");
  };
  return (
    <div>
      {!pb.authStore.isValid && <Navigate to="/login" replace={true} />}
      Hello {pb.authStore.model?.id} <button onClick={clickHandler}>Logout</button>
    </div>
  );
};

export default Dashboard;
