// export function calculateAgeDetails(dateOfBirth) {
//   const dob = new Date(dateOfBirth);
//   const currentDate = new Date();

//   let ageYears = currentDate.getFullYear() - dob.getFullYear();
//   let ageMonths = (currentDate.getFullYear() - dob.getFullYear()) * 12 + (currentDate.getMonth() - dob.getMonth());
//   let ageWeeks = Math.floor((currentDate - dob) / (1000 * 60 * 60 * 24 * 7));
//   let ageDays = Math.floor((currentDate - dob) / (1000 * 60 * 60 * 24));
//   let ageHours = Math.floor((currentDate - dob) / (1000 * 60 * 60));
//   let ageMinutes = Math.floor((currentDate - dob) / (1000 * 60));

//   if (ageDays < 0) {
//     ageMonths--;
//     ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
//   }

//   if (ageHours < 0) {
//     ageDays--;
//     ageHours += 24;
//   }

//   if (ageMinutes < 0) {
//     ageHours--;
//     ageMinutes += 60;
//   }

//   const previousBirthday = new Date(currentDate.getFullYear(), dob.getMonth(), dob.getDate());
//   const daysSinceBirthday = Math.floor((currentDate - previousBirthday) / (1000 * 60 * 60 * 24));

//   ageDays -= daysSinceBirthday;

//   if (ageDays < 0) {
//     ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
//     ageMonths--;
//   }

//   ageHours -= daysSinceBirthday * 24;
//   ageMinutes -= daysSinceBirthday * 24 * 60;

//   const months = currentDate.getMonth() - previousBirthday.getMonth() + (12 * (currentDate.getFullYear() - previousBirthday.getFullYear()));

//   return {
//     years: ageYears,
//     totalMonths: ageMonths,
//     months: months > 0 ? months : 0,
//     weeks: ageWeeks,
//     days: ageDays,
//     hours: ageHours,
//     minutes: ageMinutes,
//     day: daysSinceBirthday > 0 ? daysSinceBirthday : 0
//   };
// }


import moment from 'moment';

export function calculateAgeDetails(dateOfBirth) {
  const dob = moment(dateOfBirth);
  const currentDate = moment();

  let ageYears = currentDate.diff(dob, 'years');
  let ageMonths = currentDate.diff(dob, 'months');
  let ageWeeks = currentDate.diff(dob, 'weeks');
  let ageDays = currentDate.diff(dob, 'days');
  let ageHours = currentDate.diff(dob, 'hours');
  let ageMinutes = currentDate.diff(dob, 'minutes');

  const previousBirthday = moment(currentDate).set({ month: dob.month(), date: dob.date() });
  const daysSinceBirthday = currentDate.diff(previousBirthday, 'days');

  ageDays -= daysSinceBirthday;
  if (ageDays < 0) {
    ageMonths--;
    ageDays += moment(currentDate).subtract(1, 'months').daysInMonth();
  }

  ageHours -= daysSinceBirthday * 24;
  ageMinutes -= daysSinceBirthday * 24 * 60;

  const months = currentDate.diff(previousBirthday, 'months');

  return {
    years: ageYears,
    totalMonths: ageMonths,
    months: months > 0 ? months : 0,
    weeks: ageWeeks,
    days: ageDays,
    hours: ageHours,
    minutes: ageMinutes,
    day: daysSinceBirthday > 0 ? daysSinceBirthday : 0
  };
}


// export function calculateNextBirthdayDetails(dateOfBirth) {
//   const dob = new Date(dateOfBirth);
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const birthMonth = dob.getMonth();
//   const birthDate = dob.getDate();
//   const nextBirthday = new Date(currentYear, birthMonth, birthDate);

//   if (nextBirthday < currentDate) {
//     nextBirthday.setFullYear(currentYear + 1);
//   }
//   const diffTime = Math.abs(nextBirthday - currentDate);
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   const dayOfWeek = nextBirthday.toLocaleDateString('en-US', { weekday: 'long' });

//   let diffMonths = nextBirthday.getMonth() - currentDate.getMonth();
//   if (diffMonths < 0) {
//     diffMonths += 12;
//   }

//   return {
//     days: diffDays,
//     months: diffMonths,
//     dayOfWeek: dayOfWeek
//   };
// }

export function calculateNextBirthdayDetails(dateOfBirth) {
  const dob = moment(dateOfBirth);
  const currentDate = moment();

  const currentYear = currentDate.year();
  const birthMonth = dob.month();
  const birthDate = dob.date();

  let nextBirthday = moment().set({ year: currentYear, month: birthMonth, date: birthDate });

  if (nextBirthday.isBefore(currentDate)) {
    nextBirthday.add(1, 'year');
  }

  const diffDays = nextBirthday.diff(currentDate, 'days');
  const dayOfWeek = nextBirthday.format('dddd');

  let diffMonths = nextBirthday.month() - currentDate.month();
  if (diffMonths < 0) {
    diffMonths += 12;
  }

  return {
    days: diffDays,
    months: diffMonths,
    dayOfWeek: dayOfWeek
  };
}
