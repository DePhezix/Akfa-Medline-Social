import "./Input.scss";
import { useState, useRef } from "react";
import CalenderSVG from "/svgs/calender.svg";
import { IMaskInput } from "react-imask";


function Input({
  label,
  placeholder,
  required,
  inputType,
  imgSrc,
  imgStyles,
  inputDisabled,
  inputOptions,
  doubleInputPlaceholder,
  doubleInputDisabled,
  doubleInputValue,
  doubleInputOnChange,
  fileNote,
  fileType,
  fileSize,
  value: externalValue,
  onChange,
  errorMessage,
}) {
  const [localValue, setLocalValue] = useState("");
  const value = externalValue !== undefined ? externalValue : localValue;
  const dateRef = useRef(null);

  const handleValueChange = (e) => {
    const val = e.target.value;
    if (onChange) onChange(e);
    else setLocalValue(val);
  };

  const handleDateChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2 && val.length <= 4)
      val = val.slice(0, 2) + "/" + val.slice(2);
    else if (val.length > 4)
      val = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4, 8);

    if (onChange) onChange({ target: { value: val } });
    else setLocalValue(val);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = fileSize || 20 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File too large. Max size: ${maxSize / (1024 * 1024)} MB`);
      e.target.value = "";
      if (onChange) onChange({ target: { value: "" } });
      else setLocalValue("");
      return;
    }

    const allowedTypes = (fileType || ".pdf,.doc,.docx")
      .split(",")
      .map((t) => t.trim().replace(".", ""));
    const fileExt = file.name
      .split(".")
      .pop()
      .toLowerCase();
    if (!allowedTypes.includes(fileExt)) {
      alert(`Invalid file type. Allowed: ${allowedTypes.join(", ")}`);
      e.target.value = "";
      if (onChange) onChange({ target: { value: "" } });
      else setLocalValue("");
      return;
    }

    if (onChange) onChange({ target: { value: file.name, file } });
    else setLocalValue(file.name);
  };

  return (
    <div className={`Input ${errorMessage ? "Input--invalid" : ""}`}>
      {label && (
        <label className="Input-header">
          {label} {required && <span className="star">*</span>}
        </label>
      )}
      <div className="inputContainer">
        {doubleInputPlaceholder && (
          <input
            type="text"
            className="Input-input"
            required={required}
            placeholder={doubleInputPlaceholder}
            disabled={doubleInputDisabled || inputDisabled}
            value={doubleInputValue}
            onChange={(e) => {
              if (doubleInputOnChange) doubleInputOnChange(e);
              else handleValueChange(e);
            }}
          />
        )}

        {inputType === "date" ? (
          <div className="dateWrapper">
            <input
              type="text"
              inputMode="numeric"
              className="Input-input"
              required={required}
              placeholder={placeholder || "ДД/ММ/ГГГГ"}
              disabled={inputDisabled}
              value={value}
              onChange={handleDateChange}
              maxLength={10}
            />
            <img
              src={CalenderSVG}
              alt="calendar"
              onClick={() => dateRef.current?.showPicker?.()}
              className="calender-icon"
            />
            <input
              ref={dateRef}
              type="date"
              className="hidden-dateInput"
              onChange={(e) => {
                const isoDate = e.target.value;
                if (!isoDate) return;
                const [year, month, day] = isoDate.split("-");
                const formatted = `${day}/${month}/${year}`;
                if (onChange) onChange({ target: { value: formatted } });
                else setLocalValue(formatted);
              }}
            />
          </div>
        ) : inputType === "tel" ? (
          <IMaskInput
            mask="+{998} (00) 000-00-00"
            type="tel"
            value={value}
            onAccept={(val) => onChange({ target: { value: val } })}
            placeholder={placeholder}
            className="Input-input"
          />
        ) : inputType === "dropdown" ? (
          <select
            className="Input-input no-arrow"
            required={required}
            disabled={inputDisabled}
            value={value || ""}
            onChange={handleValueChange}
          >
            <option value="" disabled hidden>
              {placeholder || "Выберите вариант"}
            </option>
            {inputOptions?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : inputType === "file" ? (
          <label
            className="Input-input fileContainer"
            htmlFor={label?.replace(/\s+/g, "_") || "file_input"}
          >
            <input
              id={label?.replace(/\s+/g, "_") || "file_input"}
              type="file"
              required={required}
              disabled={inputDisabled}
              className="hidden-file-input"
              accept={fileType || ".pdf,.doc,.docx"}
              onChange={handleFileChange}
            />
            <div className="file-box">
              <div className="file-placeholder">
                {value || placeholder || "Upload file"}
              </div>
              {fileNote && <div className="file-note">{fileNote}</div>}
            </div>
          </label>
        ) : (
          <input
            type={inputType || "text"}
            className="Input-input"
            required={required}
            placeholder={placeholder}
            disabled={inputDisabled}
            value={value}
            onChange={handleValueChange}
          />
        )}

        {imgSrc && (
          <img
            src={imgSrc}
            alt=""
            className="Input-image"
            style={{ ...imgStyles }}
          />
        )}
      </div>
      {errorMessage && <div className="Input-error">{errorMessage}</div>}
    </div>
  );
}

export default Input;
