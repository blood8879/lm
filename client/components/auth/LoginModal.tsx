import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import Button from "../common/Button";
import Input from "../common/Input";

interface IProps {
    closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitLogin = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!email || !password) {
            return;
        } else {
            const loginBody = { email, password };

            try {
                const { data } = await loginAPI(loginBody);
                dispatch(userActions.setLoggedUser(data.user));
                closeModal();
            } catch(e) {
                console.log(e);
            }
        }
    }

    return (
        <>
        <div>
            <form onSubmit={onSubmitLogin}>
                <div className="relative mb-4 mt-4 w-full px-5">
                    <Input placeholder="이메일 주소를 입력해 주세요." type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="relative mb-4 mt-4 w-full px-5">
                    <Input placeholder="비밀번호를 입력해 주세요." type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex px-5 space-x-2">
                    {(!email || !password) ? (
                        <Button type="submit" size="medium" color="bg-pink-700" width="100" disabled={true}>로그인</Button>
                    ) : (
                        <Button type="submit" size="medium" color="bg-pink-700" width="100">로그인</Button>
                    )}
                </div>
            </form>
        </div>
        <p className="mt-4 px-5 text-gray-400">
            비밀번호가 기억나지 않으시나요?
            <span
                className="cursor-pointer ml-2 text-blue-400"
                role="presentation"
                // onClick={() => dispatch(authActions.setAuthMode("login"))}
            >
                비밀번호 찾기
            </span>
        </p>
        </>
    )
}

export default LoginModal;