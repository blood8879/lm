// Button.tsx 버튼 어트리뷰트에 width/size 임의로 추가해 주었음. 20230125 - Jiam

interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    name?: string | undefined;
    type?: 'submit' | 'reset' | 'button' | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
    width?: string | undefined;
    size?: 'small' | 'medium' | 'large';
}