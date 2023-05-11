import { useSelector } from "../store";

const UserProfile: React.FC = () => {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <p>{user._id}</p>
            <p>{user.name}</p>
        </div>
    )
}

export default UserProfile;