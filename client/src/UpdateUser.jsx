import React from "react";
import "./Users.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/getUser/` + id)
      .then((result) => {console.log(result)
        setName(result.data.name);
        setEmail(result.data.email);  
        setAge(result.data.age);
      }
    )
      .catch((err) => console.error(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_REACT_APP_SERVER_URL}updateUser/ `+ id, {
        name,
        email,
        age,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className="users-bg">
      <div className="users-card">
        <form onSubmit ={Update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
