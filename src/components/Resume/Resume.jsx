import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./Resume.css";
import {
  Mail,
  Linkedin,
  GitHub,
  Phone,
  Paperclip,
  Calendar,
  MapPin,
} from "react-feather";

const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();
  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    education: information[sections.education],
    achievements: information[sections.achievements],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary],
    other: information[sections.other],
  };
  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workExp"}
        draggable
        onDragOver={() => setTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`resume-section ${
          info.workExp?.sectionTitle ? "" : "hidden"
        } workExp`}
      >
        <div className="sectionTitle">{info.workExp.sectionTitle}</div>
        <div className="content">
          {info.workExp?.details?.map((item) => (
            <div className="content-item" key={item.title}>
              {item.title && <p className="content-title">{item.title}</p>}
              {item.companyName && (
                <p className="content-subTitle">{item.companyName}</p>
              )}
              {item.startDate && item.endDate ? (
                <div className="dates">
                  <Calendar /> {getFormattedDate(item.startDate)} &nbsp;- &nbsp;
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
              {item.location && (
                <p className="location">
                  <MapPin /> Remote
                </p>
              )}
              {item.certificationLink && (
                <a className="content-link" href={item.certificationLink}>
                  <Paperclip />
                  Certificate
                </a>
              )}
              {item.points?.length > 0 && (
                <ul className="content-points">
                  {item.points?.map((elem, index) => (
                    <li className="point" key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => setTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={`resume-section ${
          info.project?.sectionTitle ? "" : "hidden"
        } project`}
      >
        <div className="sectionTitle">{info.project.sectionTitle}</div>
        <div className="content">
          {info.project?.details?.map((item) => (
            <div className="content-item" key={item.title}>
              {item.title && <p className="content-title">{item.title}</p>}
              {item.deployedLink && (
                <a className="content-link" href={item.deployedLink}>
                  <Paperclip />
                  Live-Demo
                </a>
              )}
              {item.github && (
                <a className="content-link" href={item.github}>
                  <GitHub />
                  Github
                </a>
              )}
              {item.overview && <p className="overview">{item.overview}</p>}
              {item.points?.length > 0 && (
                <ul className="content-points">
                  {item.points?.map((elem, index) => (
                    <li className="point" key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => setTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`resume-section ${
          info.education?.sectionTitle ? "" : "hidden"
        } education`}
      >
        <div className="sectionTitle">{info.education?.sectionTitle}</div>
        <div className="content">
          {info.education?.details?.map((item) => (
            <div className="content-item" key={item.title}>
              {item.title && <p className="content-title">{item.title}</p>}
              {item.collegeName && (
                <p className="content-subTitle">{item.collegeName}</p>
              )}
              {item.startDate && item.endDate ? (
                <div className="dates">
                  <Calendar /> {getFormattedDate(item.startDate)} &nbsp;- &nbsp;
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.achievements]: (
      <div
        key={"achievements"}
        draggable
        onDragOver={() => setTarget(info.achievements?.id)}
        onDragEnd={() => setSource(info.achievements?.id)}
        className={`resume-section ${
          info.achievements?.sectionTitle ? "" : "hidden"
        } achievements`}
      >
        <div className="sectionTitle">{info.achievements?.sectionTitle}</div>
        <div className="content">
          {info.achievements?.points?.length > 0 && (
            <ul className="numbered">
              {info.achievements?.points?.map((elem, index) => (
                <li className="point" key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => setTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
        className={`resume-section ${
          info.summary?.sectionTitle ? "" : "hidden"
        } summary`}
      >
        <div className="sectionTitle">{info.summary?.sectionTitle}</div>
        <div className="content">
          <p className="overview">{info.summary.summary}</p>
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"other"}
        draggable
        onDragOver={() => setTarget(info.other?.id)}
        onDragEnd={() => setSource(info.other?.id)}
        className={`resume-section ${
          info.other?.sectionTitle ? "" : "hidden"
        } other`}
      >
        <div className="sectionTitle">{info.other?.sectionTitle}</div>
        <div className="content">
          <p className="overview">{info.other.other}</p>
        </div>
      </div>
    ),
  };

  const swapSourceTarget = (source, target) => {
    if (!source || !target) {
      return;
    }
    const tempColumns = [[...columns[0]], [...columns[1]]];
    //search col-1
    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
      sourceColumnIndex = 1;
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (sourceRowIndex < 0) {
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
      targetColumnIndex = 1;
    }
    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];
    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };
  useEffect(() => {
    setColumns([
      [sections.project, sections.education, sections.summary],
      [sections.workExp, sections.achievements, sections.other],
    ]);
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) {
      return;
    }
    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  return (
    <>
      <div ref={ref}>
        <div ref={containerRef} className="resume-container">
          <div className="resume-header">
            <p className="resume-heading">{info?.basicInfo?.detail?.name}</p>
            <p className="resume-subHeading">
              {info?.basicInfo?.detail?.title}
            </p>
            <div className="resume-links">
              {info?.basicInfo?.detail?.email && (
                <a
                  href={`mailto: ${info?.basicInfo?.detail?.email}`}
                  className="resume-link"
                  type="email"
                >
                  <Mail />
                  {info?.basicInfo?.detail?.email}
                </a>
              )}
              {info.basicInfo?.detail?.phone && (
                <a
                  href={`tel: ${info.basicInfo?.detail?.phone}`}
                  className="resume-link"
                >
                  <Phone />
                  {info.basicInfo?.detail?.phone}
                </a>
              )}
              {info.basicInfo?.detail?.linkedin && (
                <a
                  href={`${info.basicInfo?.detail?.linkedin}`}
                  className="resume-link"
                >
                  <Linkedin />
                  LinkedIn
                </a>
              )}
              {info.basicInfo?.detail?.github && (
                <a
                  href={`${info.basicInfo?.detail?.github}`}
                  className="resume-link"
                >
                  <GitHub />
                  Github
                </a>
              )}
            </div>
          </div>
          <div className="resume-main">
            <div className="col-1">
              {columns[0].map((item) => sectionDiv[item])}
            </div>
            <div className="col-2">
              {columns[1].map((item) => sectionDiv[item])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Resume;
