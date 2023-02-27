import Button from "../common/Button";
import TeamDetail from "./TeamDetail";


const TeamFixture: React.FC = () => {

    const createFixture = async() => {
        console.log("클릭이벤트-createFixture");
    }
    return (
        <TeamDetail>
            <div>
                <Button onClick={createFixture}>일정등록</Button>
            </div>
        </TeamDetail>
    );
};

export default TeamFixture;