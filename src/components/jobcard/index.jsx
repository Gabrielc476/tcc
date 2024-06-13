import React from "react";

const JobCard = ({
  company,
  title,
  jobs,
  aplicados,
  elegiveis,
  desqualificados,
  reaproveitados,
  ...props
}) => {
  return (
    <div className="job-card" {...props}>
      <div className="job-card-header">
        <div className="job-card-company">{company}</div>
        <div className="job-card-title">{title}</div>
        <div className="job-card-jobs">{jobs} Jobs</div>
      </div>
      <div className="job-card-details">
        <div className="job-card-stage">
          <div className="job-card-stage-label">Aplicados</div>
          <div className="job-card-stage-value">{aplicados}</div>
        </div>
        <div className="job-card-stage">
          <div className="job-card-stage-label">Elegíveis</div>
          <div className="job-card-stage-value">{elegiveis}</div>
        </div>
        <div className="job-card-stage">
          <div className="job-card-stage-label">Desqualificados</div>
          <div className="job-card-stage-value">{desqualificados}</div>
        </div>
        <div className="job-card-stage">
          <div className="job-card-stage-label">Reaproveitados</div>
          <div className="job-card-stage-value">{reaproveitados}</div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
