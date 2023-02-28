import { NextPage } from "next";
import Link from "next/link";
import TeamDetail from "../../../components/team/TeamDetail";

const Manage: NextPage = () => {
    return (
        <TeamDetail>
            <div>
                <div>
                    <Link href="/team/registerFixture">
                        경기등록
                    </Link>
                    <Link href="/">
                        팀원관리
                    </Link>
                </div>
            </div>
        </TeamDetail>
    )
}

export default Manage;