import "./Overview.scss";

type Props = {
  title?: string,
  salary?: string,
  category?: string
}

function Overview({ title, salary, category }: Props) {
  return (
    <section className="OverviewContainer" aria-labelledby="overview-title">
      <h2 id="overview-title" className="title">
        Описание позиции
      </h2>

      <dl className="descriptionContainer">
        {title && (
          <div className="detailContainer">
            <dt className="side side--left">Должность:</dt>
            <dd className="side side--right">{title}</dd>
          </div>
        )}

        {category && (
          <div className="detailContainer">
            <dt className="side side--left">Направление:</dt>
            <dd className="side side--right">{category}</dd>
          </div>
        )}

        {salary && (
          <div className="detailContainer">
            <dt className="side side--left">Зарплата:</dt>
            <dd className="side side--right">{salary} UZS</dd>
          </div>
        )}
      </dl>
    </section>
  );
}

export default Overview;
