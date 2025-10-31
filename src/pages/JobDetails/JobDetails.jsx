import "./JobDetails.scss";
import { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingContext";
import axios from "axios";
import Hero from "../../sections/JobDetails/Hero/Hero";
import Overview from "../../sections/JobDetails/Overview/Overview";
import WaitingList from "../../sections/JobDetails/WaitingList/WaitngList";
import JobDetail from "../../sections/JobDetails/JobDetail/JobDetail";
import Loading from "../../sections/Global/Loading/Loading";
import JoinWaitingList from "../../sections/JobDetails/JoinWaitlingList/JoinWaitingList";

function JobDetails() {
  const { jobid, language } = useParams();
  const { pathname } = useLocation();

  const [isWaitingListOpen, setIsWaitingListOpen] = useState(false);
  const [jobData, setJobData] = useState({});
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [currentLan, setCurrentLan] = useState(language || "ru");

  useEffect(() => {
    setCurrentLan(language || "ru");
  }, [language]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {isLoading ? (
        <div className="LoadingJobDetailsWrapper">
          <Loading />
          <p className="LoadingJobDetailsSubtitle">
            {currentLan === "ru"
              ? "Загрузка вакансий..."
              : "Loading vacancies..."}
          </p>
        </div>
      ) : (
        <section className="JobDetailsWrapper">
          <div className="JobDetailsContent">
            <Hero Heading={jobData?.category?.split("(")[0].trim()} />
            <div className="detailsContainer">
              <div className="left">
                <Overview
                  title={jobData?.title}
                  salary={jobData?.salary}
                  category={jobData?.category?.split("(")[0].trim()}
                />
                <WaitingList
                  applicantNumber={jobData?.onWaitingList}
                  className="WaitingList--mobile"
                />
                {jobData?.body && <JobDetail text={jobData.body} />}
                {jobData?.requirements && (
                  <JobDetail text={jobData.requirements} />
                )}
                {jobData?.conditions && <JobDetail text={jobData.conditions} />}
              </div>
              <div className="right">
                <WaitingList
                  applicantNumber={jobData?.onWaitingList}
                  setIsWaitingListOpen={setIsWaitingListOpen}
                />
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
