import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { postSeriesData } from "../../../service/seriesService";
import { useNavigate } from "react-router-dom";

export default function SeriesForm({ seriesDetails, setSeriesDetails }) {
  const [formResponse, setFormResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState({
    format: "",
    name: "",
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeriesDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  function checkValidation(seriesDetails) {
    const date = new Date();
    const validFormats = [
      "test",
      "odi",
      "t20",
      "t10",
      "odi world cup",
      "t20 world cup",
    ];
    const errors = {};

    if (!seriesDetails.name || seriesDetails.name.trim() === "") {
      errors.name = "Series name is required.";
    }

    if (!seriesDetails.format || seriesDetails.format.trim() === "") {
      errors.format = "Series format is required.";
    } else if (!validFormats.includes(seriesDetails.format.toLowerCase())) {
      errors.format =
        "Invalid series format. Please select from Test, ODI, T20, T10, ODI World Cup, or T20 World Cup.";
    }

    if (!seriesDetails.startDate) {
      errors.startDate = "Start date is required.";
    }
     else if (new Date(seriesDetails.startDate) <= date) {
      errors.startDate =
        "Invalid series date: The selected date must be in the future. Please choose a valid future date.";
    }

    if (!seriesDetails.endDate) {
      errors.endDate = "End date is required.";
    } else if (
      seriesDetails.startDate &&
      new Date(seriesDetails.endDate) <= new Date(seriesDetails.startDate)
    ) {
      errors.endDate =
        "Invalid date range: The start date cannot be later than the end date. Please select a valid date range.";
    }

    setErrorMessage(errors);

    return Object.keys(errors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValidation(seriesDetails)) {
      submitSeriesData(seriesDetails);
    }
  };

  async function submitSeriesData(seriesData) {
    try {
      const response = await postSeriesData(seriesData);
      if (response.status === 200) {
        setFormResponse(response.data);
      }
    } catch (error) {
      const date = new Date();
      setFormResponse({
        message: "Sorry, something went wrong while posting the data.",
        status: "500",
        createdAt: date.toISOString(),
        updatedAt: "N/A",
      });
    }
  }

  return (
    <div className="p-5 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-center text-2xl font-semibold text-indigo-700 mb-5">Cricket Series Form</h2>
      {Object.keys(formResponse).length === 0 ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formSeriesName">
            <Form.Label className="text-lg text-gray-700">Series Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Series Name"
              name="name"
              value={seriesDetails.name}
              onChange={handleChange}
              className="form-control rounded-md p-3"
            />
            {errorMessage.name && (
              <div className="text-danger mt-2">{errorMessage.name}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formFormat">
            <Form.Label className="text-lg text-gray-700">Format</Form.Label>
            <Form.Control
              type="text"
              placeholder="Format"
              name="format"
              value={seriesDetails.format}
              onChange={handleChange}
              className="form-control rounded-md p-3"
            />
            {errorMessage.format && (
              <div className="text-danger mt-2">{errorMessage.format}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formStartDate">
            <Form.Label className="text-lg text-gray-700">Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Start Date"
              name="startDate"
              value={seriesDetails.startDate}
              onChange={handleChange}
              className="form-control rounded-md p-3"
            />
            {errorMessage.startDate && (
              <div className="text-danger mt-2">{errorMessage.startDate}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formEndDate">
            <Form.Label className="text-lg text-gray-700">End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter End Date"
              name="endDate"
              value={seriesDetails.endDate}
              onChange={handleChange}
              className="form-control rounded-md p-3"
            />
            {errorMessage.endDate && (
              <div className="text-danger mt-2">{errorMessage.endDate}</div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-full py-3 rounded-md shadow-md bg-indigo-600 hover:bg-indigo-700 text-white">
            Submit
          </Button>
        </Form>
      ) : (
        <div className="p-4 bg-green-100 border border-green-500 rounded-lg">
          <h3 className="text-center text-xl font-semibold">Submission Successful!</h3>
          <div className="mb-3 text-center">{formResponse.message}</div>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/");
            }}
            className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Go to Home
          </Button>
        </div>
      )}
    </div>
  );
}
