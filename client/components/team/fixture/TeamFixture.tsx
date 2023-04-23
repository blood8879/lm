import Link from "next/link";
import { useSelector } from "../../../store";
import TeamDetail from "../TeamDetail";
import moment from "moment";
import 'moment/locale/ko';

const TeamFixture: React.FC = () => {
    const team = useSelector((state) => state.team.detail?._id);
    const fixtures = useSelector((state) => state.fixture.fixture);

    // 매치데이트별로 그룹핑하는 함수
    // const groupByDate = (fixtures: any) => {
    //     const result: any = {};
    //     fixtures.forEach((fixture: any) => {
    //     const date = moment(fixture.matchDay).format("YYYY-MM-DD");
    //     if (!result[date]) {
    //         result[date] = [];
    //     }
    //     result[date].push(fixture);
    //     });
    //     return result;
    // };

    // const groupedFixtures = groupByDate(fixtures);
    
    return (
        <TeamDetail>
            <div className="h-64 bg-gradient-to-r from-gray-900 to-gray-100">
                <div className="flex w-full py-24 px-[33.3em] items-center">
                    <h1 className="text-white text-6xl font-bold">Fixtures</h1>
                </div>
            </div>
            <div className="self-auto px-[33.3em] py-4">
                {fixtures.map((fixture, key) => (
                    <ul key={fixture._id} className="space-y-4">
                        <h2 className="text-xl font-bold mb-2">{moment(fixture.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                        <Link href={`/team/${team}/fixture/${fixture._id}`}>
                            <li className="h-14 pt-4 items-center space-x-2 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white border-t border-b border-y-gray-300">
                                <span className="font-bold">{fixture.homeTeam.name}</span> 
                                <span className="border px-2 py-2">{moment(fixture.matchDay).add(-9, 'h').format('HH:mm')}</span>
                                <span className="font-bold">{fixture.awayTeam.name}</span>
                                <span>{fixture.venue}</span>
                            </li>
                        </Link>
                    </ul>
                ))}
            </div>
            {/* <div className="flex justify-center items-center">
                {fixtures.map((fixture, key) => (
                    <ul key={fixture._id}>
                        <h2 className="text-xl bold">{moment(fixture.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                        <Link href={`/team/${team}/fixture/${fixture._id}`}>
                            <li className="center space-x-2 hover:bg-gray-300">
                                <span className="text-bold text-red-500">{fixture.homeTeam.name}</span> 
                                <span className="border-2">{moment(fixture.matchDay).add(-9, 'h').format('HH:mm')}</span>
                                <span className="text-bold text-blue-500">{fixture.awayTeam.name}</span>
                                <span>{fixture.venue}</span>
                            </li>
                        </Link>
                    </ul>
                ))}
            </div> */}
        </TeamDetail>
    );
};

export default TeamFixture;