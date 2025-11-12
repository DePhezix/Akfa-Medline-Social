import './Button.scss'
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

function Button({text, imgSrc, variant, additionalStyle, onButtonClick, buttonType = 'button', children, className, fontSize}: Props) {
    const variants: Record<buttonVariant, CSSProperties> = {
      black: {
        backgroundColor: "#222222",
        color: "#ffffff",
      },
      black2: {
        backgroundColor: "#1E1E1F",
        color: "#ffffff",
      },
      white: {
        color: "#1E1E1F",
        backgroundColor: "#ffffff",
        border: "1px solid #1E1E1F33",
      },
      transparent: {
        backgroundColor: "transparent",
        color: "#000"
      },
    };
    const fontSizes: Record<fontsType, CSSProperties> = {
      sm: {
        fontSize: "13px",
      },
    };
    const combinedStyles = {
      ...(variant ? variants[variant] : {}),
      ...additionalStyle,
    };
    return (
      <button
        type={buttonType}
        className={`button ${className ? className : ""}`}
        style={combinedStyles}
        onClick={onButtonClick}
      >
        {text && (
          <div
            className="text"
            style={fontSize ? { ...fontSizes[fontSize] } : {}}
          >
            {text}
          </div>
        )}
        {imgSrc && <img src={imgSrc} className="image" />}
        {children}
      </button>
    );
}

export default Button