import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postSeriesData } from '../../../service/seriesService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SeriesForm({seriesDetails, setSeriesDetails}) {
    const [formResponse, setFormResponse] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeriesDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        submitSeriesData(seriesDetails);
      };

      async function submitSeriesData(seriesData) {
        try {
            const response = await postSeriesData(seriesData);
            console.log(response);
            if(response.status === 200) {
                setFormResponse(response.data)
            }
        } catch(error) {
            const date = new Date();
            setFormResponse({
                message: "Sorry something has gone wrong while posting the Data",
                status: "500",
                createdAt: date.now(),
                updatedAt: "N/A"
            });
        }
      }

    return (
        <div className="border border-dark p-3 rounded-lg">
            {
                Object.keys(formResponse).length === 0 ? 
                <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formSeriesName">
          <Form.Label>Series Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Series Name"
            name="name"
            value={seriesDetails.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFormat">
          <Form.Label>Format</Form.Label>
          <Form.Control
            type="text"
            placeholder="format"
            name="format"
            value={seriesDetails.format}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Start Date"
            name="startDate"
            value={seriesDetails.startDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter End Date"
            name="endDate"
            value={seriesDetails.endDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWinner">
          <Form.Label>Winner</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Winner"
            name="winner"
            value={seriesDetails.winner}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
                </Form>
                :
                <div className={`p-3 flex gap-3`}>
                    <div>Message: {formResponse.message}</div>
                    <div>Time: {formResponse.createdAt}</div>
                    <Button variant="primary" onClick={() => {navigate("/")}}>
                        Home
                    </Button>
                </div>
            }

      </div>
    );
}