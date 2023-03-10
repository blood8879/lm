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

    // ???????????? ?????? or ???????????? ?????? ?????? ??????
    const isPasswordHasNameOrEmail = useMemo(
        () => 
            !password ||
            !name ||
            password.includes(name) ||
            password.includes(email.split("@")[0]),
        [password, name, email]
    );

    // ???????????? ?????? ????????? ??????
    const isPasswordOverMinLength = useMemo(
        () => !!password && password.length >= PASSWORD_MIN_LENGTH,
        [password]
    );

    // ???????????? ????????? ???????????? ???????????? ??????
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
                // dispatch(userActions.setLoggedUser(data));
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

    const passwordErrors = [
        {
          condition: isPasswordHasNameOrEmail,
          message: "??????????????? ???????????? ????????? ????????? ????????? ??? ????????????.",
        },
        {
          condition: !isPasswordOverMinLength,
          message: "??????????????? ?????? 8??? ??????????????? ?????????.",
        },
        {
          condition: !isPasswordHasNumberOrSymbol,
          message: "??????????????? ????????? ??????????????? ???????????? ?????????.",
        },
      ];

    return (
        <div className="mb-4">
            <div className="w-full bg-cyan-700 flex">
                <p className="text-lg py-3 px-5 h-12 font-mono font-bold text-white float-left w-[32rem]">????????????</p>
                <div className="float-right">
                    <button className="w-full cursor-pointer py-3 px-5 text-white hover:text-black" onClick={closeModal}>x</button>
                </div>
            </div>
            <form onSubmit={onSubmitSignUp}>
                <div className="relative mb-4 mt-4 w-full px-5">
                    <Input placeholder="????????? ????????? ????????? ?????????." type="email" name="email" value={email} onChange={onChangeEmail} isValid={!!email} useValidation={validateMode} />
                </div>
                <div className="relative mb-4 w-full px-5">
                    <Input placeholder="????????? ????????? ?????????." type="text" name="name" value={name} onChange={onChangeName} isValid={!!name} useValidation={validateMode} />
                </div>
                <div className="relative mb-4 w-full px-5">
                    <Input placeholder="??????????????? ????????? ?????????." type="password" name="password" value={password} onChange={onChangePassword} onFocus={onFocusPassword} isValid={!!password} useValidation={validateMode} />
                </div>
                {/* {passwordFocused && isPasswordHasNameOrEmail && (
                    <div className="relative px-5">
                        <p className="flex text-red-500 text-bold mb-4">??????????????? ???????????? ????????? ????????? ????????? ??? ????????????.</p>
                    </div>
                )}
                {passwordFocused && !isPasswordOverMinLength && (
                    <div className="relative px-5">
                        <p className="flex text-red-500 text-bold mb-4">??????????????? ?????? 8??? ??????????????? ?????????.</p>
                    </div>
                )}
                {passwordFocused && !isPasswordHasNumberOrSymbol && (
                    <div className="relative px-5">
                        <p className="flex text-red-500 text-bold mb-4">??????????????? ????????? ??????????????? ???????????? ?????????.</p>
                    </div>
                )} */}
                {passwordFocused &&
                    passwordErrors.map((error) =>
                        error.condition && (
                        <div className="relative px-5" key={error.message}>
                            <p className="flex text-red-500 text-bold mb-4">{error.message}</p>
                        </div>
                        )
                    )}
                <div className="relative mb-4 w-full px-5">
                    <Input placeholder="??????????????? ?????? ?????? ??????????????????." type="password" name="confirmPassword" value={confirmPassword} onChange={onChangeConfirmPassword} onFocus={onFocusConfirmPassword} isValid={!!confirmPassword} useValidation={validateMode} />
                </div>
                {confirmPasswordFocused && (password !== confirmPassword) && (
                    <div className="relative px-5">
                        <p className="flex text-red-500 text-bold mb-4">??????????????? ???????????? ????????????.</p>
                    </div>
                )}
                <div className="flex px-5 space-x-2">
                    {validateSignUpForm() ? (
                        <Button type="submit" size="medium" color="bg-pink-700" width="100" disabled={false}>????????????</Button>
                    ) : (
                        <Button type="submit" size="medium" color="bg-pink-700" width="100" disabled={true}>????????????</Button>
                    )}
                    {/* <Button type="submit" size="medium" color="bg-pink-700" width="50" className="cursor:pointer">????????????</Button> */}
                </div>
                <div className="border mt-2 border-b-gray-100"/>
                <p className="mt-4 px-5 text-gray-400">
                    ?????? ????????? ????????????????
                    <span
                        className="cursor-pointer ml-2 text-blue-400"
                        role="presentation"
                        onClick={() => dispatch(authActions.setAuthMode("login"))}
                    >
                        ?????????
                    </span>
                </p>
            </form>
        </div>
    )
};

export default SignUpModal;