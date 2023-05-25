import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getTeamListByNameAPI } from "../../lib/api/team";
import { useSelector } from "../../store";
import { teamActions } from "../../store/team/teams";
import SearchBar from "../common/SearchBar";
import TeamList from "../team/TeamList";

const Home: React.FC = () => {
    // searchValue는 설정할 필요 없으나, SearchBar 공용 컴포넌트 value가 필수값이라 일단 설정해 놓음. 추후에 수정 필요함.
    const [searchValue, setSearchValue] = useState("");
    
    const searchTeams = useSelector((state) => state.team.searchTeams);

    const dispatch = useDispatch();

    const searchTimer = useRef<NodeJS.Timeout | null>(null);

    const onChangeSearchValue = useCallback((e: any) => {
        setSearchValue(e);

        if(searchTimer.current) {
            clearTimeout(searchTimer.current);
        }

        console.log("event===", e);

        const tt = {
            name: e
        };

        searchTimer.current = setTimeout(async() => {
            try {
                if(e == null || e == "" || e == undefined) {
                    dispatch(teamActions.setSearchTeams([]));
                } else {
                    const { data } = await getTeamListByNameAPI(tt);
                    dispatch(teamActions.setSearchTeams(data));
                }
                
            } catch (e) {
                console.log(e)
            }
        }, 500);

        // try {
        //     const { data } = await getTeamListByNameAPI(tt);
        //     console.log("data===", data)
        //     // const response = await getTeamListByName(tt);
        //     // console.log("resp===", response);
        // } catch (e) {
        //     console.log(e)
        // }
        
        // dispatch(teamActions.setSearchTeams(e));
    }, [searchValue]);

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
                </div>
            ))}
        </div>
        </>
    )
};

export default Home;