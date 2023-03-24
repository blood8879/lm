import { NextPage } from "next";
import PlayerDetail from "../../../../components/team/player/PlayerDetail";
import { getPlayerDetailAPI } from "../../../../lib/api/player";
import { statActions } from "../../../../store/player/stat";

const playerDetail: NextPage = () => {
    return <PlayerDetail />
}

playerDetail.getInitialProps = async ({ query, store }) => {
    const { id , playerid } = query;
    // const 

    console.log("query====", query);
    // console.log("fixtureId===", fixtureid);
    try {
        if (playerid) {
            const { data: playerData } = await getPlayerDetailAPI(id as string, playerid as string);
            console.log("playerData===", playerData);
            store.dispatch(statActions.setDetailStat(playerData));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default playerDetail;