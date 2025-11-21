import RightArrow from '/svgs/right-white-arrow.svg'
import Clock from '/svgs/clock.svg'
import {Link} from 'react-router'

type Props = {
  title: string,
  numberOfApplicants: number,
  jobID: number,
  language: string
}

function JobApplicationCard({title, numberOfApplicants, jobID, language}: Props) {
  const linkPath = language === 'ru' ? `/Akfa-Medline-Social/jobs/${jobID}` : `/Akfa-Medline-Social/${language}/jobs/${jobID}`
    return (
      <Link
        to={linkPath}
        className="group w-[604px] h-[102.98px] rounded-[5px] bg-[#FAFAFA] relative overflow-hidden transition duration-300 ease-linear content-[''] after:absolute after:bottom-[0] after:left-[0] after:h-px after:w-[0] after:bg-red after:transition-[width] after:duration-300 after:ease-linear hover:after:w-full max-2xl:min-w-[350px] max-2xl:flex-1 max-sm:min-w-[280px]"
      >
        <div className="font-[500] text-[18px] leading-[25.2px] tracking-[-0.5px] text-black absolute top-[14.5px] left-[15px] max-2xl:pr-[50px]">
          {title}
        </div>
        <img
          src={Clock}
          alt=""
          className="absolute top-[41.57px] left-[15px] w-[18px] h-[21px] max-2xl:top-[70px]"
        />
        <div className="text-[14px] leading-[23.8px] text-red absolute top-[40.08px] left-[38px] max-2xl:top-[70px]">
          Number of applicants {numberOfApplicants}
        </div>
        <div className="absolute top-[19.48px] right-[15px] rounded-[5px]">
          <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-solid border-[#E3E5E5] cursor-pointer transition-transform duration-300 ease-linear">
            <img
              src={RightArrow}
              alt=""
              className="group-hover:-rotate-45 w-[20px] h-[20px] transition-transform duration-300 ease-linear brightness-0 grayscale-100"
            />
          </div>
        </div>
      </Link>
    );
}

export default JobApplicationCard