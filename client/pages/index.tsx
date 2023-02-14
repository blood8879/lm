import { NextPage } from "next";
import Home from "../components/home/Home";
import { getTeamListAPI } from "../lib/api/team";
import { teamActions } from "../store/team/teams";

const index: NextPage = () => {
  return <Home />
}

index.getInitialProps = async({ store, query }) => {
  try {
    const { data } = await getTeamListAPI();
    
    // console.log("data==", teams);
    store.dispatch(teamActions.setTeams(data.teams));
  } catch(e) {
    console.log(e);
  }

  return {};
}

export default index;