import Link from "next/link";
import { useSelector } from "../../../store";
import TeamDetail from "../TeamDetail";
import moment from "moment";
import 'moment/locale/ko';

const TeamFixture: React.FC = () => {
    const team = useSelector((state) => state.team.detail?._id);
    const fixtures = useSelector((state) => state.fixture.fixture);
    
    return (
        <TeamDetail>
            <div>
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
                        {/* <span>{fixture.venue}</span> */}
                    </ul>
                    // <div key={fixture._id}>
                    //     <Link href={`/team/${team}/fixture/${fixture._id}`}>
                    //         <h2 className="w-4 center">{fixture.homeTeam.name}</h2>
                    //         <p>vs</p>
                    //         <h2 className="w-4 center text-blue-500">{fixture.awayTeam.name}</h2>
                    //     </Link>
                    //     {/* <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team.emblem}`} alt="emblem" /> */}
                    // </div>
                ))}
            </div>
        </TeamDetail>
    );
};

export default TeamFixture;