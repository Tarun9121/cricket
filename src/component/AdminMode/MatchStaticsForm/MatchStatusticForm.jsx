import { useState } from "react";

export default function MatchStatisticsForm() {
    const [seriesDetails, setSeriesDetails] = useState();
    
  const [formData, setFormData] = useState({
    numberOfInnings: "",
    runsScored: "",
    ballsFaced: "",
    ballsBowled: "",
    runsConceded: "",
    wicketsTaken: "",
    hundreds: "",
    fifties: "",
    sixes: "",
    fours: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form Submitted Successfully", formData);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) errors[key] = "This field is required.";
    });
    return errors;
  };

  return (
    <form className="border border-dark rounded-xl p-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center">Player Statistics</h2>
      <div className="form-group">
        <label>Number of Innings</label>
        <input
          type="number"
          name="numberOfInnings"
          className="form-control"
          placeholder="Enter Number of Innings"
          value={formData.numberOfInnings}
          onChange={handleChange}
        />
        {formErrors.numberOfInnings && (
          <small className="text-danger">{formErrors.numberOfInnings}</small>
        )}
      </div>
      <div className="form-group">
        <label>Runs Scored</label>
        <input
          type="number"
          name="runsScored"
          className="form-control"
          placeholder="Enter Runs Scored"
          value={formData.runsScored}
          onChange={handleChange}
        />
        {formErrors.runsScored && (
          <small className="text-danger">{formErrors.runsScored}</small>
        )}
      </div>
      <div className="form-group">
        <label>Balls Faced</label>
        <input
          type="number"
          name="ballsFaced"
          className="form-control"
          placeholder="Enter Balls Faced"
          value={formData.ballsFaced}
          onChange={handleChange}
        />
        {formErrors.ballsFaced && (
          <small className="text-danger">{formErrors.ballsFaced}</small>
        )}
      </div>
      <div className="form-group">
        <label>Balls Bowled</label>
        <input
          type="number"
          name="ballsBowled"
          className="form-control"
          placeholder="Enter Balls Bowled"
          value={formData.ballsBowled}
          onChange={handleChange}
        />
        {formErrors.ballsBowled && (
          <small className="text-danger">{formErrors.ballsBowled}</small>
        )}
      </div>
      <div className="form-group">
        <label>Runs Conceded</label>
        <input
          type="number"
          name="runsConceded"
          className="form-control"
          placeholder="Enter Runs Conceded"
          value={formData.runsConceded}
          onChange={handleChange}
        />
        {formErrors.runsConceded && (
          <small className="text-danger">{formErrors.runsConceded}</small>
        )}
      </div>
      <div className="form-group">
        <label>Wickets Taken</label>
        <input
          type="number"
          name="wicketsTaken"
          className="form-control"
          placeholder="Enter Wickets Taken"
          value={formData.wicketsTaken}
          onChange={handleChange}
        />
        {formErrors.wicketsTaken && (
          <small className="text-danger">{formErrors.wicketsTaken}</small>
        )}
      </div>
      <div className="form-group">
        <label>Hundreds</label>
        <input
          type="number"
          name="hundreds"
          className="form-control"
          placeholder="Enter Hundreds"
          value={formData.hundreds}
          onChange={handleChange}
        />
        {formErrors.hundreds && (
          <small className="text-danger">{formErrors.hundreds}</small>
        )}
      </div>
      <div className="form-group">
        <label>Fifties</label>
        <input
          type="number"
          name="fifties"
          className="form-control"
          placeholder="Enter Fifties"
          value={formData.fifties}
          onChange={handleChange}
        />
        {formErrors.fifties && (
          <small className="text-danger">{formErrors.fifties}</small>
        )}
      </div>
      <div className="form-group">
        <label>Sixes</label>
        <input
          type="number"
          name="sixes"
          className="form-control"
          placeholder="Enter Sixes"
          value={formData.sixes}
          onChange={handleChange}
        />
        {formErrors.sixes && (
          <small className="text-danger">{formErrors.sixes}</small>
        )}
      </div>
      <div className="form-group">
        <label>Fours</label>
        <input
          type="number"
          name="fours"
          className="form-control"
          placeholder="Enter Fours"
          value={formData.fours}
          onChange={handleChange}
        />
        {formErrors.fours && (
          <small className="text-danger">{formErrors.fours}</small>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Statistics
      </button>
    </form>
  );
}
