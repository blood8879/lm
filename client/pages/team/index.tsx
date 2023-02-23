import { NextPage } from "next";
import TeamList from "../../components/team/TeamList";
import { getPlayerInfoAPI } from "../../lib/api/player";
import { getTeamListAPI } from "../../lib/api/team";
import { playerActions } from "../../store/player/players";
import { teamActions } from "../../store/team/teams";


const index: NextPage = () => {
  return <TeamList />
}

index.getInitialProps = async({ store, query }) => {
  try {
    const { data } = await getTeamListAPI();
    // const { userId } = store.getState().user._id;
    // const playerProfile = await getPlayerInfoAPI(userId);
    // console.log("playerProfile===", playerProfile);
    // console.log("data==", teams);
    store.dispatch(teamActions.setTeams(data.teams));
    // store.dispatch(playerActions.setProfile(playerProfile));
  } catch(e) {
    console.log(e);
  }

  return {};
}

export default index;