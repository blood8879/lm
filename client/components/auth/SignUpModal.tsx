import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import useValidateMode from "../../hooks/useValidateMode";
import { signupAPI } from "../../lib/api/auth";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import Button from "../common/Button";
import Input from "../common/Input";

const PASSWORD_MIN_LENGTH = 8;

interface IProps {
    closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [birthYear, setbirthYear] = useState<string | undefined>();
    const [birthDay, setbirthDay] = useState<string | undefined>();
    const [birthMonth, setbirthMonth] = useState<string | undefined>();
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const { validateMode, setValidateMode } = useValidateMode();

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const onFocusPassword = () => {
        setPasswordFocused(true);
    }

    const onFocusConfirmPassword = () => {
        setConfirmPasswordFocused(true);
    }

    // 비밀번호 이름 or 비밀번호 포함 여부 체크
    const isPasswordHasNameOrEmail = useMemo(
        () => 
            !password ||
            !name ||
            password.includes(name) ||
            password.includes(email.split("@")[0]),
        [password, name, email]
    );

    // 비밀번호 최소 자리수 체크
    const isPasswordOverMinLength = useMemo(
        () => !!password && password.length >= PASSWORD_MIN_LENGTH,
        [password]
    );

    // 비밀번호 숫자나 특수기호 포함여부 체크
    const isPasswordHasNumberOrSymbol = useMemo(
        () => 
            /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
            /[0-9]/g.test(password),
        [password]
    );

    const validateSignUpForm = () => {
        if(!email || !name || !password || !confirmPassword) {
            return false;
        }

        if(!password || isPasswordHasNameOrEmail || !isPasswordOverMinLength || !isPasswordHasNumberOrSymbol) {
            return false;
        }

        if(password !== confirmPassword) {
            return false;
        }

        return true;
    };

    const onSubmitSignUp = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setValidateMode(true);

        if(validateSignUpForm()) {
            try {
                const signUpBody = {
                    email,
                    name,
                    password
                };
                const { data } = await signupAPI(signUpBody);
                dispatch(userActions.setLoggedUser(data));
                router.push("/");
                closeModal();
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        setValidateMode(false);
    }, []);

    return (
        <div className="mb-4">
            <div className="w-full bg-cyan-700 flex">
                <p className="text-lg py-3 px-5 h-12 font-mono font-bold text-white float-left w-[32rem]">회원가입</p>
                <div className="float-right">
                    <button className="w-full cursor-pointer py-3 px-5 text-white hover:text-black" onClick={closeModal}>x</button>
                </div>
            </div>
            <form onSubmit={onSubmitSignUp}>
                <div className="relative mb-4 mt-4 w-full px-5">
                    <Input placeholder="이메일 주소를 입력해 주세요." type="email" name="email" value={email} onChange={onChangeEmail} isValid={!!email} useValidation={validateMode} />
                </div>
                <div className="relative mb-4 w-full px-5">
                    <Input placeholder="이름을 입력해 주세요." type="text" name="name" value={name} onChange={onChangeName} isValid={!!name} useValidation={validateMode} />
                </div>
                <div className="relative mb-4 w-full px-5">
                    <Input placeholder="비밀번호를 입력해 주세요." type="password" name="password" value={password} onChange={onChangePassword} onFocus={onFocusPassword} isValid={!!password} useValidation={validateMode} />
                </div>
                {passwordFocused && isPasswordHasNameOrEmail && (
                    <div className="relative px-5">
                        <p className="flex text-red-500 text-bold mb-4">비밀번호는 이름이나 이메일 주소를 포함할 수 없습니다.</p>
                    </div>
                )}
                {passwordFocused && !isPasswordOverMinLength && (
                    <div className="relative px-5">
                        <p className="flex text-red-500 text-bold mb-4">비밀번호는 최소 8자 이상이어야 합니다.</p>
                    </div>
                )}
                {passwordFocused && !isPasswordHasNumberOrSymbol && (
                    <div className="relative px-5">
                        <p className="flex text-red-500 text-bold mb-4">비밀번호는 숫자나 특수문자를 포함해야 합니다.</p>
                    </div>
                )}
                <div className="relative mb-4 w-full px-5">
                    <Input placeholder="비밀번호를 다시 한번 입력해주세요." type="password" name="confirmPassword" value={confirmPassword} onChange={onChangeConfirmPassword} onFocus={onFocusConfirmPassword} isValid={!!confirmPassword} useValidation={validateMode} />
                </div>
                {confirmPasswordFocused && (password !== confirmPassword) && (
                    <div className="relative px-5">
                        <p className="flex text-red-500 text-bold mb-4">비밀번호가 일치하지 않습니다.</p>
                    </div>
                )}
                <div className="flex px-5 space-x-2">
                    {validateSignUpForm() ? (
                        <Button type="submit" size="medium" color="bg-pink-700" width="100" className="cursor-pointer">가입하기</Button>
                    ) : (
                        <Button type="submit" size="medium" color="bg-pink-700" width="100" disabled={true}>가입하기</Button>
                    )}
                    {/* <Button type="submit" size="medium" color="bg-pink-700" width="50" className="cursor:pointer">뒤로가기</Button> */}
                </div>
                <div className="border mt-2 border-b-gray-100"/>
                <p className="mt-4 px-5 text-gray-400">
                    이미 계정이 있으신가요?
                    <span
                        className="cursor-pointer ml-2 text-blue-400"
                        role="presentation"
                        onClick={() => dispatch(authActions.setAuthMode("login"))}
                    >
                        로그인
                    </span>
                </p>
            </form>
        </div>
    )
};

export default SignUpModal;