import "./JoinWaitingList.scss";
import { useState, useContext } from "react";
import X from "/svgs/x.svg";
import Input from "../../../components/Input/Input";
import DownArrow from "/svgs/downArrow.svg";
import Button from "../../../components/Button/Button";
import Plus from "/svgs/plus.svg";
import { PopUpContext } from "../../../contexts/PopupContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function JoinWaitingList({ isOpen, setIsOpen }) {
  const { jobid } = useParams();
  const [phase, setPhase] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
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
  const { setIsPopUpOpen } = useContext(PopUpContext);
  const { setIsLoading } = useContext(LoadingContext);

  const handleInputChange = (field) => (e) => {
    setErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

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
      const parts = formData.dob.split("/");

      const [day, month, year] = parts.map(Number);

      if (
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year) ||
        day < 1 ||
        month < 1 ||
        month > 12 ||
        year < 1900
      ) {
        newErrors.dob = "Invalid date format (dd/mm/yyyy)";
      } else {
        const dob = new Date(year, month - 1, day);
        const today = new Date();

        if (
          dob.getFullYear() !== year ||
          dob.getMonth() + 1 !== month ||
          dob.getDate() !== day
        ) {
          newErrors.dob = "Invalid calendar date";
        } else if (dob > today || year < 1900) {
          newErrors.dob = "Check Date of birth";
        }
      }
    }

    if (!formData.placeOfBirth.trim())
      newErrors.placeOfBirth = "Place of birth is required";

    if (!formData.educationLevel.trim())
      newErrors.educationLevel = "Education level is required";

    if (!formData.employmentStatus.trim())
      newErrors.employmentStatus = "Employment status is required";

    if (!formData.cv) newErrors.cv = "Resume is required";

    return newErrors;
  };

  const handleLanguageChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.languages];
      updated[index][field] = value;
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
    console.log("removing");
    if (formData.languages.length > 1) {
      console.log("initiaiting");
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

  const onFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setPhase(2);
    }
  };

  const onFormConfirm = async () => {
    setIsLoading(true);
    try {
      const convertFileToBinary = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Data = reader.result.split(",")[1];
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const formDataToSend = new FormData();

      formDataToSend.append("vacancyId", Number(jobid));
      formDataToSend.append("full_name", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone_number", formData.phone);
      formDataToSend.append("country_of_citizenship", formData.citizenship);
      formDataToSend.append(
        "degree_and_field_of_study",
        formData.educationLevel
      );
      formDataToSend.append(
        "language",
        formData.languages.map((l) => l.name).join(", ")
      );
      formDataToSend.append("total_years", "Unknown");
      formDataToSend.append("when_you_start", formData.employmentStatus);
      formDataToSend.append("relocate", true);
      formDataToSend.append("job_recent_title", "LinkedIn");
      formDataToSend.append("interested_joint_university", "string");

      const resumeData = await convertFileToBinary(formData.cv.file)
      formDataToSend.append("resume", resumeData)

      await axios.post(
        "https://hr.centralasian.uz/api/applicants/apply",
        formDataToSend,
      );


      // console.log(" Submitted successfully");
    } catch (err) {
      console.error(" Submission failed:", err);
    } finally {
      setIsLoading(false);
      setIsPopUpOpen(false);
      // setIsOpen(false);
      // setPhase(1);
      // resetForm();
    }
  };

  const onBack = (e) => {
    e.preventDefault();
    setPhase(1);
  };

  const StopPropogate = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`WaitingListContainer 
      ${!isOpen ? "WaitingListContainer--hidden" : ""}`}
      style={phase === 2 ? { alignItems: "center" } : {}}
      onClick={handleClose}
    >
      <div
        className={`WaitingList ${phase === 2 ? "WaitingList--phase2" : ""}`}
        onClick={StopPropogate}
      >
        <div className="WaitingList-headerAndCloseContainer">
          {phase === 1 && (
            <div className="WaitingList-headerContainer">
              <div className="header">Join the Waiting List</div>
            </div>
          )}
          <img
            onClick={handleClose}
            src={X}
            alt="close button"
            className="close-button"
          />
        </div>

        <>
          <div
            className={`WaitingList-details ${
              phase === 2 ? "WaitingList-details--hidden" : ""
            }`}
          >
            <div className="WaitingList-invitation">
              Would you like to join us?
            </div>
            <div className="WaitlingList-building">
              We are building a waiting list of candidates for a new, modern
              clinic that will soon open its doors. If you're interested in
              working with us, simply fill out this short form — we’ll contact
              you as soon as the active recruitment phase begins.
            </div>
            <div className="WaitilingList-ultimatum">
              Be the first one we invite for an interview!
            </div>
          </div>

          <form className="WaitingList-form">
            <div
              className={`FormWrapper FormWrapper--phase1 ${
                phase === 2 ? "FormWrapper--phase1--hidden" : ""
              }`}
            >
              <div className="input-container">
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                  errorMessage={errors.fullName}
                />
                <Input
                  label="Email address"
                  placeholder="Your email address"
                  inputType="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  errorMessage={errors.email}
                />
              </div>

              <div className="input-container">
                <Input
                  inputType="tel"
                  label="Phone number"
                  placeholder="Your phone number"
                  required
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  errorMessage={errors.phone}
                />
                <Input
                  label="Country of Citizenship"
                  placeholder="Your citizenship"
                  required
                  value={formData.citizenship}
                  onChange={handleInputChange("citizenship")}
                  errorMessage={errors.fullName}
                />
              </div>

              <div className="input-container">
                <Input
                  label="Date of Birth"
                  placeholder="Your date of birth"
                  inputType="date"
                  required
                  value={formData.dob}
                  onChange={handleInputChange("dob")}
                  errorMessage={errors.dob}
                />
                <Input
                  label="Place of Birth"
                  placeholder="Your place of birth"
                  required
                  value={formData.placeOfBirth}
                  onChange={handleInputChange("placeOfBirth")}
                  errorMessage={errors.placeOfBirth}
                />
              </div>

              <div className="input-container">
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

              <div className="input-container2">
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

                <div className="languageButtonContainer">
                  <Button
                    text="Add Language"
                    imgSrc={Plus}
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
                    className="language-remove-button"
                  />
                </div>
              </div>

              <div className="input-container">
                <Input
                  label="When can you start if offered the position?"
                  placeholder="Enter when you can start if offered the position"
                  value={formData.startDate}
                  onChange={handleInputChange("startDate")}
                  errorMessage={errors.startDate}
                />
              </div>

              <div className="input-container">
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
                />
              </div>

              <div className="input-container">
                <Input
                  label="Please upload your CV"
                  placeholder="Submit your CV"
                  required
                  inputType="file"
                  fileType=".pdf"
                  fileNote="No more than 20 mb. PDF"
                  value={formData.cv.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cv: { file: e.target.file, name: e.target.value },
                    }))
                  }
                  errorMessage={errors.cv}
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
              className={`FormWrapper FormWrapper--phase2  ${
                phase === 1 ? "FormWrapper--phase2--hidden" : ""
              }`}
            >
              <div className="textContainer">
                <div className="thanks">Thank you!</div>
                <div className="consent">
                  By submitting this form, I consent to the collection and
                  processing of my personal data in accordance with the
                  organization's privacy policy
                </div>
              </div>
              <div className="buttonsContainer">
                <Button text="Back" variant="white" onButtonClick={onBack} />
                <Button
                  text="Confirm"
                  variant="black2"
                  onButtonClick={onFormConfirm}
                />
              </div>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default JoinWaitingList;
