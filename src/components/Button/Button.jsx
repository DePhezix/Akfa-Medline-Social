import './Button.scss'

function Button({text, imgSrc, variant, additionalStyle, onButtonClick, buttonType, children, className}) {
    const variants = {
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
    };
    const combinedStyles = {...variants[variant], ...additionalStyle}
    return (
      <button type={buttonType} className={`button ${className ? className : ''}`} style={combinedStyles} onClick={onButtonClick} >
        {text && <div className="text">{text}</div>}
        {imgSrc && <img src={imgSrc} className="image" />}
        {children}
      </button>
    );
}

export default Button