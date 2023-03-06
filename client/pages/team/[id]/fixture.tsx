import { NextPage } from "next";
import TeamFixture from "../../../components/team/fixture/TeamFixture";
import { getFixtureAPI } from "../../../lib/api/fixture";
import { fixtureActions } from "../../../store/fixture/fixture";


const Fixture: NextPage = () => {
    return <TeamFixture />
}

Fixture.getInitialProps = async ({ query, store }) => {
    const { id } = query;

    try {
        if (id) {
            const { data: fixtureData } = await getFixtureAPI(id as string);
            // console.log("data22===", data);
            store.dispatch(fixtureActions.setFixture(fixtureData));
        }
        
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default Fixture;