import React from "react";
import { useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
     axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}`)
     .then(result=>setUsers(result.data))
     .catch(err=>console.error(err))

  },[])

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_URL}deleteUser/`+id)
      .then(res => {console.log(res)
        window.location.reload()
      })
      .catch(err => console.error(err));
    }
  return (
    <div className="users-bg">
      <div className="users-card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "0.8rem",
          }}
        >
          <Link to="/createUser" className="btn ">
            Add +
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link to={`/update/${user._id}`} className="btn">
                        Update
                      </Link>
                      <button className='btn btn-danger'
                       onClick={(e)=>handleDelete(user._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
