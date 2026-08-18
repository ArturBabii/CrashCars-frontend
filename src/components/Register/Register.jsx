import { useState } from "react";
import styled from "styled-components";

const url = "http://localhost:5000/register";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ name, email, pass }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, error: null, success: true });
        setName("");
        setEmail("");
        setPass("");
      } else {
        setStatus({ loading: false, error: data.message || "Error registration", success: false });
      }
    } catch (err) {
      setStatus({ loading: false, error: "Unable to connect to the server.", success: false });
    }
  };

  return (
    <Container>
      <Card>
        <Title>Create an account</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="pass">Password</Label>
            <Input
              id="pass"
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={status.loading}>
            {status.loading ? "Registration..." : "Register"}
          </SubmitButton>
        </Form>

        {status.success && <Message type="success">Registration successful!</Message>}
        {status.error && <Message type="error">{status.error}</Message>}
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f8;
  font-family: system-ui, -apple-system, sans-serif;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  color: #1a1a1a;
  text-align: center;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }
`;

const SubmitButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2b6cb0;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;

  ${(props) =>
    props.type === "success" &&
    `
    background-color: #c6f6d5;
    color: #22543d;
  `}

  ${(props) =>
    props.type === "error" &&
    `
    background-color: #fed7d7;
    color: #742a2a;
  `}
`;