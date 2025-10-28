import './JobDetail.scss'

function JobDetail({text}) {
    return (
      <div
        className="JobDetailContainer"
        dangerouslySetInnerHTML={{
          __html: text
        }}
      />
    );
}

export default JobDetail