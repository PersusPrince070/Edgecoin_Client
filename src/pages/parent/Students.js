import React, { useState, useEffect } from "react";
import ServerURL from "../../utils/ServerURL";
import { Link } from "react-router-dom";
import axios from "axios";
import ProgressLine from "../../components/ProgressLine";

export const Students = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [students, setStudents] = useState([]);
  /* eslint-disable */
  useEffect(() => {
    axios
      .get(ServerURL.BASE_URL + "/student/?parent=" + user.profile.id)
      .then((res) => setStudents(res.data));
  }, []);
  /* eslint-enable */
  return (
    <div className="container">
      <div className="header">
        <div className="title">Students</div>
      </div>
      <div className="card students">
        <div className="row">
          <div className="col">
            <div className="label">Names</div>
            {students.map((student, index) => (
              <div className="item names" key={index}>
                <div className="image">
                  <img src={ServerURL.BASE_URL + student.image} alt="avatar" />
                </div>
                <Link to={"/student/" + student.id}>
                  <div className="name">{student.name}</div>
                </Link>
              </div>
            ))}
          </div>
          <div className="col">
            <div className="label">Weekly Progress</div>
            {students.map((student, index) => (
              <div className="item" key={index}>
                <ProgressLine goals={student.goals} />
              </div>
            ))}
          </div>
          <div className="col">
            <div className="label">Actions</div>
            {students.map((student, index) => (
              <div className="item" key={index}>
                <Link to={"/student/progress/" + student.id}>
                  <div className="btn">View</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
