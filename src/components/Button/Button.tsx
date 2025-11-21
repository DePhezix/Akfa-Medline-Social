import { MouseEventHandler, CSSProperties, ReactNode } from 'react'

type buttonVariant = "black" | "black2" | "white" | "transparent"
type fontsType = "sm"

type Props = {
  text?: string,
  imgSrc?: string,
  variant?: buttonVariant,
  additionalStyle?: CSSProperties,
  onButtonClick?: MouseEventHandler,
  buttonType?: "reset" | "button" | "submit" | undefined,
  className?: string, 
  fontSize?: fontsType,
  children?: ReactNode
}

function Button({text, imgSrc, variant, onButtonClick, buttonType = 'button', children, className, fontSize}: Props) {
    const variantClasses: Record<buttonVariant, string> = {
      black: "!bg-[#222222] !text-white",
      black2: "!bg-[#1E1E1F] !text-white",
      white: "!bg-white !text-[#1E1E1F] !border !border-[#1E1E1F33]",
      transparent:
        "!bg-transparent !text-black !border !border-solid !border-[#e5e7eb]",
    };

    const fontClasses: Record<fontsType, string> = {
      sm: "!text-[13px]",
    };
    return (
      <button
        type={buttonType}
        className={`flex rounded-[5px] p-[16px] gap-[7px] bg-red items-center text-white w-full cursor-pointer border-0 justify-center duration-300 ease-in-out hover:brightness-[0.85] hover:-translate-y-px ${variant ? variantClasses[variant] : ""} ${
          className ? className : ""
        }`}
        onClick={onButtonClick}
      >
        {text && (
          <div
            className={`w-full min-w-[119px] h-[19px] text-[16px] flex items-center justify-center ${fontSize ? fontClasses[fontSize]  : ""}`}
          >
            {text}
          </div>
        )}
        {imgSrc && <img src={imgSrc} />}
        {children}
      </button>
    );
}

export default Button