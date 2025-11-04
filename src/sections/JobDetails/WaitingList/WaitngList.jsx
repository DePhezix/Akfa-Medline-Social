import "./WaitingList.scss";
import { useContext } from "react";
import Button from "../../../components/Button/Button";
import { PopUpContext } from "../../../contexts/PopupContext";
import { useNavigate, useParams } from "react-router-dom";
import RightArrow from '/svgs/right-white-arrow.svg'

function WaitingList({ className, setIsWaitingListOpen }) {
  const { setIsPopUpOpen } = useContext(PopUpContext);
  const { language } = useParams();
  const navigate = useNavigate();

  const currentLan = language || "ru";

  const handleWaitingButtonClick = () => {
    setIsWaitingListOpen(true);
    setIsPopUpOpen(true);
  };

  const handleReturnButtonClick = () => {
    if (currentLan === "ru") {
      navigate("/Akfa-Medline-Social#vacancies");
    } else {
      navigate(`/Akfa-Medline-Social/${currentLan}#vacancies`);
    }
  };

  return (
    <div
      className={`JobDetailsWaitingListContainer ${className ? className : ""}`}
    >
      <Button
        text="Submit an application"
        onButtonClick={handleWaitingButtonClick}
        variant="black"
        additionalStyle={{ padding: "12px 10px"}}
        fontSize='sm'
        imgSrc={RightArrow}
      />
      <Button
        text="Back to Job Listings"
        onButtonClick={handleReturnButtonClick}
        variant="transparent"
        additionalStyle={{ border: "1px solid #e5e7eb"}}
        fontSize='sm'
      />
    </div>
  );
}

export default WaitingList;
