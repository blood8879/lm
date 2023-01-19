import { useState } from "react";

const PASSWORD_MIN_LENGTH = 8;

interface IProps {
    closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");

    return (
        <form>
            <div>
                인풋
            </div>
        </form>
    )
}

export default SignUpModal;