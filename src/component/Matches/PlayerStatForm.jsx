import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PlayerStateForm.module.css"; // Custom CSS file for additional styling
import { saveMatchStatistics } from "../../service/matchStatisticsService";

export default function PlayerStatForm() {
  const location = useLocation();
  const match = location.state?.matchDetails;
  const player = location.state?.playerDetails;

  const [formData, setFormData] = useState({
    numberOfInnings: "",
    runsScored: "",
    ballsFaced: "",
    ballsBowled: "",
    runsConcede: "",
    wicketsTaken: "",
    hundreds: "",
    fifties: "",
    sixes: "",
    fours: "",
    matchesDTO: {
      id: match.id,
    },
    playerDTO: {
      id: player.id,
    },
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
  
    Object.keys(formData).forEach((key) => {
      if (key !== "matchesDTO" && key !== "playerDTO" && !formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
  
  
    if (formData.numberOfInnings && formData.numberOfInnings > 4) {
      newErrors.numberOfInnings = "Number of innings must be 4 or less.";
    }
  
  
    if (formData.runsScored && formData.runsScored < 0) {
      newErrors.runsScored = "Runs scored must not be negative.";
    }
  
  
    if (formData.runsScored >= 100) {
  
      if (formData.hundreds && formData.hundreds === 0) {
        newErrors.hundreds = "If runs scored is 100 or more, hundreds must be greater than 0.";
      }
    } else if (formData.runsScored >= 50) {
  
      if (formData.hundreds && formData.hundreds > 0) {
        newErrors.hundreds = "Hundreds cannot be greater than 0 if runs scored is between 50 and 99.";
      }
      if (formData.fifties && formData.fifties != 1) {
        newErrors.fifties = "If runs scored is between 50 and 99, fifties must be exactly 1.";
      }
    } else if (formData.runsScored < 50) {
  
      if (formData.fifties && formData.fifties > 0) {
        newErrors.fifties = "If runs scored is less than 50, fifties must be 0.";
      }
      if (formData.hundreds && formData.hundreds > 0) {
        newErrors.hundreds = "If runs scored is less than 50, hundreds must be 0.";
      }
    }

    if(formData.runsScored >= 100 && formData.hundreds == 0) {
      newErrors.hundreds = `If runs scored is ${formData.runsScored}, then hundreds must not be 0`
    }

    if (formData.hundreds > 0 && formData.fifties > 0) {
      newErrors.hundreds = "You cannot have both hundreds and fifties.";
      newErrors.fifties = "You cannot have both hundreds and fifties.";
    }
  
  
    if (formData.ballsFaced && formData.ballsFaced < 0) {
      newErrors.ballsFaced = "Balls faced must not be negative.";
    }
  
  
    if (formData.ballsBowled && formData.ballsBowled < 0) {
      newErrors.ballsBowled = "Balls bowled must not be negative.";
    }
  
  
    if (formData.runsConcede && formData.runsConcede < 0) {
      newErrors.runsConcede = "Runs conceded must not be negative.";
    }
  
  
    if (formData.wicketsTaken && formData.wicketsTaken < 0) {
      newErrors.wicketsTaken = "Wickets taken must not be negative.";
    }
  
  
    if (formData.sixes && formData.sixes < 0) {
      newErrors.sixes = "Sixes must not be negative.";
    }
  
    if (formData.fours && formData.fours < 0) {
      newErrors.fours = "Fours must not be negative.";
    }
  
    return newErrors;
  };
  
  async function handleSubmitData(formData) {
    try {
      const response = await saveMatchStatistics(formData);
      if (response.status === 200) {
        setSubmitStatus("success"); 
      } else {
        setSubmitStatus("error"); 
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleSubmitData(formData);
  };

  return (
    <div className="container mt-4 p-5 d-flex justify-content-center align-items-center">
      <div className={`${styles["form-card"]} p-4 shadow-lg rounded`}>
        <h2 className="text-center mb-4">Player Statistics Form for <strong>{player.name}</strong></h2>
        
        {submitStatus === "success" && <div className="alert alert-success">Form submitted successfully!</div>}
        {submitStatus === "error" && <div className="alert alert-danger">There was an error submitting the form.</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Number of Innings</label>
              <input
                type="number"
                name="numberOfInnings"
                className={`form-control ${errors.numberOfInnings ? "is-invalid" : ""}`}
                value={formData.numberOfInnings}
                onChange={handleChange}
              />
              {errors.numberOfInnings && <div className="invalid-feedback">{errors.numberOfInnings}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Runs Scored</label>
              <input
                type="number"
                name="runsScored"
                className={`form-control ${errors.runsScored ? "is-invalid" : ""}`}
                value={formData.runsScored}
                onChange={handleChange}
              />
              {errors.runsScored && <div className="invalid-feedback">{errors.runsScored}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Balls Faced</label>
              <input
                type="number"
                name="ballsFaced"
                className={`form-control ${errors.ballsFaced ? "is-invalid" : ""}`}
                value={formData.ballsFaced}
                onChange={handleChange}
              />
              {errors.ballsFaced && <div className="invalid-feedback">{errors.ballsFaced}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Fours</label>
              <input
                type="number"
                name="fours"
                className={`form-control ${errors.fours ? "is-invalid" : ""}`}
                value={formData.fours}
                onChange={handleChange}
              />
              {errors.fours && <div className="invalid-feedback">{errors.fours}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Sixes</label>
              <input
                type="number"
                name="sixes"
                className={`form-control ${errors.sixes ? "is-invalid" : ""}`}
                value={formData.sixes}
                onChange={handleChange}
              />
              {errors.sixes && <div className="invalid-feedback">{errors.sixes}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Fifties</label>
              <input
                type="number"
                name="fifties"
                className={`form-control ${errors.fifties ? "is-invalid" : ""}`}
                value={formData.fifties}
                onChange={handleChange}
              />
              {errors.fifties && <div className="invalid-feedback">{errors.fifties}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Hundreds</label>
              <input
                type="number"
                name="hundreds"
                className={`form-control ${errors.hundreds ? "is-invalid" : ""}`}
                value={formData.hundreds}
                onChange={handleChange}
              />
              {errors.hundreds && <div className="invalid-feedback">{errors.hundreds}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Balls Bowled</label>
              <input
                type="number"
                name="ballsBowled"
                className={`form-control ${errors.ballsBowled ? "is-invalid" : ""}`}
                value={formData.ballsBowled}
                onChange={handleChange}
              />
              {errors.ballsBowled && <div className="invalid-feedback">{errors.ballsBowled}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Runs Conceded</label>
              <input
                type="number"
                name="runsConcede"
                className={`form-control ${errors.runsConcede ? "is-invalid" : ""}`}
                value={formData.runsConcede}
                onChange={handleChange}
              />
              {errors.runsConcede && <div className="invalid-feedback">{errors.runsConcede}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Wickets Taken</label>
              <input
                type="number"
                name="wicketsTaken"
                className={`form-control ${errors.wicketsTaken ? "is-invalid" : ""}`}
                value={formData.wicketsTaken}
                onChange={handleChange}
              />
              {errors.wicketsTaken && <div className="invalid-feedback">{errors.wicketsTaken}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4" >
            Submit Player Stats
          </button>
        </form>
      </div>
    </div>
  );
}
