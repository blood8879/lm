import { NextPage } from "next";
import TeamFixture from "../../../components/team/fixture/TeamFixture";
import { getFixtureAPI } from "../../../lib/api/fixture";
import { fixtureActions } from "../../../store/fixture/fixture";


const Fixture: NextPage = () => {
    return <TeamFixture />
}

export default Fixture;