import React from "react";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options?: string[];
    value?: string;
    boolean?: boolean;
    disabledOptions?: string[];
    isValid?: boolean;
}

const Selector: React.FC<IProps> = ({
    label,
    options = [],
    isValid,
    disabledOptions=[],
    ...props
}) => {
    return (
        <label>
            {label && <span>label</span>}
            <select {...props}>
                {disabledOptions.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default React.memo(Selector);