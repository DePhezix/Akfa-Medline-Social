import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
  useRef,
} from "react";
import X from "/svgs/x.svg";
import Input from "../../../components/Input/Input.js";
import DownArrow from "/svgs/downArrow.svg";
import Button from "../../../components/Button/Button.js";
import Plus from "/svgs/plus.svg";
import { useParams } from "react-router-dom";
import { postApplicant } from "../../../ApiCalls/postApplicant.js";
import { useBoundStore } from "../../../store/Store.js";
import { gsap, useGSAP } from "../../../gsapConfig.js";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type languagesType = { name: string; level: string }[];

interface toastType {
  message: string;
  visible: boolean;
  error: boolean;
}

interface errorType {
  fullName?: string;
  email?: string;
  phone?: string;
  citizenship?: string;
  dob?: string;
  placeOfBirth?: string;
  educationLevel?: string;
  languages?: string;
  startDate?: string;
  employmentStatus?: string;
  cv?: string;
}

interface formType {
  fullName: string;
  email: string;
  phone: string;
  citizenship: string;
  dob: string;
  placeOfBirth: string;
  educationLevel: string;
  languages: languagesType;
  startDate: string;
  employmentStatus: string;
  cv: { file: File | undefined | null; name: string };
}

interface postApplicantArgumentsType extends formType {
  jobid: string;
  resume: File;
}

function JoinWaitingList({ isOpen, setIsOpen }: Props) {
  const { jobid } = useParams<{ jobid: string }>();
  const [phase, setPhase] = useState(1);
  const [errors, setErrors] = useState<errorType>({});
  const [toast, setToast] = useState<toastType>({
    message: "",
    visible: false,
    error: false,
  });
  const [formData, setFormData] = useState<formType>({
    fullName: "",
    email: "",
    phone: "",
    citizenship: "",
    dob: "",
    placeOfBirth: "",
    educationLevel: "",
    languages: [{ name: "", level: "" }],
    startDate: "",
    employmentStatus: "",
    cv: { file: null, name: "" },
  });
  const setIsPopUpOpen = useBoundStore((state) => state.setPopUp);

  const container = useRef<HTMLDivElement | null>(null);
  const menu = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = container.current;
    const el2 = menu.current;

    if (isOpen) {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.fromTo(el2, {
        opacity: 0,
        translateY: 40,
      }, {
        opacity: 1,
        translateY: 10,
        duration: 0.35,
      })
    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 1.05,
        duration: 0.2,
      });
      gsap.to(el2, {
        translateY: 40,
        opacity: 0,
        duration: 0.2,
      })
    }
  }, [isOpen]);

  const handleInputChange =
    (field: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const showToast = (msg: string, error: boolean) => {
    setToast({ message: msg, visible: true, error: error });
    setTimeout(
      () => setToast({ message: "", visible: false, error: false }),
      4000
    );
  };

  const validateForm = () => {
    const newErrors: errorType = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number format";

    if (!formData.citizenship.trim())
      newErrors.citizenship = "Citizenship is required";

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required";
    } else {
      const parts = formData.dob.split("/").map(Number);
      var [day, month, year] = parts;
      day = Number(day);
      month = Number(month);
      year = Number(year);

      if (
        parts.length !== 3 ||
        parts.some((n) => isNaN(n)) ||
        year < 1900 ||
        month < 1 ||
        month > 12 ||
        day < 1
      ) {
        newErrors.dob = "Invalid date format (dd/mm/yyyy)";
      } else {
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
          newErrors.dob = `Invalid day for month ${month}`;
        } else {
          const dob = new Date(year, month - 1, day);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (dob > today) {
            newErrors.dob = "Date of birth cannot be in the future";
          }
        }
      }
    }

    if (!formData.placeOfBirth.trim())
      newErrors.placeOfBirth = "Place of birth is required";

    if (!formData.educationLevel.trim())
      newErrors.educationLevel = "Education level is required";

    if (!formData.employmentStatus.trim())
      newErrors.employmentStatus = "Employment status is required";

    if (!formData.cv?.file) newErrors.cv = "Resume is required";

    return newErrors;
  };

  const handleLanguageChange = (
    index: number,
    field: keyof languagesType[number],
    value: string
  ) => {
    setFormData((prev) => {
      const updated: languagesType = [...prev.languages];
      const item = updated[index];
      if (item) {
        item[field] = value;
      }
      return { ...prev, languages: updated };
    });
  };

  const addLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, { name: "", level: "" }],
    }));
  };

  const removeLanguage = () => {
    if (formData.languages.length > 1) {
      setFormData((prev) => ({
        ...prev,
        languages: prev.languages.slice(0, -1),
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      citizenship: "",
      dob: "",
      placeOfBirth: "",
      educationLevel: "",
      languages: [{ name: "", level: "" }],
      startDate: "",
      employmentStatus: "",
      cv: { file: null, name: "" },
    });
  };

  const handleClose = () => {
    resetForm();
    setIsPopUpOpen(false);
    setIsOpen(false);
    setPhase(1);
  };

  const onFormSubmit = () => {
    const validationErrors: errorType = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const firstErrorEl = document.getElementById(firstErrorField);
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
          firstErrorEl.focus();
        }
      }
    } else {
      setErrors({});
      setPhase(2);
    }
  };

  const onFormConfirm = async () => {
    if (!jobid || !formData.cv.file) return;
    const postApplicantArguments: postApplicantArgumentsType = {
      ...formData,
      jobid,
      resume: formData.cv.file,
    };
    const applicantPost = await postApplicant(postApplicantArguments);

    if (applicantPost == "success") {
      setIsPopUpOpen(false);
      setIsOpen(false);
      setPhase(1);
      resetForm();
    } else {
      showToast(applicantPost, true);
    }
  };

  const onBack = () => {
    setPhase(1);
  };

  const handleFileSubmit = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      return {
        ...prev,
        cv: {
          file: file ?? null,
          name: file?.name ?? "",
        },
      };
    });
  };

  const StopPropogate = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`h-screen w-screen top-[0] fixed flex justify-center z-10000 bg-[rgba(0,0,0,0.45)] backdrop-blur-[6px]  overflow-y-auto p-[60px] [&_input,select]:transition-[border,box-shadow]  [&_input,select]:duration-200  [&_input,select]:ease-linear [&_input,select]:focus:border-[#0057ff] [&_input,select]:focus:outline-0  [&_input,select]:focus:shadow-blue max-sm-md:bg-white max-sm-md:p-[0]
      ${!isOpen ? "hidden" : ""}`}
      style={phase === 2 ? { alignItems: "center" } : {}}
      onClick={handleClose}
      ref={container}
    >
      <div
        className={`flex flex-col w-[758px] bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] p-[40px] gap-[36px] text-black h-min shadow-middle max-sm-md:h-min max-sm-md:m-[0] max-sm-md:p-[40px] max-sm-md:pl-[20px] max-sm-md:pr-[20px] max-sm-md:shadow-none max-sm-md:bg-white ${
          phase === 2
            ? "items-center mt-[0] max-sm:w-full max-sm:h-screen justify-center gap-[64px]"
            : ""
        }`}
        ref={menu}
        onClick={StopPropogate}
      >
        <div className="flex w-full gap-[48px] items-start justify-end">
          {phase === 1 && (
            <div className=" w-full">
              <div className=" text-[40px] max-sm-md:text-[24px]">
                Join the Waiting List
              </div>
            </div>
          )}
          <img
            onClick={handleClose}
            src={X}
            alt="close button"
            className="w-[28px] h-[28px] cursor-pointer rounded-[50%] flex justify-center items-center transition duration-250 ease-linear hover:bg-[rgba(0,0,0,0.1)] hover:rotate-90"
          />
        </div>

        <>
          <div
            className={`flex flex-col gap-[16px] ${
              phase === 2 ? "hidden" : ""
            }`}
          >
            <div className="font-[700] text-[20px] max-sm-md:font-[400]">
              Would you like to join us?
            </div>
            <div className="text-[16px] leading-[150%] text-gray]">
              We are building a waiting list of candidates for a new, modern
              clinic that will soon open its doors. If you're interested in
              working with us, simply fill out this short form — we’ll contact
              you as soon as the active recruitment phase begins.
            </div>
            <div className="font-[700] text-[20px] max-sm-md:font-[400]">
              Be the first one we invite for an interview!
            </div>
          </div>

          <form className="flex w-full flex-col gap-24px">
            <div
              className={`flex w-full flex-col gap-[24px]  ${
                phase === 2 ? "hidden" : ""
              }`}
            >
              <div className="max-sm-md:flex-col flex w-full gap-[24px]">
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                  errorMessage={errors.fullName}
                  id="full_name"
                />
                <Input
                  label="Email address"
                  placeholder="Your email address"
                  inputType="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  errorMessage={errors.email}
                  id="email"
                />
              </div>

              <div className="max-sm-md:flex-col flex w-full gap-[24px]">
                <Input
                  inputType="tel"
                  label="Phone number"
                  placeholder="Your phone number"
                  required
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  errorMessage={errors.phone}
                  id="phone"
                />
                <Input
                  label="Country of Citizenship"
                  placeholder="Your citizenship"
                  required
                  value={formData.citizenship}
                  onChange={handleInputChange("citizenship")}
                  errorMessage={errors.fullName}
                  id="citizenship"
                />
              </div>

              <div className="max-sm-md:flex-col flex w-full gap-[24px]">
                <Input
                  label="Date of Birth"
                  placeholder="Your date of birth"
                  inputType="date"
                  required
                  value={formData.dob}
                  onChange={handleInputChange("dob")}
                  errorMessage={errors.dob}
                  id="dob"
                />
                <Input
                  label="Place of Birth"
                  placeholder="Your place of birth"
                  required
                  value={formData.placeOfBirth}
                  onChange={handleInputChange("placeOfBirth")}
                  errorMessage={errors.placeOfBirth}
                  id="placeOfBirth"
                />
              </div>

              <div className="max-sm-md:flex-col flex w-full gap-[24px]">
                <Input
                  label="Education Level"
                  placeholder="Choose your educational level"
                  required
                  inputType="dropdown"
                  imgSrc={DownArrow}
                  imgStyles={{
                    height: "16px",
                    width: "16px",
                  }}
                  inputOptions={[
                    "High School",
                    "Vocational / Technical School",
                    "Some College / Incomplete Higher Education",
                    "Bachelor’s Degree",
                    "Master’s Degree",
                    "Postgraduate / PhD",
                  ]}
                  value={formData.educationLevel}
                  onChange={handleInputChange("educationLevel")}
                  errorMessage={errors.educationLevel}
                />
              </div>

              <div className="flex flex-col w-full gap-[13px] ">
                {formData.languages.map((lang, i) => (
                  <Input
                    key={i}
                    label={i === 0 ? "Foreign Language Proficiency" : ""}
                    placeholder="Level"
                    imgSrc={DownArrow}
                    imgStyles={{
                      height: "16px",
                      width: "16px",
                    }}
                    doubleInputPlaceholder="Language"
                    inputType="dropdown"
                    inputOptions={[
                      "Beginner",
                      "Intermediate",
                      "Upper-Intermediate",
                      "Fluent",
                    ]}
                    value={lang.level}
                    onChange={(e) =>
                      handleLanguageChange(i, "level", e.target.value)
                    }
                    doubleInputValue={lang.name}
                    doubleInputOnChange={(e) =>
                      handleLanguageChange(i, "name", e.target.value)
                    }
                  />
                ))}

                <div className="max-sm-md:w-full  w-min flex justify-between items-center gap-[40px]">
                  <Button
                    text="Add Language"
                    imgSrc={Plus}
                    imgAlt='plus icon'
                    variant="black"
                    buttonType="button"
                    onButtonClick={addLanguage}
                    additionalStyle={{
                      height: "51px",
                      padding: "16px 18px",
                      fontWeight: "500",
                    }}
                  />
                  <img
                    onClick={removeLanguage}
                    src={X}
                    alt="close button"
                    className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer opacity-80 transition duration-200 rounded-full hover:opacity-100 hover:scale-110"
                  />
                </div>
              </div>

              <div className="max-sm-md:flex-col flex w-full gap-[24px]">
                <Input
                  label="When can you start if offered the position?"
                  placeholder="Enter when you can start if offered the position"
                  value={formData.startDate}
                  onChange={handleInputChange("startDate")}
                  errorMessage={errors.startDate}
                />
              </div>

              <div className="max-sm-md:flex-col flex w-full gap-[24px]">
                <Input
                  label="Your current employment status"
                  placeholder="Select your current employment status"
                  required
                  inputType="dropdown"
                  imgSrc={DownArrow}
                  imgStyles={{
                    height: "16px",
                    width: "16px",
                  }}
                  inputOptions={[
                    "Employed – Full-time",
                    "Employed – Part-time",
                    "Self-employed / Private practice",
                    "Unemployed / Not currently working",
                    "Student / In training",
                    "On maternity or parental leave",
                    "Retired",
                    "Other",
                  ]}
                  value={formData.employmentStatus}
                  onChange={handleInputChange("employmentStatus")}
                  errorMessage={errors.employmentStatus}
                  id="employmentStatus"
                />
              </div>

              <div className="max-sm-md:flex-col flex w-full gap-[24px]">
                <Input
                  label="Please upload your CV"
                  placeholder="Submit your CV"
                  required
                  inputType="file"
                  fileType=".pdf"
                  fileNote="No more than 20 mb. PDF"
                  value={formData.cv.name}
                  onChange={handleFileSubmit}
                  errorMessage={errors.cv}
                  id="cv"
                />
              </div>

              <Button
                text="Submit"
                variant="black"
                additionalStyle={{
                  width: "100%",
                  marginTop: "12px",
                }}
                onButtonClick={onFormSubmit}
              />
            </div>
            <div
              className={`flex flex-col items-center gap-[36px]  ${
                phase === 1 ? "hidden" : ""
              }`}
            >
              <div className="max-sm:h-min max-sm:gap-[64px] flex h-min items-center gap-[36px] flex-col">
                <div className="max-sm:text-[32px] max-sm:font-[600] font-mediator-serif-narrow-web text-[42px] font-[400] leading-[53px]">
                  Thank you!
                </div>
                <div className="max-sm:text-gray  text-[16px] leading-[150%] text-center">
                  By submitting this form, I consent to the collection and
                  processing of my personal data in accordance with the
                  organization's privacy policy
                </div>
              </div>
              <div className="max-sm:w-full max-sm:flex-col flex w-[327px] gap-[24px]">
                <Button text="Back" variant="white" onButtonClick={onBack} />
                <Button
                  text="Confirm"
                  variant="black2"
                  onButtonClick={onFormConfirm}
                />
              </div>
            </div>
            {toast.visible && (
              <div className="fixed top-[0] left-1/2 -translate-x-1/2 bg-red text-white p-[12px] pl-[24px] pr-[24px] rounded-[8px] font-[500] z-9999 ">
                {toast.message}
              </div>
            )}
          </form>
        </>
      </div>
    </div>
  );
}

export default JoinWaitingList;
