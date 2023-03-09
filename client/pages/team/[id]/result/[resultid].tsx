import { NextPage } from "next";
import ResultDetail from "../../../../components/team/fixture/ResultDetail";
import { getDetailFixtureAPI } from "../../../../lib/api/fixture";
import { fixtureActions } from "../../../../store/fixture/fixture";


const resultDetail: NextPage = () => {
    return <ResultDetail />
}

resultDetail.getInitialProps = async ({ query, store }) => {
    const { resultid } = query;

    // console.log("query====", query);
    // console.log("fixtureId===", fixtureid);
    try {
        if (resultid) {
            const { data: resultData } = await getDetailFixtureAPI(resultid as string);
            store.dispatch(fixtureActions.setDetailResult(resultData));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default resultDetail;