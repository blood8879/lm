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

    if(!validateMode) {
        return(
            <div>
                {!label && (<input className="rounded border-solid border h-12 text-base relative w-full focus:outline-none focus:border-indigo-500 p-2.5 text-sm" {...props} />)}
                {icon}
            </div>
        )
    } else if(validateMode && isValid) {
        return(
            <div>
                {!label && (<input className="rounded border-solid border border-green-700 h-12 text-base relative w-full focus:outline-none p-2.5 text-sm" {...props} />)}
                {icon}
            </div>
        )
    } else if(validateMode && !isValid) {
        return(
            <div>
                {!label && (<input className="rounded border-solid border border-red-700 h-12 text-base relative w-full focus:outline-none p-2.5 text-sm" {...props} />)}
                {icon}
            </div>
        )
    } else {
        return (
            <></>
        )
    }
    // return (
    //     <div>
    //         {/* {label && (
    //             <label>
    //                 <span className="block mb-2">{label}</span>
    //                 <input className="rounded border-solid border h-12 text-base relative w-full focus:outline-none focus:border-indigo-500" {...props} />
    //             </label>
    //         )} */}
    //         {!label && !validateMode && <input className="rounded border-solid border h-12 text-base relative w-full focus:outline-none focus:border-indigo-500 p-2.5 text-sm" {...props} />}
    //         {!label && validateMode && isValid && (
    //             <input className="rounded border-solid border border-green-700 h-12 text-base relative w-full focus:outline-none p-2.5 text-sm" {...props} />
    //         )}
    //         {!label && validateMode && !isValid && (
    //             <input className="rounded border-solid border border-red-500 h-12 text-base relative w-full focus:outline-none p-2.5 text-sm" {...props} />
    //         )}
    //         {icon}
    //         {useValidation && validateMode && !isValid && errorMessage && (
    //             <p className="font-semibold text-sm mt-2 text-red-400">{errorMessage}</p>
    //         )}
    //     </div>
    // );
};

export default React.memo(Input);