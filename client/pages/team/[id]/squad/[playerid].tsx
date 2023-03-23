import { NextPage } from "next";
import PlayerDetail from "../../../../components/team/player/PlayerDetail";

const playerDetail: NextPage = () => {
    return <PlayerDetail />
}

// playerDetail.getInitialProps = async ({ query, store }) => {
//     const { playerid } = query;

//     // console.log("query====", query);
//     // console.log("fixtureId===", fixtureid);
//     try {
//         if (playerid) {
//             const { data: playerData } = await getDetailFixtureAPI(playerid as string);
//             store.dispatch(playerActions.setDetailResult(playerData));
//         }
//     } catch(e) {
//         // console.log(e);
//     }

//     return {};
// };

export default playerDetail;