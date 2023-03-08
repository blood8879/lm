import { NextPage } from "next";
import TeamResult from "../../../components/team/fixture/TeamResult";
import { getFixtureAPI } from "../../../lib/api/fixture";
import { fixtureActions } from "../../../store/fixture/fixture";

const Result: NextPage = () => {
    return <TeamResult />
}

Result.getInitialProps = async ({ query, store }) => {
    const { id } = query;
    // console.log("query===", query);

    try {
        if (id) {
            const { data: resultData } = await getFixtureAPI(id as string, "result", null);
            // console.log("data22===", data);
            store.dispatch(fixtureActions.setResult(resultData));
        }
        
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default Result;