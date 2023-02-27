import { NextPage } from "next";
import TeamSquad from "../../../components/team/TeamSquad";
import { getTeamSquadAPI } from "../../../lib/api/team";
import { squadActions } from "../../../store/squad/squad";

const Squad: NextPage = () => {
    return <TeamSquad />
}

Squad.getInitialProps = async ({ query, store }) => {
    const { id } = query;

    // console.log("id====", id);
    try {
        if (id) {
            const { data } = await getTeamSquadAPI(id as string);
            console.log("data===", data);
            store.dispatch(squadActions.setSquad(data));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};


export default Squad;