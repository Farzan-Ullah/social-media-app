import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function User({ user }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={user.avatar} />
      <Card.Body>
        <Card.Title>
          {user.first_name} {user.last_name}
        </Card.Title>
        <Card.Text>{user.email}</Card.Text>
        <Button variant="dark">Follow</Button>
      </Card.Body>
    </Card>
  );
}

export default User;
