import { useEffect, useRef, useState } from "react";
import { postMatchDetails } from "../../../service/matchService";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllTeams } from "../../../service/teamService";

export default function MatchForm() {
  const navigation = useNavigate();
  const location = useLocation();
  const series = useRef(location.state.seriesDetails);
  const [allTeams, setAllTeams] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    venue: "",
    startTime: "",
    endTime: "",
    team1: "",
    team2: "",
    seriesDTO: {
      id: series.current.id,
    },
  });

  async function handleGetAllTeams() {
    try {
      const response = await getAllTeams();
      if (response.status === 200) {
        setAllTeams(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetAllTeams();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function checkValidation(data) {
    let errors = {};

    if (!data.team1) errors.team1 = "Team 1 is required.";
    if (!data.team2) errors.team2 = "Team 2 is required.";
    if (!data.startDate) errors.startDate = "Start Date is required.";
    if (!data.endDate) errors.endDate = "End Date is required.";
    if (!data.startTime) errors.startTime = "Start Time is required.";
    if (!data.endTime) errors.endTime = "End Time is required.";
    if (!data.venue) errors.venue = "Venue is required.";

    if (data.team1 && data.team2 && data.team1 === data.team2) {
      errors.team2 = "Team 2 cannot be the same as Team 1.";
    }

    const seriesStartDate = series.current.startDate;
    const seriesEndDate = series.current.endDate;

    if (data.startDate && data.startDate < seriesStartDate) {
      errors.startDate = `Start Date must be on or after ${seriesStartDate}.`;
    }
    if (data.startDate && data.endDate) {
      if (data.endDate < data.startDate) {
        errors.endDate = "End Date must be on or after Start Date.";
      }
      if (data.endDate > seriesEndDate) {
        errors.endDate = `End Date must be on or before ${seriesEndDate}.`;
      }
    }

    if (data.startTime && data.endTime && data.endTime <= data.startTime) {
      errors.endTime = "End Time must be after Start Time.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkValidation(formData)) {
      try {
        const response = await postMatchDetails(formData);
        if (response.status === 200) {
          setSubmissionStatus("success");
          setTimeout(() => {
            navigation("/admin-mode/match-form");
          }, 3000);
        }
      } catch (error) {
        setSubmissionStatus("failure");
      }
    } else {
      setSubmissionStatus("failure");
    }
  };

  return (
    <div className="p-6">
      {submissionStatus === "success" && (
        <div className="alert alert-success mt-3 text-center p-4">
          <strong>Success!</strong> Match registered successfully.
        </div>
      )}
      {submissionStatus === "failure" && (
        <div className="alert alert-danger mt-3 text-center p-4">
          <strong>Error!</strong> Failed to register the match. Please check the form and try again.
        </div>
      )}
      <form className="bg-white border border-gray-300 rounded-lg shadow-lg p-6" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Register a Match</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div className="form-group">
            <label className="text-lg font-medium text-gray-700">Team 1</label>
            <select
              name="team1"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.team1}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Team 1
              </option>
              {allTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            {formErrors.team1 && <small className="text-red-500">{formErrors.team1}</small>}
          </div>
          <div className="form-group">
            <label className="text-lg font-medium text-gray-700">Team 2</label>
            <select
              name="team2"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.team2}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Team 2
              </option>
              {allTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            {formErrors.team2 && <small className="text-red-500">{formErrors.team2}</small>}
          </div>
        </div>

        <div className="form-group mb-4">
          <label className="text-lg font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.startDate}
            onChange={handleChange}
          />
          {formErrors.startDate && <small className="text-red-500">{formErrors.startDate}</small>}
        </div>

        <div className="form-group mb-4">
          <label className="text-lg font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.endDate}
            onChange={handleChange}
          />
          {formErrors.endDate && <small className="text-red-500">{formErrors.endDate}</small>}
        </div>

        <div className="form-group mb-4">
          <label className="text-lg font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            name="startTime"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.startTime}
            onChange={handleChange}
          />
          {formErrors.startTime && <small className="text-red-500">{formErrors.startTime}</small>}
        </div>

        <div className="form-group mb-4">
          <label className="text-lg font-medium text-gray-700">End Time</label>
          <input
            type="time"
            name="endTime"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.endTime}
            onChange={handleChange}
          />
          {formErrors.endTime && <small className="text-red-500">{formErrors.endTime}</small>}
        </div>

        <div className="form-group mb-6">
          <label className="text-lg font-medium text-gray-700">Venue</label>
          <input
            type="text"
            name="venue"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.venue}
            onChange={handleChange}
          />
          {formErrors.venue && <small className="text-red-500">{formErrors.venue}</small>}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          Register Match
        </button>
      </form>
    </div>
  );
}
