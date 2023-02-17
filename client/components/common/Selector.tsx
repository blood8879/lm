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
}) => {
    return (
        <div></div>
    )
}

export default React.memo(Selector);