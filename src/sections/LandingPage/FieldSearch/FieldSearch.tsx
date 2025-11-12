import "./FieldSearch.scss";
import { useState, useEffect, useContext } from "react";
import JobApplicationCard from "../../../components/JobApplicationCard/JobApplicationCard.js";
import Notice from "/svgs/notice.svg";
import axios from "axios";
import { LoadingContext } from "../../../contexts/LoadingContext.js";
import Pagination from "../../../components/Pagination/Pagination.js";
import { useParams } from "react-router-dom";

type languagesType = "en" | "ru";

interface jobsType {
  title: string;
  numberOfApplicants: number;
  jobID: number;
}

interface databaseJobsType {
  title: string;
  onWaitingList: number;
  id: number;
}

interface staticFieldsValuesType {
  invitation: string;
  benefits: string[];
  values: { header: string; details: string };
  requirements: { header: string; details: string };
  workingConditions: { header: string; details: string };
  explanation?: string;
  note?: string;
}

function FieldSearch() {
  const [jobs, setJobs] = useState<jobsType[]>([]);
  const { setIsLoading } = useContext(LoadingContext);
  const { language } = useParams<{ language: languagesType }>();
  const currentLan = language || "ru";

  const fieldKey: Record<string, number> = {
    "Врачи / Специалисты (Physicians & Specialists)": 5121,
    "Медицинский и сестринский персонал (Nursing & Clinical Staff)": 5119,
    "Менеджмент и управленческий персонал (Leadership & Management)": 5120,
    "Лабораторные службы (Diagnostics)": 5122,
  };
  const [selectedKey, setSelectedKey] = useState<string>(
    "Врачи / Специалисты (Physicians & Specialists)"
  );

  const staticFields: Record<
    string,
    Record<languagesType, staticFieldsValuesType>
  > = {
    "Врачи / Специалисты (Physicians & Specialists)": {
      ru: {
        invitation:
          "Мы приглашаем молодых и целеустремлённых врачей присоединиться к команде новой современной клиники.",
        benefits: [
          "Если вы только завершаете ординатуру или недавно начали свою медицинскую практику — мы рады видеть вас в числе кандидатов. Наша клиника предлагает уникальную возможность профессионального роста под руководством опытных наставников и клинических кураторов.",
        ],
        values: {
          header: "Что мы ценим",
          details:
            "Желание учиться и расти как врач <br /> Готовность работать в команде и следовать клиническим стандартам",
        },
        requirements: {
          header: "Обязательные требования",
          details:
            "Высшее медицинское образование <br />" +
            "Ординатура или магистратура по соответствующей специальности* <br />" +
            "При стаже более 10 лет — наличие квалификационной категории. <br />" +
            "Действующая лицензия и опыт клинической работы <br />" +
            "Стремление к развитию и внедрению клинических стандартов",
        },
        workingConditions: {
          header: "Условия работы:",
          details:
            "<span class='highlight'>График:</span> с 08:00 до 17:00, 6/7 <br />" +
            "<span class='highlight'>Заработная плата:</span> от 180 000 000 сум/год <br />" +
            "<span class='highlight'>Социальный пакет:</span> бесплатный обед в корпоративной столовой <br />" +
            "<span class='highlight'>Профессиональное развитие:</span> ежегодное обучение и тренинги за счёт клиники",
        },
        explanation:
          "Высшее медицинское образование: бакалавриат по специальности Врач общей практики, послевузовское профессиональное образование может быть преимуществом.",
      },
      en: {
        invitation:
          "We invite young and ambitious doctors to join the team of our new, modern clinic.",
        benefits: [
          "Our clinic offers a unique opportunity for professional growth under the guidance of experienced mentors and clinical supervisors.You will be involved in both outpatient and inpatient care, work in a multidisciplinary team, and develop your clinical skills in real-world modern medical settings.",
        ],
        values: {
          header: "What We Value",
          details:
            "A strong desire to learn and grow as a physician <br /> Readiness to work in a team and follow clinical standards",
        },
        requirements: {
          header: "Mandatory requirements:",
          details:
            "Higher medical education <br />" +
            "Residency or master's degree in the relevant specialty* <br />" +
            "For experience over 10 years — qualification category required <br />" +
            "Valid license and clinical work experience <br />" +
            "Commitment to development and implementation of clinical standards",
        },
        workingConditions: {
          header: "Working Conditions:",
          details:
            "<span class='highlight'>Schedule:</span> 08:00 to 17:00, 6 days/week (Monday–Saturday) <br />" +
            "<span class='highlight'>Salary:</span> from 180,000,000 UZS per year <br />" +
            "<span class='highlight'>Social package:</span> free lunch at the corporate cafeteria <br />" +
            "<span class='highlight'>Professional development:</span> Annual training and courses at clinic's expense <br />" +
            "<span class='highlight'>Additional:</span> Mentorship, modern infrastructure and staff development support",
        },
        explanation:
          "Higher medical education: a bachelor’s degree in General Practice (Doctor), with postgraduate professional education considered an advantage.",
      },
    },

    "Медицинский и сестринский персонал (Nursing & Clinical Staff)": {
      ru: {
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
      en: {
        invitation:
          "We invite graduates of medical colleges and early-career specialists who want to build a career in a modern clinic.",
        benefits: [
          "Our team will provide you with support, on-the-job training, and mentorship from experienced staff. We value responsibility, patient care, and commitment to continuous development.",
          "The structure includes department nurses, assistants, and other clinical specialists. The work involves daily patient care, clinical procedures, and teamwork.",
        ],
        values: {
          header: "What We Value",
          details:
            "Striving to become a professional in your field <br />" +
            "Accuracy, attention to detail, and respect for patients <br />" +
            "Willingness to learn from mentors and grow with the clinic",
        },
        requirements: {
          header: "Requirements",
          details:
            "Secondary specialized medical education <br />" +
            "Certificate of professional development (not older than 5 years) <br />" +
            "Experience is welcome but not required",
        },
        workingConditions: {
          header: "Working Conditions:",
          details:
            "<span class='highlight'>Schedule:</span> 08:00 to 17:00, 6 days/week (Monday-Saturday)<br />" +
            "<span class='highlight'>Salary:</span> From 53,000,000 UZS/year <br />" +
            "<span class='highlight'>Social package:</span> Free lunch in corporate cafeteria <br />" +
            "<span class='highlight'>Professional development:</span> Annual training and courses at the clinic's expense <br />" +
            "<span class='highlight'>Additional:</span> Mentorship, modern infrastructure, and staff development support",
        },
      },
    },

    "Менеджмент и управленческий персонал (Leadership & Management)": {
      ru: {
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
      en: {
        invitation:
          "We are building a clinic management system from scratch — and are open to candidates ready to learn, grow, and take responsibility.",
        benefits: [
          "If you are a beginning manager striving to develop in the field of medical management — with us you will receive support from experienced leaders, access to systematic training, and the opportunity to participate in creating processes from a clean slate.",
          "Available roles include department heads, senior nurses, and other management positions.",
        ],
        values: {
          header: "What We Value",
          details:
            "Initiative, systematic thinking, and organization <br />" +
            "Readiness to take responsibility and learn in the process <br />" +
            "Respect for teamwork and client orientation",
        },
        requirements: {
          header: "Requirements",
          details:
            "Higher medical education in the relevant specialty <br />" +
            "Postgraduate professional education: residency or master's degree <br />" +
            "For candidates with over 10 years of experience — qualification category is mandatory <br />" +
            "Previous work experience is not mandatory, but a strong desire to grow and develop is essential",
        },
        workingConditions: {
          header: "Working Conditions:",
          details:
            "<span class='highlight'>Schedule:</span> 08:00 to 17:00, 6 days/week (Monday–Saturday) <br />" +
            "<span class='highlight'>Salary:</span> From 351,000,000 UZS/year <br />" +
            "<span class='highlight'>Social package:</span> Free lunch in corporate cafeteria <br />" +
            "<span class='highlight'>Professional development:</span> Annual training and courses at the clinic's expense <br />" +
            "<span class='highlight'>Additional:</span> Mentorship, modern infrastructure, and staff development support",
        },
      },
    },

    "Лабораторные службы (Diagnostics)": {
      ru: {
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
      en: {
        invitation:
          "If you are a graduate or beginning specialist dreaming of working in a modern laboratory — we are waiting for you!",
        benefits: [
          "Our laboratory will be equipped with advanced equipment and operate according to international standards. We offer training, mentor support, and the opportunity to become part of a team from the ground up.",
          "We invite laboratory technicians, biomedical research specialists, PCR and ELISA specialists, as well as junior technicians.",
        ],
        values: {
          header: "What We Value",
          details:
            "Attention to details and responsibility <br />" +
            "Interest in laboratory diagnostics and willingness to learn <br />" +
            "Cleanliness, adherence to quality standards, and discipline",
        },
        requirements: {
          header: "Requirements",
          details:
            "Secondary specialized or higher education (medical, biological, or chemical) <br />" +
            "Willingness to undergo on-the-job training <br />" +
            "Work experience is not required",
        },
        workingConditions: {
          header: "Working Conditions:",
          details:
            "<span class='highlight'>Schedule:</span> 08:00 to 17:00, 6 days/week (Monday–Saturday) <br />" +
            "<span class='highlight'>Salary:</span> From 62,000,000 UZS/year <br />" +
            "<span class='highlight'>Social package:</span> Free lunch in corporate cafeteria <br />" +
            "<span class='highlight'>Professional development:</span> Annual training and courses at the clinic's expense <br />" +
            "<span class='highlight'>Additional:</span> Mentorship, modern infrastructure, and staff development support",
        },
      },
    },
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // setIsLoading(true);
        const id = fieldKey[selectedKey];
        const res = await axios.get<databaseJobsType[]>(
          `https://hr.centralasian.uz/api/social/vacancies?division=${id}`
        );

        const formattedJobs: jobsType[] = res.data.map((item) => ({
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

  const fieldName =
    currentLan === "ru"
      ? selectedKey?.split("(")[0]?.trim()
      : selectedKey.match(/\((.*?)\)/)?.[1]?.trim() || selectedKey;
  const selected = staticFields[selectedKey]?.[currentLan];
  const blockHeader =
    currentLan === "ru"
      ? `Вакансии по направлению ${fieldName}`
      : `Job Vacancies for ${fieldName}`;

  return (
    <section className="FieldSearchContainer" id="vacancies">
      <header className="FieldSearchContainer-header">
        {currentLan === "ru" ? "Поиск по направлениям" : "Search by Faculty"}
      </header>

      <nav
        className="FieldSearchContainer-fieldsContainer"
        aria-label="Job categories"
      >
        {Object.entries(staticFields).map(([key, field]) => {
          const label =
            currentLan === "ru"
              ? key?.split("(")[0]?.trim()
              : key.match(/\((.*?)\)/)?.[1]?.trim() || key;

          return (
            <button
              key={key}
              type="button"
              className={`fieldContainer ${
                key === selectedKey ? "selected" : ""
              }`}
              onClick={() => setSelectedKey(key)}
            >
              <span className="field">{label}</span>
            </button>
          );
        })}
      </nav>

      {selected && (
        <article className="block">
          <header className="block-header">{blockHeader}</header>

          <div className="block-allDetailsContainer">
            {selected.invitation && (
              <p className="invitation">{selected.invitation}</p>
            )}

            {selected.benefits?.length > 0 && (
              <div className="benefits-list">
                {selected.benefits.map((benefit, index) => (
                  <span key={index} className="benefits-item">
                    {benefit}
                  </span>
                ))}
              </div>
            )}

            {selected.values && (
              <section className="detailsContainer">
                <h3 className="header">{selected.values.header}</h3>
                <p
                  className="details"
                  dangerouslySetInnerHTML={{ __html: selected.values.details }}
                />
              </section>
            )}

            {selected.requirements && (
              <section className="detailsContainer">
                <h3 className="header">{selected.requirements.header}</h3>
                <p
                  className="details"
                  dangerouslySetInnerHTML={{
                    __html: selected.requirements.details,
                  }}
                />
              </section>
            )}

            {selected.workingConditions && (
              <section className="detailsContainer">
                <h3 className="header">{selected.workingConditions.header}</h3>
                <p
                  className="details"
                  dangerouslySetInnerHTML={{
                    __html: selected.workingConditions.details,
                  }}
                />
              </section>
            )}

            {selected.explanation && (
              <p className="explanation">* {selected.explanation}</p>
            )}
          </div>
        </article>
      )}

      {jobs.length > 0 && (
        <section
          className="JobApplicationCardsSection"
          aria-label="Job listings"
        >
          <Pagination
            itemsPerPage={4}
            className="JobApplicationCards-Container"
            paginationFor={fieldName || ""}
          >
            {jobs?.map((job, index) => (
              <JobApplicationCard
                key={index}
                title={job.title}
                numberOfApplicants={job.numberOfApplicants}
                jobID={job.jobID}
                language={currentLan}
              />
            ))}
          </Pagination>
        </section>
      )}

      {selected?.note && (
        <aside className="noteContainer" role="note">
          <img src={Notice} alt="Note icon" />
          <p className="note">{selected.note}</p>
        </aside>
      )}
    </section>
  );
}

export default FieldSearch;
