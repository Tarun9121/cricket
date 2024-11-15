import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { postMatchDetails } from "../../../service/matchService";

export default function MatchForm() {
    const location = useLocation();
    const seriesId = location.state.seriesId;
    const [errorMessage, setErrorMessage] = useState("NOT SUBMITTED");

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    venue: "",
    startTime: "",
    endTime: "",
    winner: "",
    seriesDto: {
        seriesId: seriesId
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    try {
        const response = await postMatchDetails(formData);
        if(response.status == 200) {
            setErrorMessage("SUCCESS")
        }
    } catch(error) {
        setErrorMessage("FAILED")
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="venue">
          <Form.Label>Venue</Form.Label>
          <Form.Control
            type="text"
            name="venue"
            placeholder="Enter venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="startTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="endTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="winner">
          <Form.Label>Winner</Form.Label>
          <Form.Control
            type="text"
            name="winner"
            placeholder="Enter winner name"
            value={formData.winner}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {
        errorMessage === "NOT SUBMITTED" ?
        <div></div>
        :
        errorMessage === "SUCCESS" ?
        <div>
            Data Successfully Saved...
        </div>
        :
        <div>
            Something has gone wrong...
        </div>
      }
    </div>
  );
}
