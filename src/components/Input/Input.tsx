import "./Input.scss";
import { useRef, CSSProperties, ChangeEvent } from "react";
import CalenderSVG from "/svgs/calender.svg";
import { IMaskInput } from "react-imask";

type inputTypeKey =
  | "text"
  | "date"
  | "tel"
  | "dropdown"
  | "file"
  | "number"
  | "email"
  | "password";

type UnifiedChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

interface HTMLDateInput extends HTMLInputElement {
  showPicker?: () => void;
}


type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  inputType?: inputTypeKey;
  imgSrc?: string;
  inputDisabled?: boolean;
  imgStyles?: CSSProperties;
  inputOptions?: string[];
  doubleInputPlaceholder?: string;
  doubleInputDisabled?: boolean;
  doubleInputValue?: string;
  doubleInputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  fileNote?: string;
  fileSize?: number;
  fileType?: string;
  value?: any;
  id?: string;
  onChange?: (e: UnifiedChangeEvent) => void;
  errorMessage?: string | undefined;
};

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
  value,
  onChange,
  errorMessage,
  id
}: Props) {
  const dateRef = useRef<HTMLDateInput | null>(null);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2 && val.length <= 4) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    } else if (val.length > 4) {
      val = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4, 8);
    }
    e.target.value = val;
    onChange?.(e);
  };

  const handleHiddenDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const isoDate = e.target.value;
    if (!isoDate) return;

    const [year, month, day] = isoDate.split("-");
    const formatted = `${day}/${month}/${year}`;
    e.target.value = formatted;
    onChange?.({
      target: {value: formatted},
    } as UnifiedChangeEvent);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!(e.target instanceof HTMLSelectElement)) return;
    onChange?.(e);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = fileSize || 20 * 1024 * 1024;
    if (file.size > maxSize) {
      e.target.value = "";
      onChange?.(e);
      return;
    }

    const allowedTypes = (fileType || ".pdf,.doc,.docx")
      .split(",")
      .map((t) => t.trim().replace(".", ""));

    const fileExt = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!fileExt || !allowedTypes.includes(fileExt)) {
      e.target.value = "";
      onChange?.(e);
      return;
    }

    onChange?.(e);
  };

  const handleTelChange = (val: string) => {
    const event = {
      target: { value: val },
    } as ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  return (
    <div className={`Input ${errorMessage ? "Input--invalid" : ""}`} id={id}>
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
              else onChange?.(e);
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
              onChange={handleHiddenDateChange}
            />
          </div>
        ) : inputType === "tel" ? (
          <IMaskInput
            mask="+{998} (00) 000-00-00"
            type="tel"
            value={value}
            onAccept={handleTelChange}
            placeholder={placeholder}
            className="Input-input"
          />
        ) : inputType === "dropdown" ? (
          <select
            className="Input-input no-arrow"
            required={required}
            disabled={inputDisabled}
            value={value || ""}
            onChange={handleSelectChange}
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
            onChange={onChange}
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
