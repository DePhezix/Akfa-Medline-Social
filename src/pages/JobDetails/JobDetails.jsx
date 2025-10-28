import "./JobDetails.scss";
import { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingContext";
import axios from "axios";
import Hero from "../../sections/JobDetails/Hero/Hero";
import Overview from "../../sections/JobDetails/Overview/Overview";
import WaitingList from "../../sections/JobDetails/WaitingList/WaitngList";
import JobDetail from "../../sections/JobDetails/JobDetail/JobDetail";
import JoinWaitingList from "../../sections/JobDetails/JoinWaitlingList/JoinWaitingList";

function JobDetails() {
  const { jobid } = useParams();
  const { pathname } = useLocation();

  const [jobData, setJobData] = useState({});
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://hr.centralasian.uz/api/social/vacancies/${jobid}`
        );

        setJobData(res.data);
      } catch (err) {
        console.log(err);
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
      <div className="JobDetailsContainer">
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
            {jobData?.requirements && <JobDetail text={jobData.requirements} />}
            {jobData?.conditions && <JobDetail text={jobData.conditions} />}
          </div>
          <div className="right">
            <WaitingList applicantNumber={jobData?.onWaitingList} />
          </div>
        </div>
      </div>
      <JoinWaitingList />
    </>
  );
}

export default JobDetails;
