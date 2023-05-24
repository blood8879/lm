import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getTeamListByName } from "../../lib/api/team";
import { useSelector } from "../../store";
import { teamActions } from "../../store/team/teams";
import SearchBar from "../common/SearchBar";
import TeamList from "../team/TeamList";

const Home: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    
    const searchTeams = useSelector((state) => state.team.searchTeams);

    const dispatch = useDispatch();

    const searchTimer = useRef<NodeJS.Timeout | null>(null);

    const onChangeSearchValue = (e: string) => {
        setSearchValue(e);
        console.log("sValue===", searchValue);
        
        if(searchTimer.current) {
            clearTimeout(searchTimer.current);
        }
        
        // try {
        //     const joinTeamBody = {
        //         name: searchValue,
        //     }
        // } catch(e) {
        //     console.log(e);
        // }
        // const { data } = getTeamListByName(joinTeamBody);
        // console.log("data===", data);

        // searchTimer.current = setTimeout(async () => {
        //     const { data } = await getTeamListByName(searchValue);
        //     console.log("data===", data);
        //     dispatch(teamActions.setSearchTeams(data.teams));
        // }, 500);
    }

    return (
        <>
        <div className="container px-4">
            <SearchBar placeholder="검색할 팀명을 입력해 주세요." value={searchValue} onChange={onChangeSearchValue} />
        </div>
        <div className="container py-12 flex">
        {searchTeams.map((team, key) => (
                <div key={team._id}>
                    <Link href={`/team/${team._id}`}>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team.emblem}`}
                            width={200}
                            height={200}
                            alt="img"
                        />
                        <h2 className="center">{team.name}</h2>
                    </Link>
                    {/* <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team.emblem}`} alt="emblem" /> */}
                    
                </div>
            ))}
            {/* <TeamList /> */}
        </div>
        </>
    )
};

export default Home;