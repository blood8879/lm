import Link from "next/link";
import React from "react";
import { useSelector } from "../../../store";
import Button from "../../common/Button";
import TeamDetail from "../TeamDetail";

const FixtureDetail: React.FC = () => {
    const match = useSelector((state) => state.fixture.detailFixture);
    // console.log("match===", match);

    return (
        
            <div>
                {/* <Link href='/team/registerResult' passHref><Button {...{...match, 
                    homeTeamName: match.homeTeam,
                    awayTeamName: match.awayTeam,
                }}>결과등록</Button></Link> */}
                <Link href="/team/registerResult"><Button>결과등록</Button></Link>
            </div>
        
        
    )
}

export default FixtureDetail