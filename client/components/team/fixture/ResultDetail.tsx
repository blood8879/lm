import moment from "moment";
import Head from "next/head";
import { useSelector } from "../../../store";

const ResultDetail: React.FC = () => {
    const matchInfo = useSelector((state) => state.fixture.detailResult);
    // console.log("match===", match);

    return (
        <>
            <Head>
                <title>{matchInfo.homeTeam.name} v {matchInfo.awayTeam.name}, {moment(matchInfo.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</title>
            </Head>
            <div className="flex space-x-2">
                <h4 className="text-xs bold">{moment(matchInfo.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h4>
                <h4 className="text-xs bold">{matchInfo.venue}</h4>
            </div>
            <div className="flex">
                <div className="w-[40%]">
                    {matchInfo.homeTeam.name}
                </div>
                <div className="w-[20%] space-x-4">{matchInfo.home_goals}-{matchInfo.away_goals}</div>
                <div className="w-[40%]">
                    {matchInfo.awayTeam.name}
                </div>
            </div>
        </>
    )
}

export default ResultDetail;