import { NextPage } from "next";
import TeamDetail from "../../components/team/TeamDetail";
import { getFixtureAPI } from "../../lib/api/fixture";
import { getStadiumAPI, getStatsAPI, getTeamDetailAPI, getTeamSquadAPI } from "../../lib/api/team";
import { fixtureActions } from "../../store/fixture/fixture";
import { squadActions } from "../../store/squad/squad";
import { teamActions } from "../../store/team/teams";

const teamDetail: NextPage = () => {
    return <TeamDetail />
}

teamDetail.getInitialProps = async ({ query, store }) => {
    const { id } = query;
    // console.log("id---", id)

    try {
        if (id) {
            const { data: detailTeamData } = await getTeamDetailAPI(id as string);
            const { data: squadData } = await getTeamSquadAPI(id as string);
            const { data: fixtureData } = await getFixtureAPI(id as string, "fixture", null);
            const { data: resultData } = await getFixtureAPI(id as string, "result", null);
            const { data: stadiumData } = await getStadiumAPI(id as string);
            const { data: statData } = await getStatsAPI(id as string);
            store.dispatch(teamActions.setTeamDetail(detailTeamData));
            store.dispatch(squadActions.setSquad(squadData));
            store.dispatch(fixtureActions.setFixture(fixtureData));
            store.dispatch(fixtureActions.setResult(resultData));
            store.dispatch(teamActions.setStadium(stadiumData));
            store.dispatch(teamActions.setPlayersStats(statData));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default teamDetail;