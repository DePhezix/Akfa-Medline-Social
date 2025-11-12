import "./JobDetails.scss";
import { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingContext.js";
import axios from "axios";
import Hero from "../../sections/JobDetails/Hero/Hero.tsx";
import Overview from "../../sections/JobDetails/Overview/Overview.tsx";
import WaitingList from "../../sections/JobDetails/WaitingList/WaitngList.tsx";
import JobDetail from "../../sections/JobDetails/JobDetail/JobDetail.tsx";
import Loading from "../../sections/Global/Loading/Loading.tsx";
import JoinWaitingList from "../../sections/JobDetails/JoinWaitlingList/JoinWaitingList.tsx";


interface JobType {
  title: string;
  id: number;
  salary: string;
  category: string;
  onWaitingList: number;
  body: string;
  requirements: string;
  conditions: string;
}

function JobDetails() {
  const { jobid, language } = useParams();

  const [isWaitingListOpen, setIsWaitingListOpen] = useState(false);
  const [jobData, setJobData] = useState<JobType>();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const currentLan = language || "ru";

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setIsLoading(true);
        const startTime = Date.now();

        const res = await axios.get(
          `https://hr.centralasian.uz/api/social/vacancies/${jobid}`
        );
        setJobData(res.data);

        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 200 - elapsed);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
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
