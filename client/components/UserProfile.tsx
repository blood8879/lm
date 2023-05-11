import { useSelector } from "../store";

const UserProfile: React.FC = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className="container px-2 py-12 mx-auto">
            <h2 className="mb-8 font-bold text-2xl">정보수정</h2>
            <form>
                <div className="flex space-x-4">
                    <span className="">이메일:</span>
                    {/* <span className="w-[10%]"></span> */}
                    <span>{user.email}</span>
                </div>
            </form>
            
            
        </div>
    )
}

export default UserProfile;