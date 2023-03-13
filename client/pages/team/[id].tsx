import { NextPage } from "next";
import TeamDetail from "../../components/team/TeamDetail";
import { getFixtureAPI } from "../../lib/api/fixture";
import { getTeamDetailAPI, getTeamSquadAPI } from "../../lib/api/team";
import { fixtureActions } from "../../store/fixture/fixture";
import { squadActions } from "../../store/squad/squad";
import { teamActions } from "../../store/team/teams";

const teamDetail: NextPage = () => {
    return <TeamDetail />
}

teamDetail.getInitialProps = async ({ query, store }) => {
    const { id } = query;

    try {
        if (id) {
            const { data: detailTeamData } = await getTeamDetailAPI(id as string);
            const { data: squadData } = await getTeamSquadAPI(id as string);
            const { data: fixtureData } = await getFixtureAPI(id as string, "fixture", null);
            const { data: resultData } = await getFixtureAPI(id as string, "result", null);
            store.dispatch(teamActions.setTeamDetail(detailTeamData));
            store.dispatch(squadActions.setSquad(squadData));
            store.dispatch(fixtureActions.setFixture(fixtureData));
            store.dispatch(fixtureActions.setResult(resultData));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default teamDetail;