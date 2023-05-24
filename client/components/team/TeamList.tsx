import Link from "next/link";
import { useSelector } from "../../store"
import Image from "next/image";

const TeamList: React.FC = () => {
    const teams = useSelector((state) => state.team.teams);

    // console.log("teams==", teams);

    return (
        <div className="container px-4 flex mx-auto space-x-2">
            {teams.map((team, key) => (
                <div key={team._id}>
                    <Link href={`/team/${team._id}`}>
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team.emblem}`}
                            width={200}
                            height={200}
                            alt="img"
                        />
                        <h2 className="center">{team.name}</h2>
                    </Link>
                    {/* <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team.emblem}`} alt="emblem" /> */}
                    
                </div>
            ))}
        </div>
    );
};

export default TeamList;