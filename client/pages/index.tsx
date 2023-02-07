import { NextPage } from "next";
import Home from "../components/home/Home";
import { getTeamListAPI } from "../lib/api/team";
import { teamActions } from "../store/team/teams";

const index: NextPage = () => {
  return <Home />
}

export default index;