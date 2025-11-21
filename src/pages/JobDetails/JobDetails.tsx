import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "../../sections/JobDetails/Hero/Hero.js";
import Overview from "../../sections/JobDetails/Overview/Overview.js";
import WaitingList from "../../sections/JobDetails/WaitingList/WaitngList.js";
import JobDetail from "../../sections/JobDetails/JobDetail/JobDetail.js";
import Loading from "../../sections/Global/Loading/Loading.js";
import JoinWaitingList from "../../sections/JobDetails/JoinWaitlingList/JoinWaitingList.js";
import { useBoundStore } from '../../store/Store.js'


function JobDetails() {
  const { jobid, language } = useParams();

  const [isWaitingListOpen, setIsWaitingListOpen] = useState(false);
  const isLoading = useBoundStore(state => state.loading)
  const currentLan = language || "ru";
  const fetchJobVacancy = useBoundStore(state => state.fetchAndSetJobVacancy)
  const jobData = useBoundStore(state => state.jobVacancy)

  useEffect(() => {
    fetchJobVacancy(Number(jobid))
  }, [jobid]);

  return (
    <>
      {isLoading ? (
        <div className="h-[300px] flex flex-col items-center justify-center text-red text-[20px] font-[600] gap-[20px] mt-[40px]">
          <Loading />
          <p>{currentLan === "ru" ? "Загрузка..." : "Loading..."}</p>
        </div>
      ) : (
        <section className="w-full flex flex-col gap-[40px] items-center bg-[#f3f4f4] pb-[50px] max-2xl:w-screen">
          <div className="flex flex-col gap-[40px] items-center bg-[#f3f4f4] w-full">
            <Hero
              SubHeading={(jobData?.category?.split("(")[0] ?? "").trim()}
              Heading={(jobData?.title?.split("(")[0] ?? "").trim()}
              CandidatesNumber={jobData?.onWaitingList}
              Salary={jobData?.salary}
            />
            <div className="flex gap-[24px] w-[1280px] justify-between max-2xl:w-full max-md:flex-col max-2xl:pr-[30px] max-2xl:pl-[30px]">
              <div className="flex flex-col max-2xl:w-full">
                <Overview
                  title={jobData?.title}
                  salary={jobData?.salary}
                  category={(jobData?.category?.split("(")[0] ?? "").trim()}
                />
                {jobData?.body && <JobDetail text={jobData.body} />}
                {jobData?.requirements && (
                  <JobDetail text={jobData.requirements} />
                )}
                {jobData?.conditions && <JobDetail text={jobData.conditions} />}
              </div>
              <div className="w-[200px] max-2xl:w-[230px] max-md:w-full">
                <WaitingList setIsWaitingListOpen={setIsWaitingListOpen} />
              </div>
            </div>
          </div>

          <JoinWaitingList
            isOpen={isWaitingListOpen}
            setIsOpen={setIsWaitingListOpen}
          />
        </section>
      )}
    </>
  );
}

export default JobDetails;
