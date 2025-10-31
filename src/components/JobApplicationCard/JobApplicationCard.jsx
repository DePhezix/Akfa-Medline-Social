import './JobApplicationCArd.scss'
import RightArrow from '/svgs/right-white-arrow.svg'
import Clock from '/svgs/clock.svg'
import {Link} from 'react-router'

function JobApplicationCard({title, numberOfApplicants, jobID, language}) {
  const linkPath = language === 'ru' ? `/Akfa-Medline-Social/jobs/${jobID}` : `/Akfa-Medline-Social/jobs/${jobID}/${language}`
    return (
      <Link
        to={linkPath}
        className="JobApplicationCardContainer"
      >
        <div className="JobApplicationCardContainer-title">{title}</div>
        <img src={Clock} alt="" className="JobApplicationCardContainer-time" />
        <div className="JobApplicationCardContainer-applicantNumber">
          Number of applicants {numberOfApplicants}
        </div>
        <div className="JobApplicationCardContainer-ArrowContainer">
          <div className="icon">
            <img src={RightArrow} alt="" className="arrow" />
          </div>
        </div>
      </Link>
    );
}

export default JobApplicationCard