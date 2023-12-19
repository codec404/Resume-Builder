import React, { useEffect, useState } from "react";
import "./Body.css";
import { Download } from "react-feather";
import Editor from "../Editor/Editor";

const Body = () => {
  const colors = ["#E26EE5", "#3559E0", "#8ADAB2", "#EF4040", "#5D3587"];
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievements: "Achievements",
    summary: "Summary",
    other: "Other",
  };

  //STORE THE DETAILS OF THE USER
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sctionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sctionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sctionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sctionTitle: sections.education,
      details: [],
    },
    [sections.achievements]: {
      id: sections.achievements,
      sctionTitle: sections.achievements,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sctionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sctionTitle: sections.other,
      details: "",
    },
  });

  useEffect(() => {
    console.log(resumeInformation);
  }, [resumeInformation]);

  return (
    <>
      <div className="body-container">
        <p className="body-heading">Resume Builder</p>
        <div className="body-toolbar">
          <div className="colors">
            {colors.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="pick-color"
              ></span>
            ))}
          </div>
          <button>
            Download{" "}
            <span className="download-icon">
              <Download />
            </span>
          </button>
        </div>
        <div className="main">
          <Editor
            sections={sections}
            information={resumeInformation}
            setInformation={setResumeInformation}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
