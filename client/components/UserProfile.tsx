import Head from "next/head";
import React, { useState } from "react";
import { changeProfileAPI } from "../lib/api/auth";
import { useSelector } from "../store";
import Button from "./common/Button";
import Input from "./common/Input";

const UserProfile: React.FC = () => {
    const user = useSelector((state) => state.user);

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    }

    const onChangePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPasswordConfirm(event.target.value);
    }

    const onSubmitChangeInfo = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // console.log("newPassword ===", newPassword, "newPasswordConfirm===", newPasswordConfirm)

        if(newPassword == "" || newPasswordConfirm == "") {
            return;
        }

        if((!!newPassword && !!newPasswordConfirm) && newPassword != newPasswordConfirm) {
            alert("변경할 비밀번호가 일치하지 않습니다.")
            return;
        }

        if((!!newPassword && !!newPasswordConfirm) && (newPassword == newPasswordConfirm)) {
            try {
                const changePasswordBody = {
                    id: user._id,
                    newPassword,
                    newPasswordConfirm
                }
                console.log(changePasswordBody);
                await changeProfileAPI(changePasswordBody);
            } catch (e) {
                console.log(e);   
            }
        }

        
        
    }

    return (
        
        <div className="container px-2 py-12 mx-auto">
            <Head>
                <title>회원 정보 수정</title>
            </Head>
            <h2 className="mb-8 font-bold text-2xl">정보수정</h2>
            <form onSubmit={onSubmitChangeInfo}>
                <div className="flex space-x-4">
                    <span className="font-bold w-[10%]">이메일:</span>
                    {/* <span className="w-[10%]"></span> */}
                    <span>{user.email}</span>
                </div>
                <div className="flex space-x-4 mt-4">
                    <span className="font-bold w-[10%]">이름:</span>
                    <span>{user.name}</span>
                </div>
                <div className="flex space-x-4 mt-4">
                    <span className="font-bold w-[10%] mt-2.5">비밀번호 변경:</span>
                    <Input type="password" name="newPassword" value={newPassword} onChange={onChangePassword} />
                </div>
                <div className="flex space-x-4 mt-4">
                    <span className="font-bold w-[10%] mt-2.5">비밀번호 확인:</span>
                    <Input type="password" name="newPasswordConfirm" value={newPasswordConfirm} onChange={onChangePasswordConfirm} />
                </div>
                {/* <div className="mt-4">
                    <span className="font-bold w-[10%]">프로필 이미지:</span>
                    {!user.profileImage ? (
                        <div>
                            <input type="file" accept="image/*" className="mt-4"/>
                        </div>
                    ) : (
                        <div>
                            <img alt="preview-img" />
                            <input type="file" accept="image/*" className="mt-4"/>    
                        </div>
                    )}
                </div> */}
                <div className="pt-4">
                    <Button type="submit">수정하기</Button>
                </div>
            </form>
            
            
        </div>
    )
}

export default UserProfile;