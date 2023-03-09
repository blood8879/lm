import { useSelector } from "../../../store";

const ResultDetail: React.FC = () => {
    const match = useSelector((state) => state.fixture.detailFixture);
    // console.log("match===", match);

    return (
            <div>
                <h2>결과상세</h2>
            </div>
    )
}

export default ResultDetail;