import { stringify } from "querystring";

// req.params { _id:xx } 를 _id로 바꾸는 함수
export const objectToString = (paramString: any) => {
    if(paramString) {
        // const itemString = paramString?.split(/\s*=\s*/);
        const itemString = stringify(paramString).split("=")[1];
        return itemString
    }
} 
