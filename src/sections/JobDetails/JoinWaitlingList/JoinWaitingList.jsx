import "./JoinWaitingList.scss";
import { useState, useContext } from "react";
import X from "/svgs/x.svg";
import Input from "../../../components/Input/Input";
import DownArrow from "/svgs/downArrow.svg";
import Button from "../../../components/Button/Button";
import Plus from "/svgs/plus.svg";
import { WaitingListContext } from "../../../Contexts/JoinWaitingListContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function JoinWaitingList() {
  const { jobid } = useParams();
  const [phase, setPhase] = useState(1);
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
    cv: "",
  });
  const { isOpen, setIsOpen } = useContext(WaitingListContext);
  const { setIsLoading } = useContext(LoadingContext);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
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

  const handleClose = () => {
    setIsOpen(false);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setPhase(2);
  };

  const onFormConfirm = () => {
    try {
      setIsLoading(true);
      const postData = async () => {
        const res = await axios.post(
          "https://hr.centralasian.uz/api/applicants/apply",
          {
            vacancyID: jobid,
            full_name: formData.fullName,
            email: formData.email,
            phone_number: formData.phone,
            country_of_citizenship: formData.citizenship,
            degree_and_field_of_study: formData.educationLevel,
            language: JSON.stringify(
              formData.languages.map((lang) => lang.name)
            ),
            total_years: "Unknown",
            when_you_start: formData.employmentStatus,
            resume: formData.cv,
          }
        );
      };
      postData()
    } catch (err) {
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const onBack = (e) => {
    e.preventDefault();
    setPhase(1);
  };

  const StopPropogate = (e) => {
    e.stopPropagation();
  }

  return (
    <div
      className={`WaitingListContainer 
      ${!isOpen ? "WaitingListContainer--hidden" : ""}`}
      style={phase === 2 ? { alignItems: "center" } : {}}
      onClick={handleClose}
    >
      <div
        className={`WaitingList ${phase === 2 ? "WaitingList--phase2" : ""}`}
        style={phase === 2 ? { marginTop: "0" } : {}}
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

        {phase === 1 ? (
          <>
            <div className="WaitingList-details">
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

            <form className="WaitingList-form" onSubmit={onFormSubmit}>
              <div className="input-container">
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                />
                <Input
                  label="Email address"
                  placeholder="Your email address"
                  inputType="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange("email")}
                />
              </div>

              <div className="input-container">
                <Input
                  inputType="number"
                  label="Phone number"
                  placeholder="Your phone number"
                  required
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                />
                <Input
                  label="Country of Citizenship"
                  placeholder="Your citizenship"
                  required
                  value={formData.citizenship}
                  onChange={handleInputChange("citizenship")}
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
                />
                <Input
                  label="Place of Birth"
                  placeholder="Your place of birth"
                  required
                  value={formData.placeOfBirth}
                  onChange={handleInputChange("placeOfBirth")}
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
                />
              </div>

              <div className="input-container2">
                {formData.languages.map((lang, i) => (
                  <Input
                    key={i}
                    label={i === 0 ? "Foreign Language Proficiency" : ""}
                    placeholder="Level"
                    required
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

                <div onClick={addLanguage} className="languageButtonContainer">
                  <Button
                    text="Add Language"
                    imgSrc={Plus}
                    variant="black"
                    buttonType="button"
                    additionalStyle={{
                      height: "51px",
                      padding: "16px 18px",
                      fontWeight: "500",
                    }}
                  />
                </div>
              </div>

              <div className="input-container">
                <Input
                  label="When can you start if offered the position?"
                  placeholder="Enter when you can start if offered the position"
                  required
                  value={formData.startDate}
                  onChange={handleInputChange("startDate")}
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
                />
              </div>

              <div className="input-container">
                <Input
                  label="Please upload your CV"
                  placeholder="Submit your CV"
                  required
                  inputType="file"
                  fileNote="No more than 20 mb. PDF, DOC, DOCX"
                  value={formData.cv}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cv: e.target.value,
                    }))
                  }
                />
              </div>

              <Button
                text="Submit"
                variant="black"
                additionalStyle={{
                  width: "100%",
                  marginTop: "12px",
                }}
                buttonType="submit"
              />
            </form>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default JoinWaitingList;
