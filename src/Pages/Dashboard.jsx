import { useContext } from "react";
import { PocketbaseContext } from "../App";

const Dashboard = () => {
  const pb = useContext(PocketbaseContext);
  return <div>Hello {pb.authStore.model?.id}</div>;
};

export default Dashboard;
