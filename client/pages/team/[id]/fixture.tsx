import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import TeamFixture from "../../../components/team/TeamFixture";
import { getFixtureAPI } from "../../../lib/api/fixture";
import { wrapper } from "../../../store";
import { fixtureActions } from "../../../store/fixture/fixture";
import { teamActions } from "../../../store/team/teams";

const Fixture: NextPage = () => {
    return <TeamFixture />
}

Fixture.getInitialProps = async ({ query, store }) => {
    const { id } = query;

    const { detail } = store.getState().team;
    console.log("detail==", detail);
    // console.log("id====", id);
    try {
        if (id) {
            const { data } = await getFixtureAPI(id as string);
            console.log("data===", data);
            store.dispatch(fixtureActions.setFixture(data));
            store.dispatch(teamActions.setTeamDetail(detail));
        }
        
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default Fixture;