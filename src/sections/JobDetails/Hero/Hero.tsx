import VacanciesImg from "/images/vacancies.avif";
import ClockSVG from '/svgs/clock.svg'

type Props = {
  imgSrc?: string,
  Heading: string,
  SubHeading: string,
  CandidatesNumber: number,
  Salary: string
}

function Hero({ imgSrc = VacanciesImg, Heading, SubHeading, CandidatesNumber, Salary }: Props) {
  return (
    <main className=" w-full h-[484px] rounded-[16px] overflow-hidden relative max-2xl:w-screen max-md:h-[540px] content-[''] max-md:after:absolute max-md:after:inset-shadow-heavy max-md:after:w-full max-md:after:h-full max-md:after:top-[0] pointer-events-none">
      <div
        className=" h-full bg-no-repeat bg-cover bg-center ml-[15px] mr-[15px] max-md:flex max-md:flex-col max-md:justify-end max-md:p-[24px] max-md:pl-[16px] max-md:pr-[16px] max-md:m-[0]"
        style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : {}}
      >
        <div className=" flex flex-col gap-[40px] z-20 text-[#F1F1F2] absolute bottom-[2.5rem] p-[30px] pt-[12px] ml-[15px] mr-[15px] max-md:static max-md:p-[0] max-md:pb-[30px]">
          <div className=" flex flex-col gap-[16px] max-md:w-full">
            <h3 className=" text-[20px] leading-[24px] opacity-90 w-[495px]">
              {SubHeading}
            </h3>
            <h1 className=" font-[400] text-[60px] tracking-[-1px] max-md:w-full max-md:whitespace-normal max-md:text-[36px]">
              {Heading}
            </h1>
            <h3 className="-2 text-[36px] font-[500] max-md:text-[24px]">
              {Salary} UZS/year
            </h3>
            <div className=" bg-red w-[303px] h-[2.5rem] flex items-center justify-center rounded-full gap-[.625rem] text-[14px]">
              <img
                src={ClockSVG}
                alt=""
                className="brightness-0 invert-100 brightness-100"
              />
              <p>
                Candidates on the waiting list: <span>{CandidatesNumber}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
