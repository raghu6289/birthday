import React, { useEffect, useState } from 'react';
import { calculateNextBirthdayDetails, calculateAgeDetails } from './calculations';
import './BirthDate.css'
import logo from "./assets/logo.png"

const BirthDate = () => {
  const [date, setDate] = useState('1995-07-06');
  const [data, setData] = useState({});
  const [nextBirthday, setNextBirthday] = useState({});

  useEffect(() => {
    const ageDetails = calculateAgeDetails(date);
    setData(ageDetails);

    const nextBirthdayDetails = calculateNextBirthdayDetails(date);
    setNextBirthday(nextBirthdayDetails);
  }, [date]);

  return (
    <div className='main-container'>
      <div className='bday-input'>
        <span>Select Birthday Date</span>
        <input className='date-input' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className='container'>
        <div className='current'>
          <label>Age</label>
          <span >{data.years} <span style={{ fontSize: "25px" }}>Years</span></span>
          <div className='next-bday'>
            <span>{data.months} months</span>
            <span>|</span> <span>{data.day} Days</span>
          </div>
        </div>
        <div className='next'>
          <label>Next Birthday</label>
          <label><img src={logo} alt="" /></label>
          <span> {nextBirthday.dayOfWeek}</span>
          <div className='next-bday'>
            <span>{nextBirthday.months} months</span>
            <span>|</span> <span>{nextBirthday.days} Days</span>
          </div>
        </div>
      </div>

      <div >
        <div className='summary'>
          <span>Summary</span>
        </div>
        <div className='details'>
          <div className='content'>
            <span>Years</span>
            <p>{data.years}</p>
          </div>
          <div className='content'>
            <span>Months</span>
            <p>{data.totalMonths}</p>
          </div>
          <div className='content'>
            <span>Weeks</span>
            <p>{data.weeks}</p>
          </div>
          <div className='content'>
            <span>Days</span>
            <p>{data.days}</p>
          </div>
          <div className='content'>
            <span>Hours</span>
            <p>{data.hours}</p>
          </div>
          <div className='content'>
            <span>Minutes</span>
            <p>{data.minutes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BirthDate;
