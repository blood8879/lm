import React from "react";
import useValidateMode from "../../hooks/useValidateMode";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element;
    label?: string;
    isValid?: boolean;
    useValidation?: boolean;
    errorMessage?: string;
}

const Input: React.FC<IProps> = ({ icon, label, isValid= false, useValidation = true, errorMessage, ...props}) => {
    const { validateMode } = useValidateMode();
    return (
        <div>
            {label && (
                <label>
                    <span className="block mb-2">{label}</span>
                    <input className="rounded border-solid border h-12 text-base relative w-full focus:outline-none focus:border-indigo-500" {...props} />
                </label>
            )}
            {!label && <input className="rounded border-solid border h-12 text-base relative w-full focus:outline-none focus:border-indigo-500 p-2.5 text-sm" {...props} />}
            {icon}
            {useValidation && validateMode && !isValid && errorMessage && (
                <p className="font-semibold text-sm mt-2">{errorMessage}</p>
            )}
        </div>
    );
};

export default React.memo(Input);