import { useRouter } from "next/router";
import React from "react";

const RegisterResult: React.FC = () => {
    const router = useRouter();
    const matchInfo = router.query;
    console.log("matchInfo===", matchInfo);
    // console.log("1111===", this.props);

    const checkProps = () => {
        console.log("matchInfo===", matchInfo);
    } 
        
    
    return (
        <div>
            경기결과등록
            <button onClick={checkProps}>클릭</button>
            {/* <h2>{matchInfo._id}</h2> */}
            <h2>{matchInfo.venue}</h2>
            <h2>{matchInfo._id}</h2>
        </div>
    )
}

export default RegisterResult;