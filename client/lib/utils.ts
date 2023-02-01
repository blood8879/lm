// "token=value"를 {token: "value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
    const cookies: { [key: string]: string } = {};
    if(cookieString) {
        // "token=value"
        const itemString = cookieString?.split(/\s*;\s*/);
        itemString.forEach((pairs) => {
            // ["token", "value"]
            const pair = pairs.split(/\s*=\s*/);
            // pair.splice(1)의 리턴 값은 Array, String 형식으로 바꿔주기 위해 join() 사용;
            cookies[pair[0]] = pair.splice(1).join();
        });
    }
    return cookies;
}