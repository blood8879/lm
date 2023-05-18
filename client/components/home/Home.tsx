import { useState } from "react";
import SearchBar from "../common/SearchBar";
import TeamList from "../team/TeamList";

const Home: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");

    const onChangeSearchValue = (e: string) => {
        setSearchValue(e);
        console.log("searchValue===", searchValue);
    }

    return (
        <div className="container px-4">
            <SearchBar placeholder="검색할 팀명을 입력해 주세요." value={searchValue} onChange={onChangeSearchValue} />
        </div>
    )
};

export default Home;