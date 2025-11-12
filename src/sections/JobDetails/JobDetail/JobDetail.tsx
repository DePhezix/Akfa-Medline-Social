import './JobDetail.scss'

type Props = {
  text: string
}

function JobDetail({text}: Props) {
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