import { useEffect, useState } from "react";
import useValidateMode from "../../hooks/useValidateMode";
import Input from "../common/Input";

const PASSWORD_MIN_LENGTH = 8;

interface IProps {
    closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");

    const { validateMode, setValidateMode } = useValidateMode();

    useEffect(() => {
        setValidateMode(false);
    }, []);

    return (
        <div className="mb-4">
            <form className="">
                <div className="relative mb-4">
                    <Input placeholder="이메일 주소" type="email" name="email" label="이메일 주소"/>
                </div>
                <div className="relative mb-4">
                    <Input placeholder="이메일 주소" type="email" name="email" />
                </div>
                <div className="relative mb-4">
                    <Input placeholder="이메일 주소" type="email" name="email" />
                </div>
            </form>
        </div>
        
    )
}

export default SignUpModal;