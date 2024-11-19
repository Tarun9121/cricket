import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "admin" && formData.password === "admin") {
      localStorage.setItem("token", "admin");
      navigate("/admin-mode");
    }
  };

  return (
    <div className="p-5" style={{ backgroundColor: "#1a202c", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl max-w-sm w-full">
        <h3 className="text-3xl text-center font-semibold mb-5 text-white">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label className="font-medium text-gray-300">Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="border-2 border-gray-600 bg-gray-700  rounded-md p-3"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="font-medium text-gray-300">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border-2 border-gray-600 bg-gray-700  rounded-md p-3 "
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
