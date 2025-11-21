
type Props = {
  text: string
}

function JobDetail({text}: Props) {
    return (
      <div
        className="w-[844px] rounded-[16px] text-[#374151] text-[16px] max-2xl:w-full [&_p]:leading-[1.75] [&_p]:mb-[16px] [&_p]:[&_strong]:text-[20px] [&_ul]:mt-[20px] [&_ul]:mb-[20px] [&_ul]:list-disc [&_ul]:pl-[30px] [&_strong]:font-[600] [&_strong]:text-[#111827]"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    );
}

export default JobDetail