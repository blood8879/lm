import { NextPage } from "next";
import { useRouter } from "next/router"
import RegisterFixture from "../../components/team/fixture/RegisterFixture";
import RegisterResult from "../../components/team/fixture/registerResult";


const registerResult: NextPage = () => {
    return <RegisterResult />
}

export default registerResult;