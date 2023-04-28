import Link from "next/link";
import { useSelector } from "../../../store";
import TeamDetail from "../TeamDetail";
import moment from "moment";
import 'moment/locale/ko';
import Image from "next/image";

const TeamFixture: React.FC = () => {
    const team = useSelector((state) => state.team.detail?._id);
    const fixtures = useSelector((state) => state.fixture.fixture);

    // 매치데이트별로 그룹핑하는 함수
    const groupByDate = (fixtures: any) => {
        const result: any = {};
        fixtures.forEach((fixture: any) => {
        const date = moment(fixture.matchDay).format("YYYY-MM-DD");
        if (!result[date]) {
            result[date] = [];
        }
        result[date].push(fixture);
        });
        return result;
    };

    const groupedFixtures = groupByDate(fixtures);
    console.log("fixtures===", fixtures);
    console.log("groupedFixtures===", groupedFixtures);
    
    return (
        <TeamDetail>
            <div className="h-64 bg-gradient-to-r from-gray-900 to-gray-100">
                <div className="mx-auto flex py-24 px-4 container">
                    <h1 className="text-white text-6xl font-bold">Fixtures</h1>
                </div>
            </div>
            {/* <div className="self-auto px-[33.3em] py-4"> */}
            <div className="container mx-auto px-4">
                {fixtures.map((fixture, key) => (
                    <ul key={fixture._id} className="space-y-4">
                        <h2 className="text-xl font-bold mt-4">{moment(fixture.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                        <Link href={`/team/${team}/fixture/${fixture._id}`}>
                            {/* <li className="h-14 items-center space-x-1 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white border-t border-b border-y-gray-300 flex"> */}
                            <li className="flex items-center space-x-1 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white border-t border-b border-y-gray-300 h-14">
                                <div className="w-[35%] flex">
                                    <div className="w-[50%] flex justify-end">
                                        <span className="font-bold py-2">{fixture.homeTeam.name}</span> 
                                        <span className="mr-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${fixture.homeTeam.emblem}`} width={50} height={50} alt="img" /></span>
                                    </div>
                                    <div className="flex">
                                        <span className="px-2 my-2 border bg-white text-black">{moment(fixture.matchDay).add(-9, 'h').format('HH:mm')}</span>    
                                    </div>
                                    <div className="w-[50%] flex justify-start">
                                        <span className="ml-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${fixture.awayTeam.emblem}`} width={50} height={50} alt="img" /></span>
                                        <span className="font-bold pl-2 py-2">{fixture.awayTeam.name}</span>
                                    </div>
                                </div>
                                <span className="text-right ml-auto">{fixture.venue}</span>
                            </li>
                        </Link>
                    </ul>
                ))}
            </div>
        </TeamDetail>
    );
};

export default TeamFixture;