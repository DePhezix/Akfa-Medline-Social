import "./WaitingList.scss";
import { Dispatch, SetStateAction } from "react";
import Button from "../../../components/Button/Button.js";
import { useNavigate, useParams } from "react-router-dom";
import RightArrow from '/svgs/right-white-arrow.svg'
import { useBoundStore } from "../../../store/Store.js";

type Props = {
  className?: string,
  setIsWaitingListOpen: Dispatch<SetStateAction<boolean>>
}

function WaitingList({ className, setIsWaitingListOpen }: Props) {
  const setIsPopUpOpen = useBoundStore(state => state.setPopUp)
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
