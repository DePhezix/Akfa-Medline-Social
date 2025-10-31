import './WaitingList.scss'
import { useContext } from 'react';
import Button from '../../../components/Button/Button';
import { PopUpContext } from '../../../contexts/PopupContext';

function WaitingList ({applicantNumber, className, setIsWaitingListOpen}) {
    const { setIsPopUpOpen } = useContext(PopUpContext);

    const handleButtonClick = () => {
        setIsWaitingListOpen(true);
        setIsPopUpOpen(true)
    }
    
    return (
      <div className={`JobDetailsWaitingListContainer ${className ? className : ''}`}>
        <div className="candidates">Кандидатов: {applicantNumber}</div>
        <Button text="Присоединиться к резерву" onButtonClick={handleButtonClick} />
      </div>
    );
}

export default WaitingList