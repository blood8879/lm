import { addHours } from "date-fns";
import ko from "date-fns/locale/ko";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"

const DatePicker: React.FC<ReactDatePickerProps> = ({ onChange, ...props }) => {
    return (
        <div>
            <ReactDatePicker 
                {...props}
                dateFormat="yyyy-MM-dd"
                locale={ko}
                onChange={(date, event) => {
                    if(date) {
                        onChange(addHours(date as Date, 9), event);
                    } else {
                        onChange(null, event);
                    }
                }}
            />
        </div>
    )
}

export default DatePicker;