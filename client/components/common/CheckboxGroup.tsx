interface IProps {
    value?: string[];
    onChange: (selected: string[]) => void;
    options?: string[];
}

const CheckboxGroup: React.FC<IProps> = ({
    value = [],
    onChange,
    options=[],
}) => {
    return (
        <div>
            {options.map((option) => (
                <label className="" key={option}>
                    <input 
                        type="checkbox"
                        checked={value?.includes(option)}
                        onChange={(e) => {
                            if(e.target.checked) {
                                onChange([...value!, option]);
                            } else {
                                onChange(value.filter((option_) => option_ !== option));
                            }
                        }}
                    />
                    <span />
                    {option}
                </label>
            ))}
        </div>
    );
};

export default CheckboxGroup;