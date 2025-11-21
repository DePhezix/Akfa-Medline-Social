
type Props = {
  title?: string,
  salary?: string,
  category?: string
}

function Overview({ title, salary, category }: Props) {
  return (
    <section className="max-2xl:w-full flex flex-col w-[844px] rounded-[16px] p-[16px] pl-[0] gap-[24px] text-black mb-[40px]" aria-labelledby="overview-title">
      <h2 id="overview-title" className="w-full font-[600] text-[32px] leading-[32px]">
        Описание позиции
      </h2>

      <dl className="max-2xl:w-full flex flex-col w-[368px] gap-[24px]">
        {title && (
          <div className="max-sm:flex-col max-sm:gap-[8px] flex gap-[22px] w-full text-[16px] leading-[24px]">
            <dt className="basis-1/2 max-w-1/2">Должность:</dt>
            <dd className="basis-1/2 max-w-1/2 font-[500]">{title}</dd>
          </div>
        )}

        {category && (
          <div className="max-sm:flex-col max-sm:gap-[8px] flex gap-[22px] w-full text-[16px] leading-[24px]">
            <dt className="basis-1/2 max-w-1/2">Направление:</dt>
            <dd className="basis-1/2 max-w-1/2 font-[500]">{category}</dd>
          </div>
        )}

        {salary && (
          <div className="max-sm:flex-col max-sm:gap-[8px] flex gap-[22px] w-full text-[16px] leading-[24px]">
            <dt className="basis-1/2 max-w-1/2">Зарплата:</dt>
            <dd className="basis-1/2 max-w-1/2 font-[500]">{salary} UZS</dd>
          </div>
        )}
      </dl>
    </section>
  );
}

export default Overview;
