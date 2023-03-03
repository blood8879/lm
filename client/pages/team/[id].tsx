import { NextPage } from "next";
import TeamDetail from "../../components/team/TeamDetail";
import { getTeamDetailAPI } from "../../lib/api/team";
import { teamActions } from "../../store/team/teams";

const teamDetail: NextPage = () => {
    return <TeamDetail />
}

teamDetail.getInitialProps = async ({ query, store }) => {
    const { id } = query;

    try {
        if (id) {
            const { data } = await getTeamDetailAPI(id as string);
            store.dispatch(teamActions.setTeamDetail(data));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default teamDetail;