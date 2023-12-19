import React, { useEffect, useState } from "react";
import "./Editor.css";
import InputControl from "../InputControl/InputControl";
import { X } from "react-feather";

const Editor = (props) => {
  const sections = props.sections;
  const information = props.information;
  const [activeSectionKey, setActiveSectionKey] = useState(
    Object.keys(sections)[0]
  );
  const [activeInformation, setActiveInformation] = useState(
    information[sections[Object.keys(sections)[0]]]
  );
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);

  const [sectionTitle, setSectionTitle] = useState(
    sections[Object.keys(sections)[0]]
  );
  const [values, setValues] = useState({
    name: activeInformation?.detail?.name || "",
    title: activeInformation?.detail?.title || "",
    linkedin: activeInformation?.detail?.linkedin || "",
    github: activeInformation?.detail?.github || "",
    phone: activeInformation?.detail?.phone || "",
    email: activeInformation?.detail?.email || "",
  });

  const handlePointUpdate = (value, index) => {
    const tempValues = { ...values };
    if (!Array.isArray(tempValues.points)) {
      tempValues.points = [];
    }
    tempValues.points[index] = value;
    setValues(tempValues);
  };

  const handleAddNew = () => {
    const details = activeInformation?.details;
    if (!details) return;
    const lastDetail = details.slice(-1)[0];
    if (Object.keys(lastDetail).length == 0) return;
    details.push({});
    props.setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }));
    setActiveDetailIndex(details?.length - 1);
  };

  const handleRemoveChip = (index) => {
    // if(index === 0) return
    const details = activeInformation?.details
      ? [...activeInformation?.details]
      : "";
    if (!details) return;
    details.splice(index, 1);
    props.setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }));
    setActiveDetailIndex((prev) => prev - 1);
  };
  const workExpBody = (
    <div className="detail">
      <div className="edit-row">
        <InputControl
          label="Title"
          placeholder="Enter title eg. Frontend Developer"
          value={values.title}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <InputControl
          label="Company Name"
          placeholder="Enter company name eg. Google"
          value={values.companyName}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, companyName: e.target.value }))
          }
        />
      </div>
      <div className="edit-row">
        <InputControl
          label="Certificate Link"
          placeholder="Enter certificate link"
          value={values.certificationLink}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              certificationLink: e.target.value,
            }))
          }
        />
        <InputControl
          label="Location"
          placeholder="Enter location eg. Remote"
          value={values.location}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, location: e.target.value }))
          }
        />
      </div>
      <div className="edit-row">
        <InputControl
          label="Start Date"
          type="date"
          placeholder="Enter start date of work"
          value={values.startDate}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, startDate: e.target.value }))
          }
        />
        <InputControl
          label="End Date"
          type="date"
          placeholder="Enter end date of work"
          value={values.endDate}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, endDate: e.target.value }))
          }
        />
      </div>
      <div className="edit-column">
        <label>Enter Work Description</label>
        <InputControl
          placeholder="Line 1"
          value={values.points ? values.points[0] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 0)}
        />
        <InputControl
          placeholder="Line 2"
          value={values.points ? values.points[1] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 1)}
        />
        <InputControl
          placeholder="Line 3"
          value={values.points ? values.points[2] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 2)}
        />
      </div>
    </div>
  );

  const projectBody = (
    <div className="detail">
      <div className="edit-row">
        <InputControl
          label="Title"
          placeholder="Enter title eg. E-Commerce App"
          value={values.title}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <InputControl
          label="Overview"
          placeholder="Enter basic overview of the project"
          value={values.overview}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, overview: e.target.value }))
          }
        />
      </div>
      <div className="edit-row">
        <InputControl
          label="Deployed Link"
          placeholder="Enter deployed link of the project(if any)"
          value={values.deployed}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, deployed: e.target.value }))
          }
        />
        <InputControl
          label="Github Link"
          placeholder="Enter github link of the project"
          value={values.github}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, github: e.target.value }))
          }
        />
      </div>
      <div className="edit-column">
        <label>Enter Project Description</label>
        <InputControl
          placeholder="Line 1"
          value={values.points ? values.points[0] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 0)}
        />
        <InputControl
          placeholder="Line 2"
          value={values.points ? values.points[1] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 1)}
        />
        <InputControl
          placeholder="Line 3"
          value={values.points ? values.points[2] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 2)}
        />
        <InputControl
          placeholder="Line 4"
          value={values.points ? values.points[3] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 3)}
        />
      </div>
    </div>
  );

  const educationBody = (
    <div className="detail">
      <div className="edit-row">
        <InputControl
          label="Title"
          placeholder="Enter title eg. B.Tech"
          value={values.title}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <InputControl
          label="College/School Name"
          placeholder="Enter name of your school/college"
          value={values.collegeName}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, collegeName: e.target.value }))
          }
        />
      </div>
      <div className="edit-row">
        <InputControl
          label="Start Date"
          type="date"
          placeholder="Enter start date of this education"
          value={values.startDate}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, startDate: e.target.value }))
          }
        />
        <InputControl
          label="End Date"
          type="date"
          placeholder="Enter end date of this education"
          value={values.endDate}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, endDate: e.target.value }))
          }
        />
      </div>
    </div>
  );

  const basicInfoBody = (
    <div className="detail">
      <div className="edit-row">
        <InputControl
          label="Name"
          placeholder="Enter your full name eg. Jack"
          value={values.name}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <InputControl
          label="Title"
          placeholder="Enter your title eg. Frontend Developer"
          value={values.title}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="edit-row">
        <InputControl
          label="LinkedIn Link"
          placeholder="Enter your linkedin profile link"
          value={values.linkedin}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, linkedin: e.target.value }))
          }
        />
        <InputControl
          label="Github Link"
          placeholder="Enter your github profile link"
          value={values.github}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, github: e.target.value }))
          }
        />
      </div>
      <div className="edit-row">
        <InputControl
          label="Email"
          type="email"
          placeholder="Enter your email id "
          value={values.email}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <InputControl
          label="Phone"
          placeholder="Enter your phone number"
          value={values.phone}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </div>
    </div>
  );

  const achievementsBody = (
    <div className="detail">
      <div className="edit-column">
        <label>List your Achievements</label>
        <InputControl
          placeholder="Line 1"
          value={values.points ? values.points[0] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 0)}
        />
        <InputControl
          placeholder="Line 2"
          value={values.points ? values.points[1] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 1)}
        />
        <InputControl
          placeholder="Line 3"
          value={values.points ? values.points[2] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 2)}
        />
        <InputControl
          placeholder="Line 4"
          value={values.points ? values.points[3] : ""}
          onChange={(e) => handlePointUpdate(e.target.value, 3)}
        />
      </div>
    </div>
  );

  const summaryBody = (
    <div className="detail">
      <label>Summary</label>
      <textarea
        name="summary"
        id="summary"
        cols="30"
        rows="10"
        placeholder="Enter your objective/summary"
        value={values.summary}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, summary: e.target.value }))
        }
      ></textarea>
    </div>
  );

  const otherBody = (
    <div className="detail">
      <InputControl
        label="Other"
        placeholder="Enter something"
        value={values.other}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, other: e.target.value }))
        }
      />
    </div>
  );

  const generateBody = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo:
        return basicInfoBody;
      case sections.workExp:
        return workExpBody;
      case sections.project:
        return projectBody;
      case sections.education:
        return educationBody;
      case sections.achievements:
        return achievementsBody;
      case sections.summary:
        return summaryBody;
      case sections.other:
        return otherBody;
      default:
        return null;
    }
  };

  const handleSubmission = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo: {
        const tempDetail = {
          name: values.name,
          title: values.title,
          linkedin: values.linkedin,
          github: values.github,
          email: values.email,
          phone: values.phone,
        };
        props.setInformation((prev) => ({
          ...prev,
          [sections.basicInfo]: {
            ...prev[sections.basicInfo],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.workExp: {
        const tempDetail = {
          certificationLink: values.certificationLink,
          title: values.title,
          location: values.location,
          companyName: values.companyName,
          startDate: values.startDate,
          endDate: values.endDate,
          points: values.points,
        };
        const tempDetails = [...information[sections.workExp]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.workExp]: {
            ...prev[sections.workExp],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.project: {
        const tempDetail = {
          title: values.title,
          overview: values.overview,
          github: values.github,
          deployed: values.deployed,
          points: values.points,
        };
        const tempDetails = [...information[sections.project]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.project]: {
            ...prev[sections.project],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.education: {
        const tempDetail = {
          title: values.title,
          collegeName: values.collegeName,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        const tempDetails = [...information[sections.education]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.education]: {
            ...prev[sections.education],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.achievements: {
        const tempPoints = values.points;
        props.setInformation((prev) => ({
          ...prev,
          [sections.achievements]: {
            ...prev[sections.achievements],
            points: tempPoints,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.summary: {
        const tempDetail = values.summary;
        props.setInformation((prev) => ({
          ...prev,
          [sections.summary]: {
            ...prev[sections.summary],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.other: {
        const tempDetail = values.other;
        props.setInformation((prev) => ({
          ...prev,
          [sections.other]: {
            ...prev[sections.other],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
    }
  };
  useEffect(() => {
    const activeInfo = information[sections[activeSectionKey]];
    setActiveInformation(activeInfo);
    setSectionTitle(sections[activeSectionKey]);
    setActiveDetailIndex(0);
    setValues({
      name: activeInfo?.detail?.name || "",
      companyName: activeInfo?.details
        ? activeInfo.details[0]?.companyName || ""
        : "",
      certificationLink: activeInfo?.details
        ? activeInfo.details[0]?.certificationLink || ""
        : "",
      location: activeInfo?.details
        ? activeInfo.details[0]?.location || ""
        : "",
      startDate: activeInfo?.details
        ? activeInfo.details[0]?.startDate || ""
        : "",
      endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
      overview: activeInfo?.details
        ? activeInfo.details[0]?.overview || ""
        : "",
      deployed: activeInfo?.details
        ? activeInfo.details[0]?.deployed || ""
        : "",
      points: activeInfo?.details
        ? activeInfo.details[0]?.points
          ? [...activeInfo.details[0]?.points]
          : ""
        : activeInfo.points
        ? [...activeInfo.points]
        : "",
      collegeName: activeInfo?.details
        ? activeInfo.details[0]?.collegeName || ""
        : "",
      summary: typeof activeInfo?.detail != Object ? activeInfo.detail : "",
      other: typeof activeInfo?.detail != Object ? activeInfo.detail : "",
      title: activeInfo?.details
        ? activeInfo.details[0]?.title || ""
        : activeInfo?.detail?.title || "",
      linkedin: activeInfo?.detail?.linkedin || "",
      github: activeInfo?.details
        ? activeInfo.details[0]?.github || ""
        : activeInfo?.detail?.github || "",
      phone: activeInfo?.detail?.phone || "",
      email: activeInfo?.detail?.email || "",
    });
  }, [activeSectionKey]);

  useEffect(() => {
    setActiveInformation(information[sections[activeSectionKey]]);
  }, [information]);

  useEffect(() => {
    const details = activeInformation?.details;
    if (!details) return;
    const activeInfo = information[sections[activeSectionKey]];
    setValues({
      companyName: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.companyName || ""
        : "",
      certificationLink: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.certificationLink || ""
        : "",
      location: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.location || ""
        : "",
      startDate: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.startDate || ""
        : "",
      endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
      overview: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.overview || ""
        : "",
      deployed: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.deployed || ""
        : "",
      points: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.points
          ? [...activeInfo.details[activeDetailIndex]?.points]
          : ""
        : activeInfo.points
        ? [...activeInfo.points]
        : "",
      collegeName: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.collegeName || ""
        : "",
      title: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.title || ""
        : activeInfo?.detail?.title || "",
      linkedin: activeInfo?.detail?.linkedin || "",
      github: activeInfo?.details
        ? activeInfo.details[activeDetailIndex]?.github || ""
        : activeInfo?.detail?.github || "",
    });
  }, [activeDetailIndex]);
  return (
    <>
      <div className="edit-container">
        <div className="edit-header">
          {/* Finding Keys of the Object */}
          {Object.keys(sections)?.map((key) => (
            <div
              key={key}
              className={`section ${activeSectionKey === key ? "active" : ""}`}
              onClick={() => setActiveSectionKey(key)}
            >
              {sections[key]}
            </div>
          ))}
        </div>
        <div className="edit-body">
          <InputControl
            label="Section Title"
            placeholder="Enter section title"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
          <div className="chips">
            {activeInformation?.details
              ? activeInformation?.details?.map((item, index) => (
                  <div
                    className={`chip ${
                      activeDetailIndex === index ? "active" : ""
                    }`}
                    key={item.title + index}
                    onClick={() => setActiveDetailIndex(index)}
                  >
                    <p>
                      {sections[activeSectionKey]} {index + 1}
                    </p>
                    <X
                      onClick={(e) => {
                        e.stopPropagation(); // Due to Event Bubbling effect
                        handleRemoveChip(index);
                      }}
                    />
                  </div>
                ))
              : ""}
            {activeInformation?.details &&
            activeInformation?.details?.length > 0 ? (
              <div className="new" onClick={handleAddNew}>
                +New
              </div>
            ) : (
              ""
            )}
          </div>
          {generateBody()}

          <button onClick={handleSubmission}>Save</button>
        </div>
      </div>
    </>
  );
};

export default Editor;
