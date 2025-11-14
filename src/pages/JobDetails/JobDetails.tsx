import "./JobDetails.scss";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Hero from "../../sections/JobDetails/Hero/Hero.js";
import Overview from "../../sections/JobDetails/Overview/Overview.js";
import WaitingList from "../../sections/JobDetails/WaitingList/WaitngList.js";
import JobDetail from "../../sections/JobDetails/JobDetail/JobDetail.js";
import Loading from "../../sections/Global/Loading/Loading.js";
import JoinWaitingList from "../../sections/JobDetails/JoinWaitlingList/JoinWaitingList.js";
import {useBoundStore} from '../../store/Store.js'


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
        <div className="LoadingJobDetailsWrapper">
          <Loading />
          <p className="LoadingJobDetailsSubtitle">
            {currentLan === "ru" ? "Загрузка..." : "Loading..."}
          </p>
        </div>
      ) : (
        <section className="JobDetailsWrapper">
          <div className="JobDetailsContent">
            <Hero
              SubHeading={(jobData?.category?.split("(")[0] ?? "").trim()}
              Heading={(jobData?.title?.split("(")[0] ?? "").trim()}
              CandidatesNumber={jobData?.onWaitingList}
              Salary={jobData?.salary}
            />
            <div className="detailsContainer">
              <div className="left">
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
              <div className="right">
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
