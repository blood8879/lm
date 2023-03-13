import { NextPage } from "next";
import Link from "next/link";
import TeamDetail from "../../../components/team/TeamDetail";

const Manage: NextPage = () => {
    return (
        <TeamDetail>
            <div>
                <div className="space-x-3">
                    <Link href="/team/registerFixture">
                        경기등록
                    </Link>
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