import { addHours } from "date-fns";
import ko from "date-fns/locale/ko";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const DatePicker: React.FC<ReactDatePickerProps> = ({ onChange, dateFormat, ...props }) => {
    return (
        <div>
            <ReactDatePicker 
                {...props}
                // dateFormat="yyyy-MM-dd"
                dateFormat={dateFormat}
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