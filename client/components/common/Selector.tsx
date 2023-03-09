import React, { useState } from "react";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options?: string[];
    value?: string;
    boolean?: boolean;
    disabledOptions?: string[];
    isValid?: boolean;
    searchOpt?: boolean;
}

const Selector: React.FC<IProps> = ({
    label,
    options = [],
    isValid,
    disabledOptions=[],
    searchOpt = false,
    ...props
}) => {
    const [searchText, setSearchText] = useState("");
    
    return (
        <label>
            {label && <span>label</span>}
            {searchOpt && (
                <input 
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            )}
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