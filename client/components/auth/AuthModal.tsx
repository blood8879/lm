import { RootState, useSelector } from "../../store";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

interface IProps {
    closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
    const authMode = useSelector((state: RootState) => state.auth.authMode);

    return (
        <div>
            {authMode === "signup" ? (
                <SignUpModal closeModal={closeModal} />
            ) : (
                <LoginModal closeModal={closeModal} />
            )}
        </div>
    );
};

export default AuthModal;