
type Props = {
    imgSrc: string,
    title: string,
    details: string,
    imgAlt?: string,
}

function Card({imgSrc, title, details, imgAlt}: Props) {
    return (
      <div className="flex flex-col rounded-[16px] p-[20px] gap-[24px] bg-[#f3f4f4] flex-1 min-w-[340px] max-md:gap-[10px] max-sm:min-w-full">
        <img src={imgSrc} className="w-[50px] h-[50px]" alt={imgAlt} />
        <div className="flex flex-col gap-[9px] max-md:gap-[10px]">
          <h3 className="font-[600] text-[24px] tracking-[-0.56px] flex items-center h-[29px max-md:font-[400]">{title}</h3>
          <p className="text-[15px] leading-[22.5px]">{details}</p>
        </div>
      </div>
    );
}

export default Card