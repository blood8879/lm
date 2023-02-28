import Button from "../common/Button";
import RegisterFixture from "./RegisterFixture";
import TeamDetail from "./TeamDetail";


const TeamFixture: React.FC = () => {

    const createFixture = async() => {
        console.log("클릭이벤트-createFixture");
    }
    return (
        <TeamDetail>
            <div>
                테스트
            </div>
        </TeamDetail>
    );
};

export default TeamFixture;