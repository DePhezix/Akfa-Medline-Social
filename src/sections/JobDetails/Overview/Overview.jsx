import "./Overview.scss";

function Overview({ title, salary, category }) {
  return (
    <div className="OverviewContainer">
      <div className="title">Описание позиции</div>
      <div className="descriptionContainer">
        {title && (
          <div className="detailContainer">
            <div className="side side--left">Должность: </div>
            <div className="sidse side--right">{title}</div>
          </div>
        )}
        {category && (
          <div className="detailContainer">
            <div className="side side--left">Направление: </div>
            <div className="sidse side--right">{category}</div>
          </div>
        )}
        {salary && (
          <div className="detailContainer">
            <div className="side side--left">Зарплата: </div>
            <div className="sidse side--right">{salary} UZS</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;
