import { NextPage } from "next";
import FixtureDetail from "../../../../components/team/fixture/FixtureDetail";
import { getDetailFixtureAPI, getFixtureAPI } from "../../../../lib/api/fixture";
import { fixtureActions } from "../../../../store/fixture/fixture";


const fixtureDetail: NextPage = () => {
    return <FixtureDetail />
}

fixtureDetail.getInitialProps = async ({ query, store }) => {
    const { fixtureid } = query;
    

    // console.log("query====", query);
    
    try {
        if (fixtureid) {
            const { data: fixtureData } = await getDetailFixtureAPI(fixtureid as string);
            // const { data: resultData } = await getFixtureAPI(id as string, "result", 5);
            store.dispatch(fixtureActions.setDetailFixture(fixtureData));
            // store.dispatch(fixtureActions.setResult(resultData));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default fixtureDetail;