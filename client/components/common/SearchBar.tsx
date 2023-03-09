import React from "react";

interface IProps {
    value: string | undefined;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<IProps> = ({
    value,
    onChange,
    placeholder
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <input className="rounded border-solid border h-12 text-base relative w-full focus:outline-none focus:border-indigo-500 p-2.5 text-sm"
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default SearchBar;