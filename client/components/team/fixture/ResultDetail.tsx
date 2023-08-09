import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "../../../store";

const ResultDetail: React.FC = () => {
    const matchInfo = useSelector((state) => state.fixture.detailResult);
    const squad = useSelector((state) => state.squad.squad);
    // console.log("match===", match);

    return (
        <>
            <Head>
                <title>{matchInfo.homeTeam.name} v {matchInfo.awayTeam.name}, {moment(matchInfo.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</title>
            </Head>
            <div className="flex space-x-2 container mx-auto">
                <h4 className="text-xs bold">{moment(matchInfo.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h4>
                <h4 className="text-xs bold">{matchInfo.venue}</h4>
            </div>
            <div className="flex container mx-auto mt-4 h-12">
                <div className="w-[48%]">
                    <span className="flex justify-end bg-[#37003c] text-white h-12"><span className="mr-1 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${matchInfo.homeTeam.emblem}`} width={50} height={50} alt="img" /></span><span className="pt-2.5 mr-4">{matchInfo.homeTeam.name}</span></span>
                    <div className="flex container mx-auto mt-4">
                <h2>득점(홈)</h2>
                {Object.entries(matchInfo.homePlayerGoals).map(([playerId, goals]) => {
                    const matchingPlayer = squad.find((p: any) => p.userId._id === playerId);
                    if(matchingPlayer) {
                        return (
                          <div
                            key={matchingPlayer.userId._id}
                            className="flex space-x-2"
                          >
                            <h2>{matchingPlayer.backNo}</h2>
                            <h2>{matchingPlayer.userId.name}</h2>
                            <div>
                              <span>{Number(goals)}</span>골
                            </div>
                          </div>
                        );
                    }
                })}
            </div>
                </div>
                <div className="w-[4%] space-x-4 grid place-items-center bg-pink-500 text-white">{matchInfo.home_goals}-{matchInfo.away_goals}</div>
                <div className="w-[48%]">
                    <span className="flex justify-start bg-[#37003c] text-white h-12"><span className="pt-2.5 ml-4">{matchInfo.awayTeam.name}</span><span className="ml-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${matchInfo.awayTeam.emblem}`} width={50} height={50} alt="img" /></span></span>
                    <div className="flex container mx-auto mt-4">
                        <h2>득점(어웨이)</h2>
                        {Object.entries(matchInfo.awayPlayerGoals).map(([playerId, goals]) => {
                            const matchingPlayer = squad.find((p: any) => p.userId._id === playerId);
                            if(matchingPlayer) {
                                return (
                                  <div
                                    key={matchingPlayer.userId._id}
                                    className="flex space-x-2"
                                  >
                                    <h2>{matchingPlayer.backNo}</h2>
                                    <h2>{matchingPlayer.userId.name}</h2>
                                    <div>
                                      <span>{Number(goals)}</span>골
                                    </div>
                                  </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultDetail;