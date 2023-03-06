import { NextPage } from "next";
import FixtureDetail from "../../../../components/team/fixture/FixtureDetail";
import { getDetailFixtureAPI } from "../../../../lib/api/fixture";
import { fixtureActions } from "../../../../store/fixture/fixture";


const fixtureDetail: NextPage = () => {
    return <FixtureDetail />
}

fixtureDetail.getInitialProps = async ({ query, store }) => {
    const { fixtureid } = query;

    // console.log("query====", query);
    console.log("fixtureId===", fixtureid);
    try {
        if (fixtureid) {
            const { data } = await getDetailFixtureAPI(fixtureid as string);
            store.dispatch(fixtureActions.setDetailFixture(data));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default fixtureDetail;