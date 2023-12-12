import React, { useEffect, useState } from "react";
import moment from "moment";
import { ReactComponent as BiArrow } from "../../assets/Icons/Bi Arrow.svg";
import axios from "axios";
import ServerURL from "../../utils/ServerURL";
import DatePicker from "../../components/DatePicker";
import { Link } from "react-router-dom";

const CoinHistory = () => {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState([]);
  const [student, setStudent] = useState([]);
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    const res1 = await axios.get(
      ServerURL.BASE_URL + "/complete/?student=" + user.profile.id
    );
    setGoals(res1.data);
    setFilter(res1.data);
    const res2 = axios.get(
      ServerURL.BASE_URL + "/student/?id=" + user.profile.id
    );
    setStudent(res2.data);
  };

  const filterData = () => {
    const filter = goals.filter(
      (goal) =>
        new Date(goal.date) >= new Date(startDate) &&
        new Date(endDate) >= new Date(goal.date)
    );
    setGoals(filter);
  };
  /* eslint-disable */
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [startDate, endDate]);
  /* eslint-enable 
  <Link to="/history" className="redeem">
                View
              </Link>*/
  return (
    <div className="container">
      <div className="header">
        <div className="flex">
          <div className="back">&lt;</div>
          <Link to="/progress" className="back-text">
            Back
          </Link>
          <div className="title">Earned Coin History</div>
        </div>
      </div>
      <div className="card-group">
        <div className="card-tiny card">
          <div className="text yellow">Available to Redeem</div>
          <div className="coin-card">
            <div className="text white">{student?.coin ? student.coin : 0}</div>
          </div>
        </div>
        <div className="card-tiny card">
          <div className="text">Already Redeemed</div>
          <div className="text">{student?.redeem ? student.redeem : 0}</div>
        </div>
      </div>
      <div className="card students coins new">
        <div className="flex">
          <div className="flex-col">
            <div className="text">Search</div>
            <div className="filter">
              <div className="search">
                <input type="text" placeholder="Search for a reward" />
                <div className="search-icon">
                  <div className="icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col">
            <div className="text">Entry Date From</div>
            <div className="form-group">
              <div className="form-control">
                <DatePicker
                  value={startDate}
                  max={endDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex-col">
            <div className="text">Entry Date To</div>
            <div className="form-group">
              <div className="form-control">
                <DatePicker
                  min={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="filter">
            <div className="btn">
              <div className="text">Filter</div>
              <div className="icon">
                <BiArrow />
              </div>
            </div>
          </div>
        </div>
        <div className="row header">
          <div className="label name">Awarded By</div>
          <div className="label date">Date Awarded</div>
          <div className="label amount">Amount</div>
          <div className="label">Reason</div>
        </div>
        {filter.map((goal) => (
          <div className="row">
            <div className="name">{goal?.reporter}</div>
            <div className="subject">Math</div>
            <div className="date">
              {goal && moment(new Date(goal?.date)).format("MM/DD/YYYY")}
            </div>
            <div className="amount">
              <div className="circle">{goal?.coin}</div>
            </div>
            <div className="reason">{goal?.reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinHistory;
