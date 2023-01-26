import React from "react";
import { useDispatch } from "react-redux";
import Input from "../common/Input";

interface IProps {
    closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
    const dispatch = useDispatch();

    return (
        <div>
            <form>
                <div className="relative mb-4 mt-4 w-full px-5">
                    <Input placeholder="이메일 주소를 입력해 주세요." type="email" name="email" />
                </div>
            </form>
        </div>
    )
}

export default LoginModal;