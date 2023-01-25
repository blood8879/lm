import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    width?: "100" | "50";
    size?: "small" | "medium" | "large";
    color?: "bg-pink-700" | "bg-cyan-700";
}

const sizeConfig = {
    // size
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16',
}

const widthConfig = {
    '100': 'w-full',
    '50': 'w-1/2'
}

const colorConfig = {
    'bg-cyan-700': {
        bgColor: 'bg-cyan-700',
        color: 'text-white'
    },
    'bg-pink-700': {
        bgColor: 'bg-pink-700',
        color: 'text-white'
    }
}

const Button: React.FC<IProps> = ({ children, width = '100', size = 'medium', color = 'bg-cyan-700', ...props }) => {
    return (
        <button {...props} className={`rounded border-solid border p-1 center ${sizeConfig[size]} ${widthConfig[width]} ${colorConfig[color].bgColor} ${colorConfig[color].color}`}>
            {children}
        </button>
    )
}

export default React.memo(Button);

// tailwindcss 동적 클래스 사용 예제
// const buttonConfig = {
//     // Colors
//     primary: {
//       bgColor: 'bg-primary-500',
//       color: 'text-white',
//       outline:
//         'border-primary-500 text-primary-500 bg-opacity-0 hover:bg-opacity-10',
//     },
//     secondary: {
//       bgColor: 'bg-secondary-500',
//       color: 'text-white',
//       outline:
//         'border-secondary-500 text-secondary-500 bg-opacity-0 hover:bg-opacity-10',
//     },
  
//     // Sizes
//     small: 'text-red-500',
//     medium: 'text-blue-500',
//     large: 'text-green-500',
// };

// tailwindcss 동적 클래스 사용 예제
{/* <motion.button
whileTap={{ scale: 0.98 }}
className={`
rounded-lg font-bold transition-all duration-100 border-2 focus:outline-none
${buttonConfig[size]}
${outlined && buttonConfig[color].outline}
${buttonConfig[color].bgColor} ${buttonConfig[color].color}`}
onClick={onClick}
type="button"
tabIndex={0}
>
{children}
</motion.button> */}