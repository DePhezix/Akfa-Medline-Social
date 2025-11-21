
type Props = {
  title: string;
  details: string;
  imgSrc: string;
  inverse?: boolean;
};

function ClinicAdvantage({ title, details, imgSrc, inverse }: Props) {
  return (
    <div
      className={`flex w-[1280px] justify-between items-center flex-1 ${
        inverse ? "flex-row-reverse" : ""
      } max-2xl:flex-col-reverse max-2xl:w-[308px] max-2xl:min-w-[308px] max-2xl:gap-[16px] max-2xl:bg-[#fafafa] max-2xl:pb-[16px] max-2xl:justify-start max-2xl:rounded-[10px]`}
    >
      <div className="flex flex-col w-[537px] gap-[16px] h-min max-2xl:gap-[16px] max-2xl:w-full max-2xl:p-[0] max-2xl:pl-[25px] max-2xl:pr-[25px] max-2xl:h-full max-2xl:justify-between">
        <h4 className="font-[600] text-[32px] tracking-[-1px] align-middle text-[#1e1e1e] max-2xl:font-[700] max-2xl:text-[24px] max-2xl:leading-[32px] max-2xl:w-full">
          {title}
        </h4>
        <p className="w-[537px] h-[90px] text-[20px] leading-[150%] tracking-[-1px] align-middle text-[#666666] max-2xl:font-[400] max-2xl:text-[16px] max-2xl:leading-[24px] max-2xl:w-full max-2xl:h-[50%]">
          {details}
        </p>
      </div>
      <div className="w-[628px] h-[350px] rounded-[8px] overflow-hidden flex items-center justify-center max-2xl:w-full max-2xl:h-[164px] max-2xl:min-h-[164px]">
        <img className="w-full h-full object-cover" src={imgSrc} />
      </div>
    </div>
  );
}

export default ClinicAdvantage;
