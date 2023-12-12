import React, { useState, useEffect } from "react";
import ServerURL from "../../utils/ServerURL";
import Password from "../../components/Password";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Student = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [student, setStudent] = useState({
    name: "",
    email: "",
    grade: "",
    image: "",
    gender: "male",
    athlete: false,
    college_bound: false,
    workforce_bound: false,
    interests: [],
    password: "",
    confirm: "",
    school: user.school,
    teachers: [],
    role: "student",
  });

  const initMessage = {
    name: "",
    email: "",
    school: "",
    password: "",
    confirm: "",
  };

  const [message, setMessage] = useState(initMessage);
  const [flag, setFlag] = useState(false);
  const [item, setItem] = useState("");
  const Upload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setStudent({
        ...student,
        image: img,
      });
    }
  };

  const removeItem = (interest) => {
    setStudent({
      ...student,
      interests: student.interests.filter((item) => item !== interest),
    });
  };

  const addItem = (event) => {
    if (event.key === "Enter") {
      setStudent({
        ...student,
        interests: [...student.interests, item],
      });
      setFlag(false);
      setItem("");
    }
  };

  const require = () => {
    let messages = initMessage;
    if (!student.name) messages["name"] = "This field is required!";
    if (!student.email) messages["email"] = "This field is required!";
    if (!student.school) messages["school"] = "This field is required!";
    if (!student.password) messages["password"] = "This field is required!";
    if (!student.confirm) messages["confirm"] = "This field is required!";
    if (student.confirm !== student.password)
      messages["confirm"] = "Password must be match!";
    setMessage(messages);
  };

  const Submit = async (e) => {
    e.preventDefault();
    await require();
    try {
      const data = {
        ...student,
        interests: JSON.stringify(student.interests),
      };
      await axios.post(ServerURL.BASE_URL + "/student/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/students");
    } catch {
      console.error("error");
    }
  };
  /* eslint-disable */

  useEffect(() => {
    if (params.id) {
      axios
        .get(ServerURL.BASE_URL + "/student/?id=" + params.id)
        .then((res) => {
          const data = {
            ...res.data,
            school: res.data.school.id,
            teachers: res.data.teachers.map((item) => item.id),
          };
          setStudent(data);
        });
    }
  }, [params.id]);
  /* eslint-enable */
  return (
    <div className="container">
      <div className="header">
        <div className="title">New Student</div>
      </div>
      <div className="card new">
        <div className="form-control">
          <div className="label">Student Name</div>
          <div>
            <input
              type="text"
              className="text"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              placeholder="Name"
            />
            <div className="alert-message">{message.name}</div>
          </div>
        </div>
        <div className="form-control">
          <div className="label">Student Email</div>
          <div>
            <input
              type="text"
              className="text"
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
              placeholder="Email"
            />
            <div className="alert-message">{message.email}</div>
          </div>
        </div>
        <div className="form-control">
          <div className="label">Grade</div>
          <input
            type="text"
            className="grade text"
            value={student.grade}
            onChange={(e) => setStudent({ ...student, grade: e.target.value })}
            placeholder="Grade"
          />
        </div>
        <div className="form-control">
          <div className="label">Student Profile Picture</div>
          <input className="file" id="file" type="file" onChange={Upload} />
          {student.image && (
            <img
              src={
                typeof student.image === "string"
                  ? ServerURL.BASE_URL + student.image
                  : URL.createObjectURL(student.image)
              }
              alt="Student"
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-control">
            <div className="label">Gender</div>
            <div className="options">
              <div
                className={
                  student.gender === "male" ? "option selected" : "option"
                }
                onClick={() => setStudent({ ...student, gender: "male" })}
              >
                Male
              </div>
              <div
                className={
                  student.gender !== "male" ? "option selected" : "option"
                }
                onClick={() => setStudent({ ...student, gender: "female" })}
              >
                Female
              </div>
            </div>
          </div>
          <div className="form-control">
            <div className="label">Athlete</div>
            <div className="options">
              <div
                className={student.athlete ? "option selected" : "option"}
                onClick={() => setStudent({ ...student, athlete: true })}
              >
                Yes
              </div>
              <div
                className={!student.athlete ? "option selected" : "option"}
                onClick={() => setStudent({ ...student, athlete: false })}
              >
                No
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <div className="label">College Bound</div>
            <div className="options">
              <div
                className={student.college_bound ? "option selected" : "option"}
                onClick={() => setStudent({ ...student, college_bound: true })}
              >
                Yes
              </div>
              <div
                className={
                  !student.college_bound ? "option selected" : "option"
                }
                onClick={() => setStudent({ ...student, college_bound: false })}
              >
                No
              </div>
            </div>
          </div>
          <div className="form-control">
            <div className="label">Workforce Bound</div>
            <div className="options">
              <div
                className={
                  student.workforce_bound ? "option selected" : "option"
                }
                onClick={() =>
                  setStudent({ ...student, workforce_bound: true })
                }
              >
                Yes
              </div>
              <div
                className={
                  !student.workforce_bound ? "option selected" : "option"
                }
                onClick={() =>
                  setStudent({ ...student, workforce_bound: false })
                }
              >
                No
              </div>
            </div>
          </div>
        </div>
        <div className="form-control">
          <div className="label">Interests</div>
          <div className="options">
            {student.interests.map((interest, index) => (
              <div
                className="option"
                onClick={() => removeItem(interest)}
                key={index}
              >
                {interest}
              </div>
            ))}

            {flag && (
              <div className="option">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  onKeyDown={addItem}
                />
              </div>
            )}
            {!flag && (
              <div className="plus" onClick={() => setFlag(true)}>
                +
              </div>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="label">Password</div>
          <div>
            <Password
              value={student.password}
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
              placeholder="Password"
            />
            <div className="alert-message">{message.password}</div>
          </div>
        </div>
        <div className="form-control">
          <div className="label">Confirm Password</div>
          <div>
            <Password
              value={student.confirm}
              onChange={(e) =>
                setStudent({ ...student, confirm: e.target.value })
              }
              placeholder="Confirm Password"
            />
            <div className="alert-message">{message.confirm}</div>
          </div>
        </div>
        <div className="submit" onClick={Submit}>
          Submit
        </div>
      </div>
    </div>
  );
};
