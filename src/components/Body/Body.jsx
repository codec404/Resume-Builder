import React, { useRef, useState } from "react";
import "./Body.css";
import { Download } from "react-feather";
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";
import ReactToPrint from "react-to-print";

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

  const resumeRef = useRef()

  const [activeColor, setActiveColor] = useState("#239ce2");
  //STORE THE DETAILS OF THE USER
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievements]: {
      id: sections.achievements,
      sectionTitle: sections.achievements,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      details: "",
    },
  });

  // useEffect(() => {
  //   console.log(resumeInformation);
  // }, [resumeInformation]);

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
                className={`pick-color ${
                  activeColor === color ? "active" : ""
                }`}
                onClick={() => setActiveColor(color)}
              ></span>
            ))}
          </div>
          <ReactToPrint
            trigger={() => {
              return (
                <button>
                  Download{" "}
                  <span className="download-icon">
                    <Download />
                  </span>
                </button>
              );
            }}
            content={() => resumeRef.current}
          />
        </div>
        <div className="main">
          <Editor
            sections={sections}
            information={resumeInformation}
            setInformation={setResumeInformation}
          />
          <Resume
            ref={resumeRef}
            sections={sections}
            information={resumeInformation}
            activeColor={activeColor}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
