import './WaitingList.scss'
import { useContext } from 'react';
import Button from '../../../components/Button/Button';
import { WaitingListContext } from '../../../contexts/JoinWaitingListContext';

function WaitingList ({applicantNumber, className}) {
    const { setIsOpen } = useContext(WaitingListContext);

    const handleButtonClick = () => {
        setIsOpen(true);
    }
    
    return (
      <div className={`JobDetailsWaitingListContainer ${className ? className : ''}`}>
        <div className="candidates">Кандидатов: {applicantNumber}</div>
        <Button text="Присоединиться к резерву" onButtonClick={handleButtonClick} />
      </div>
    );
}

export default WaitingList