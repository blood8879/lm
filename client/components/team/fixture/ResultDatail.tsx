import { useSelector } from "../../../store";

const ResultDetail: React.FC = () => {
    const match = useSelector((state) => state.fixture.detailFixture);
    // console.log("match===", match);

    return (
        
            <div>
                {/* <Link href='/team/registerResult' passHref><Button {...{...match, 
                    homeTeamName: match.homeTeam,
                    awayTeamName: match.awayTeam,
                }}>결과등록</Button></Link> */}
                <h2>결과상세</h2>
            </div>
        
        
    )
}

export default ResultDetail;