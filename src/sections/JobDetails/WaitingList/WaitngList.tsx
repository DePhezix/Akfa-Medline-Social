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
      className={`flex flex-col rounded-[16px] gap-[.75rem] w-full ${className ? className : ""}`}
    >
      <Button
        text="Submit an application"
        onButtonClick={handleWaitingButtonClick}
        variant="black"
        className="p-[12px] pl-[10px] pr-[10px] rounded-none"
        fontSize='sm'
        imgSrc={RightArrow}
        imgAlt='right arrow'
      />
      <Button
        text="Back to Job Listings"
        onButtonClick={handleReturnButtonClick}
        className='rounded-none'
        variant="transparent"
        fontSize='sm'
      />
    </div>
  );
}

export default WaitingList;
