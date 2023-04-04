import { NextPage } from "next";
import Link from "next/link";
import TeamDetail from "../../../components/team/TeamDetail";
import { useSelector } from "../../../store";

const Manage: NextPage = () => {
    const team = useSelector((state) => state.team);

    return (
        <TeamDetail>
            <div>
                <div className="space-x-3">
                    {team.stadium.length > 0 ? (
                        <Link href="/team/registerFixture">
                            경기등록
                        </Link>
                    ): (
                        <></>
                    )}
                    <Link href="/team/manage/squadManage">
                        팀원관리
                    </Link>
                    <Link href="/team/registerStadium">
                        홈구장등록
                    </Link>
                </div>
            </div>
        </TeamDetail>
    )
}

export default Manage;