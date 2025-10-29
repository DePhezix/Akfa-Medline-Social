import "./FieldSearch.scss";
import { useState, useEffect, useContext } from "react";
import JobApplicationCard from "../../../components/JobApplicationCard/JobApplicationCard";
import Notice from "../../../assets/svgs/notice.svg";
import axios from "axios";
import { LoadingContext } from "../../../contexts/LoadingContext";
import Pagination from "../../../components/Pagination/Pagination";

function FieldSearch() {
  const { setIsLoading } = useContext(LoadingContext);

  const fieldKey = {
    "Врачи / Специалисты (Physicians & Specialists)": 5121,
    "Медицинский и сестринский персонал (Nursing & Clinical Staff)": 5119,
    "Менеджмент и управленческий персонал (Leadership & Management)": 5120,
    "Лабораторные службы (Diagnostics)": 5122,
  };

  const [selectedKey, setSelectedKey] = useState(
    "Врачи / Специалисты (Physicians & Specialists)"
  );

  const staticFields = {
    "Врачи / Специалисты (Physicians & Specialists)": {
      name: "Врачи / Специалисты",
      invitation:
        "Мы приглашаем молодых и целеустремлённых врачей присоединиться к команде новой современной клиники.",
      benefits: [
        "Если вы только завершаете ординатуру или недавно начали свою медицинскую практику — мы рады видеть вас в числе кандидатов. Наша клиника предлагает уникальную возможность профессионального роста под руководством опытных наставников и клинических кураторов. Вы будете участвовать в оказании амбулаторной и стационарной помощи, работать в мультидисциплинарной команде и развивать клинические навыки в реальных условиях современной медицины.",
      ],
      values: {
        header: "Что мы ценим",
        details:
          "Желание учиться и расти как врач <br />Ординатура или магистратура по соответствующей специальности* <br/> При стаже более 10 лет — наличие квалификационной категории. <br /> Действующая лицензия и опыт клинической работы <br /> Стремление к развитию и внедрению клинических стандартов",
      },
      workingConditions: {
        header: "Условия работы:",
        details:
          "<span class='highlight'>График:</span> с 08:00 до 17:00, 6/7 <br />" +
          "<span class='highlight'>Заработная плата:</span> от 180 000 000 сум/год <br />" +
          "<span class='highlight'>Социальный пакет:</span> бесплатный обед в корпоративной столовой" +
          "<span class='highlight>Профессиональное развитие:</span> ежегодное обучение и тренинги за счёт клиники" +
          "<span class='highlight>Дополнительно</span> наставничество, современная инфраструктура и поддержка развития персонала",
      },
      explanation:
        "Высшее медицинское образование: бакалавриат по специальности Врач общей практики, послевузовское профессиональное образование может быть преимуществом.",
    },
    "Медицинский и сестринский персонал (Nursing & Clinical Staff)": {
      name: "Медицинский и сестринский",
      invitation:
        "Мы приглашаем выпускников медицинских колледжей и начинающих специалистов, которые хотят построить карьеру в современной клинике.",
      benefits: [
        "Наша команда обеспечит вам поддержку, обучение на рабочем месте и наставничество со стороны опытных сотрудников. Мы ценим ответственность, заботу о пациенте и стремление к постоянному развитию.",
        "В структуру входят медицинские сёстры отделений, ассистенты и другие клинические специалисты. Работа предполагает участие в ежедневном уходе за пациентами, клинических процедурах и командной коммуникации.",
      ],
      values: {
        header: "Что мы ценим",
        details:
          "Стремление стать профессионалом в своём деле <br />" +
          "Аккуратность, внимательность и уважение к пациенту <br />" +
          "Готовность обучаться у наставников и развиваться вместе с клиникой",
      },
      requirements: {
        header: "Обязательные требования",
        details:
          "Среднее специальное медицинское образование <br />" +
          "Сертификат о повышении квалификации (сроком давности не менее 5 лет) <br />" +
          "Опыт приветствуется, но не обязателен",
      },
      workingConditions: {
        header: "Условия работы:",
        details:
          "<span class='highlight'>График:</span> с 08:00 до 17:00, 6/7 <br />" +
          "<span class='highlight'>Заработная плата:</span> от 53 000 000 сум/год <br />" +
          "<span class='highlight'>Социальный пакет:</span> бесплатный обед в корпоративной столовой <br />" +
          "<span class='highlight'>Профессиональное развитие:</span> ежегодное обучение и тренинги за счёт клиники <br />" +
          "<span class='highlight'>Дополнительно:</span> наставничество, современная инфраструктура и поддержка развития персонала",
      },
    },
    "Менеджмент и управленческий персонал (Leadership & Management)": {
      name: "Менеджмент и управленческий",
      invitation:
        "Мы строим систему управления клиникой с нуля — и открыты к кандидатам, готовым учиться, расти и брать на себя ответственность. .",
      benefits: [
        "Если вы — начинающий управленец, стремящийся развиваться в области медицинского менеджмента — у нас вы получите поддержку опытных руководителей, доступ к системному обучению и возможность участвовать в создании процессов с «чистого листа»",
        "Открыты роли заведующих отделений, старших медсестер и других управленческих позиций.",
      ],
      values: {
        header: "Что мы ценим",
        details:
          "Инициативу, системное мышление и организованность <br />" +
          "Готовность брать ответственность и обучаться в процессе <br />" +
          "Уважение к командной работе и клиентоориентированность",
      },
      requirements: {
        header: "Обязательные требования",
        details:
          "Высшее медицинское образование по соответствующей специальности <br />" +
          "Послевузовское профессиональное образование: ординатура или магистратура <br />" +
          "При стаже более 10 лет — наличие квалификационной категории обязательно <br />" +
          "Опыт работы не обязателен, но желание развиваться — обязательно",
      },
      workingConditions: {
        header: "Условия работы:",
        details:
          "<span class='highlight'>График:</span> с 08:00 до 17:00, 6/7 <br />" +
          "<span class='highlight'>Заработная плата:</span> от 351 000 000 сум/год <br />" +
          "<span class='highlight'>Социальный пакет:</span> бесплатный обед в корпоративной столовой <br />" +
          "<span class='highlight'>Профессиональное развитие:</span> ежегодное обучение и тренинги за счёт клиники <br />" +
          "<span class='highlight'>Дополнительно:</span> наставничество, современная инфраструктура и поддержка развития персонала",
      },
    },
    "Лабораторные службы (Diagnostics)": {
      name: "Лабораторные службы",
      invitation:
        "Если вы выпускник или начинающий специалист, мечтающий работать в современной лаборатории — мы ждём вас! ",
      benefits: [
        "Наша лаборатория будет оснащена передовым оборудованием и работать по международным стандартам. Мы предлагаем обучение, поддержку наставников и возможность стать частью команды с нуля.",
        "Приглашаем лаборантов, специалистов по биомедицинским исследованиям, ПЦР- и ИФА-специалистов, а также младших техников.",
      ],
      values: {
        header: "Что мы ценим",
        details:
          "Внимание к деталям и ответственность <br />" +
          "Интерес к лабораторной диагностике и готовность обучаться <br />" +
          "Чистоплотность, соблюдение стандартов качества и дисциплины",
      },
      requirements: {
        header: "Обязательные требования",
        details:
          "Среднее специальное или высшее образование (медицинское, биологическое, химическое) <br />" +
          "Готовность пройти обучение на рабочем месте <br />" +
          "Опыт не обязателен",
      },
      workingConditions: {
        header: "Условия работы:",
        details:
          "<span class='highlight'>График:</span> с 08:00 до 17:00, 6/7 <br />" +
          "<span class='highlight'>Заработная плата:</span> от 62 000 000 сум/год <br />" +
          "<span class='highlight'>Социальный пакет:</span> бесплатный обед в корпоративной столовой <br />" +
          "<span class='highlight'>Профессиональное развитие:</span> ежегодное обучение и тренинги за счёт клиники <br />" +
          "<span class='highlight'>Дополнительно:</span> наставничество, современная инфраструктура и поддержка развития персонала",
      },
    },
  };

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const id = fieldKey[selectedKey];
        const res = await axios.get(
          `https://hr.centralasian.uz/api/social/vacancies?division=${id}`
        );

        const data = res.data;
        const formattedJobs = data.map((item) => ({
          title: item.title,
          numberOfApplicants: item.onWaitingList,
          jobID: item.id,
        }));

        setJobs(formattedJobs);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [selectedKey]);

  const selected = staticFields[selectedKey];

  const blockHeader = `Вакансии по направлению ${selected.name}`;

  return (
    <div className="FieldSearchContainer" id="vacancies">
      <div className="FieldSearchContainer-header">Поиск по направлениям</div>

      <div className="FieldSearchContainer-fieldsContainer">
        {Object.entries(staticFields).map(([key, field]) => (
          <div
            key={key}
            className={`fieldContainer ${
              key === selectedKey ? "selected" : ""
            }`}
            onClick={() => setSelectedKey(key)}
          >
            <div className="field">{field.name}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="block">
          <div className="block-header">{blockHeader}</div>
          <div className="block-allDetailsContainer">
            {selected.invitation && (
              <div className="invitation">{selected.invitation}</div>
            )}
            {selected.benefits.length > 0 &&
              selected.benefits.map((benefit, index) => (
                <div className="benefits" key={index}>
                  {benefit}
                </div>
              ))}
            {selected.values && (
              <div className="detailsContainer">
                <div className="header">{selected.values.header}</div>
                <div
                  className="details"
                  dangerouslySetInnerHTML={{
                    __html: selected.values.details,
                  }}
                />
              </div>
            )}

            {selected.requirements && (
              <div className="detailsContainer">
                <div className="header">{selected.requirements.header}</div>
                <div
                  className="details"
                  dangerouslySetInnerHTML={{
                    __html: selected.requirements.details,
                  }}
                />
              </div>
            )}

            {selected.workingConditions && (
              <div className="detailsContainer">
                <div className="header">
                  {selected.workingConditions.header}
                </div>
                <div
                  className="details"
                  dangerouslySetInnerHTML={{
                    __html: selected.workingConditions.details,
                  }}
                />
              </div>
            )}

            {selected.explanation && (
              <div className="explanation">* {selected.explanation}</div>
            )}
          </div>
        </div>
      )}

      {jobs.length > 0 && (
        <Pagination itemsPerPage={4} className="JobApplicationCards-Container">
          {jobs.map((job, index) => (
            <JobApplicationCard
              key={index}
              title={job.title}
              numberOfApplicants={job.numberOfApplicants}
              jobID={job.jobID}
            />
          ))}
        </Pagination>
      )}

      {selected?.note && (
        <div className="noteContainer">
          <img src={Notice} alt="" />
          <div className="note">{selected.note}</div>
        </div>
      )}
    </div>
  );
}

export default FieldSearch;
