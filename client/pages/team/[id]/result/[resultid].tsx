import { NextPage } from "next";
import ResultDetail from "../../../../components/team/fixture/ResultDatail";
import { getDetailFixtureAPI } from "../../../../lib/api/fixture";
import { fixtureActions } from "../../../../store/fixture/fixture";


const resultDetail: NextPage = () => {
    return <ResultDetail />
}

resultDetail.getInitialProps = async ({ query, store }) => {
    const { fixtureid } = query;

    // console.log("query====", query);
    // console.log("fixtureId===", fixtureid);
    try {
        if (fixtureid) {
            const { data: resultData } = await getDetailFixtureAPI(fixtureid as string);
            store.dispatch(fixtureActions.setDetailResult(resultData));
        }
    } catch(e) {
        // console.log(e);
    }

    return {};
};

export default resultDetail;