import { NextPage } from "next";
import TeamList from "../../components/team/TeamList";
import { getTeamListAPI } from "../../lib/api/team";
import { teamActions } from "../../store/team/teams";


const index: NextPage = () => {
  return <TeamList />
}

index.getInitialProps = async({ store, query }) => {
  
  try {
    const { data } = await getTeamListAPI();
    store.dispatch(teamActions.setTeams(data.teams));
  } catch(e) {
    console.log(e);
  }

  return {};
}

export default index;