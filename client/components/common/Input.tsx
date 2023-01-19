import React from "react";

type InputContainerProps = {
    iconExist: boolean;
    isValid: boolean;
    useValidation: boolean;
};

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element;
    label?: string;
    isValid?: boolean;
    useValidation?: boolean;
}

const Input: React.FC<IProps> = ({ icon, label, isValid= false, useValidation = true, ...props}) => {
    return (
        <div>
            {label && (
                <label>
                    <span>{label}</span>
                    <input {...props} />
                </label>
            )}
            {!label && <input {...props} />}
        </div>
    );
};

export default React.memo(Input);