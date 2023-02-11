import Image from "next/image";
import Link from "next/link";
import { useSelector } from "../../store"
import Button from "../common/Button";

const TeamDetailHeader: React.FC = () => {
    const team = useSelector((state) => state.team.detail);

    const requestPermission = () => {
        console.log("클릭이벤트");
    }

    return (
        <div className="h-64 bg-gray-100">
            <div className="">
                <Image 
                    src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team?.emblem}`}
                    width={200}
                    height={200}
                    alt="img"
                />
                {/* <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team?.emblem}`} alt="emblem" /> */}
            </div>
            <div>
                <Button onClick={requestPermission}>입단신청</Button>
            </div>
            <div className="flex space-x-2">
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/`}>
                        <h2>개요</h2>
                    </Link>
                </div>
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/squad`}>
                        <h2>스쿼드</h2>
                    </Link>
                </div>
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/squad`}>
                        <h2>일정</h2>
                    </Link>
                </div>
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/squad`}>
                        <h2>결과</h2>
                    </Link>
                </div>
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/squad`}>
                        <h2>시즌역사</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TeamDetailHeader;