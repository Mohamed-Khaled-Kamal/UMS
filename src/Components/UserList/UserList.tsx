import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import './UserList.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import PreLoader from '../PreLoader/PreLoader';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function UserList() {
  let [userId, setUserId] = useState<Number | null>(null);
  let [userData, setUserData] = useState<any>({});
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (user: any) => {
    setShow(true);
    setUserId(user.id);
    setUserData(user);
  };

  let [users, setUsers] = useState<any[]>([]);
  let getUsers = async () => {
    try {
      setLoading(true);
      let response = await axios.get('https://dummyjson.com/users');
      setUsers(response?.data?.users);
      console.log(response?.data?.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let deleteUser = async () => {
    try {
      let response = await axios.delete(`https://dummyjson.com/users/${userId}`);
      console.log(response);
      handleClose();
      toast.success('Delete Done');
    } catch (error) {
      console.log(error);
    }
  };

  let navigateToAddUser = () => {
    navigate('/dashbord/adduser');
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <div>
            <div className="d-flex justify-content-between m-2">
              <h3>Users List</h3>
              <button
                onClick={navigateToAddUser}
                className="btn btn-warning text-light"
              >
                Add New User
              </button>
            </div>
            <hr />
            
            {window.innerWidth > 768 ? (
              <Table striped bordered hover className="text-center align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Job</th>
                    <th>Phone</th>
                    <th>BirthDate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <img src={user.image} width={50} alt="User" />
                      </td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.company.title}</td>
                      <td>{user.phone}</td>
                      <td>{user.birthDate}</td>
                      <td>
                        <div className="d-flex justify-content-around align-items-center flex-wrap">
                          <Link to={`/dashbord/updateuser/${user.id}`}>
                            <MdOutlineEdit
                              className="AIC text-warning me-3"
                              size={30}
                            />
                          </Link>
                          <MdDeleteOutline
                            onClick={() => handleShow(user)}
                            className="AIC text-danger"
                            size={30}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
             
              <div className="d-flex flex-wrap justify-content-center">
              {users.map((user) => (
                <Card
                  key={user.id}
                  style={{ width: '18rem', margin: '10px' }}
                  className="shadow-sm text-center"
                >
                  <Card.Img
                    variant="top"
                    src={user.image}
                    alt="User"
                    className="rounded-circle mx-auto mt-3"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <Card.Body>
                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {user.email}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <strong>Job:</strong> {user.company.title}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Phone:</strong> {user.phone}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Birth Date:</strong> {user.birthDate}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <div className="d-flex justify-content-around">
                      <Link to={`/dashbord/updateuser/${user.id}`}>
                        <MdOutlineEdit className="AIC text-warning mx-2" size={30} />
                      </Link>
                      <MdDeleteOutline
                        onClick={() => handleShow(user)}
                        className="AIC text-danger mx-2"
                        size={30}
                      />
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
            
            )}

            
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Confirm Deleting {`#${userData.id} ${userData.firstName}`}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are You Sure You Want Delete {userData.firstName}{' '}
                {userData.lastName} Data ????
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={() => deleteUser()}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}
