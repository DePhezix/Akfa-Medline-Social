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
    <div
      className={`flex flex-col w-full flex-1 gap-[13px] relative text-black`}
      id={id}
    >
      {label && (
        <label className="text-[16px]">
          {label} {required && <span className="text-red3">*</span>}
        </label>
      )}
      <div className="flex gap-[13px] relative">
        {doubleInputPlaceholder && (
          <input
            type="text"
            className={`w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0  ${
              errorMessage ? "border-red2 outline-0" : ""
            } `}
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
          <div className="relative flex items-center w-full">
            <input
              type="text"
              inputMode="numeric"
              className={`w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0  ${
                errorMessage ? "border-red2 outline-0" : ""
              } `}
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
              className="absolute right-[10px] w-[20px] h-[20px] cursor-pointer opacity-70 transition-opacity duration-200 ease-in-out hover:opacity-100"
            />
            <input
              ref={dateRef}
              type="date"
              className="absolute left-[0] top-[0] w-full h-full opacity-0 pointer-events-none"
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
            className={`w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0  ${
              errorMessage ? "border-red2 outline-0" : ""
            } `}
          />
        ) : inputType === "dropdown" ? (
          <select
            className={`appearance-none w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px]] flex gap-[10px] text-[16px] overflow-x-auto pr-[40px] text-[#737474] focus:outline-0 focus:text-black  cursor-pointer${
              errorMessage ? "border-red2 outline-0" : ""
            } `}
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
            className={`w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0  justify-center h-[96px] cursor-pointer ${
              errorMessage ? "border-red2 outline-0" : ""
            } `}
            htmlFor={label?.replace(/\s+/g, "_") || "file_input"}
          >
            <input
              id={label?.replace(/\s+/g, "_") || "file_input"}
              type="file"
              required={required}
              disabled={inputDisabled}
              className="hidden"
              accept={fileType || ".pdf,.doc,.docx"}
              onChange={handleFileChange}
            />
            <div className="text-center flex flex-col gap-[12px] justify-center">
              <div className="font-[600] pointer-events-none">
                {value || placeholder || "Upload file"}
              </div>
              {fileNote && (
                <div className="text-[14px] text-[#737474] pointer-events-none">
                  {fileNote}
                </div>
              )}
            </div>
          </label>
        ) : (
          <input
            type={inputType || "text"}
            className={`w-full border border-solid border-[#e9ebeb] bg-[#f5f5f5] p-[16px] pl-[18px] pr-[40px] flex gap-[10px] text-[16px] overflow-x-auto focus:outline-0  ${
              errorMessage ? "border-red2 outline-0" : ""
            } `}
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
            className="w-[20px] f-[20px] absolute right-[18px] top-[50%] -translate-y-1/3"
            style={{ ...imgStyles }}
          />
        )}
      </div>
      {errorMessage && (
        <div className="text-red2 text-[0.85rem] mt-[-4px]">{errorMessage}</div>
      )}
    </div>
  );
}

export default Input;
