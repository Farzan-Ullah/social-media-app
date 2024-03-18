import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import "./App.css";
import axios from "axios";
import NavbarComponent from "./components/NavbarComponent";
import Users from "./components/Users";
import NewUser from "./components/NewUser";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  };

  const createUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/users", newUser)
      .then((res) => fetchUsers())
      .catch((err) => console.log(err));
  };

  // const users = [
  //   {
  //     id: 1,
  //     email: "george.bluth@reqres.in",
  //     first_name: "George",
  //     last_name: "Bluth",
  //     avatar: "https://reqres.in/img/faces/1-image.jpg",
  //   },
  //   {
  //     id: 2,
  //     email: "janet.weaver@reqres.in",
  //     first_name: "Janet",
  //     last_name: "Weaver",
  //     avatar: "https://reqres.in/img/faces/2-image.jpg",
  //   },
  //   {
  //     id: 3,
  //     email: "emma.wong@reqres.in",
  //     first_name: "Emma",
  //     last_name: "Wong",
  //     avatar: "https://reqres.in/img/faces/3-image.jpg",
  //   },
  //   {
  //     id: 4,
  //     email: "eve.holt@reqres.in",
  //     first_name: "Eve",
  //     last_name: "Holt",
  //     avatar: "https://reqres.in/img/faces/4-image.jpg",
  //   },
  //   {
  //     id: 5,
  //     email: "charles.morris@reqres.in",
  //     first_name: "Charles",
  //     last_name: "Morris",
  //     avatar: "https://reqres.in/img/faces/5-image.jpg",
  //   },
  //   {
  //     id: 6,
  //     email: "tracey.ramos@reqres.in",
  //     first_name: "Tracey",
  //     last_name: "Ramos",
  //     avatar: "https://reqres.in/img/faces/6-image.jpg",
  //   },
  // ];
  return (
    <div className="App">
      <NavbarComponent />

      <Container style={{ paddingTop: "10px" }}>
        <Row>
          {users.length ? (
            users.map((user, index) => (
              <Col md={4} key={index}>
                <Users user={user} />
              </Col>
            ))
          ) : (
            <div style={{ textAlign: "center", marginTop: "2em" }}>
              {" "}
              <Spinner animation="border" role="status" />
            </div>
          )}
        </Row>
        <NewUser
          newUser={newUser}
          setNewUser={setNewUser}
          createUser={createUser}
        />
      </Container>
    </div>
  );
}

export default App;
