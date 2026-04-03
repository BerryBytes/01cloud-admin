import { AppConstants } from "../constants/appconstants"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

export const getDiffDays = (oldDate, addAgo) => {
  let finalString = '';
  var date1 = new Date(oldDate); 
  var date2 = new Date(); 
  var msec = date2.getTime() - date1.getTime();
  var secs = Math.floor(msec / 1000);
  var mins = Math.floor(msec / 60000);
  var hrs = Math.floor(mins / 60);
  var days = Math.floor(hrs / 24);
  var yrs = Math.floor(days / 365);
  mins = mins % 60;
  hrs = hrs % 24;
  days = days % 365;

  if (yrs > 0) finalString = yrs + 'y';
  else if (days > 0) finalString = days + 'd';
  else if (hrs > 0) finalString = hrs + 'h';
  else if (mins > 0) finalString = mins + 'm';
  else if (secs > 0 && secs < 60) finalString = secs + 's';

  return finalString ? finalString.trim() + (addAgo ? ' ago' : '') : 'Just now';
};

export const getDurationInSeconds = (duration) => {
  let inSeconds = 0;

  switch (duration) {
    case "Day":
      inSeconds = 60 * 60 * 24;
      break;
    case "Week":
      inSeconds = 60 * 60 * 24 * 7;
      break;
    case "Month":
      inSeconds = 60 * 60 * 24 * 30;
      break;
    case "Hour":
    default:
      inSeconds = 60 * 60;
      break;
  }
  return inSeconds;
};

export const justAnAlert = () => {
  
};

export const spaceConversion = (space) => {
  if (space < 1024) return `${space} MB`;
  else return `${(space / 1024).toFixed(2)} GB`;
};

export const paymentSummaryDateFormat = (startDate, endDate) => {
  let fromMonth = shortMonths[new Date(startDate).getUTCMonth()];
  let toMonth = shortMonths[new Date(endDate).getUTCMonth()];
  let fromDate = new Date(startDate).getUTCDate();
  let toDate = new Date(endDate).getUTCDate();
  let year = new Date(endDate).getUTCFullYear();
  return `${fromMonth} ${fromDate} - ${toMonth} ${toDate}, ${year}`;
}

export const paymentSummaryDateFormat2 = (startDate, endDate) => {
  let month = months[new Date(startDate).getUTCMonth()];
  let year = new Date(endDate).getUTCFullYear();
  return `${month} ${year}`;
}

export const coreConversion = (coreValue) => {
  
  if (coreValue > 0) {
    return `${coreValue / 1000} CPU`;
  }
};

export const getDateInStandardFormat = (date, shortMonth) => {
  let standardDate = date;
  try {
     let d = new Date(date);
     
     if(shortMonth){
        standardDate = shortMonths[ d.getMonth() ] + ' ' + d.getDate() + ', ' +d.getFullYear() + ' ' + formatAMPM(d);
     }else{
        standardDate = months[ d.getMonth() ] + ' ' + d.getDate() + ', ' +d.getFullYear() + ' ' + formatAMPM(d);
     }
  }
  catch(e) {
     return standardDate
  }
  return standardDate;
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const convertToChartData = (data, type, unitObject) => {
  let finalData = [];
  if (data && data.length > 0) {
    // 1: Core; 2: Memory
    if (type === 1) {
      data.map((item) => {
        let _item = [];
        _item[0] = new Date(item[0] * 1000);
        _item[1] = item[1] * unitObject.MultiplyBy;
        finalData.push(_item);
      });
    } else if (type === 2) {
      data.map((item) => {
        let _item = [];
        _item[0] = new Date(item[0] * 1000);
        _item[1] = item[1] / 1048576;
        finalData.push(_item);
      });
    } else if (type === 3) {
      data.map((item) => {
        let _item = [];
        _item[0] = new Date(item[0] * 1000);
        _item[1] = item[1] / unitObject.DivideBy;
        finalData.push(_item);
      });
    }
  }
  return finalData;
};

export const formatSizeUnits = (data, type) => {
  let dividingObject = {};
  if (type === 2) {
    if (data >= 1073741824) {
      dividingObject.DivideBy = "1073741824";
      dividingObject.Unit = " GB";
    } else if (data >= 1048576) {
      dividingObject.DivideBy = "1048576";
      dividingObject.Unit = " MB";
    } else if (data >= 1024) {
      dividingObject.DivideBy = "1024";
      dividingObject.Unit = " KB";
    } else {
      dividingObject.DivideBy = "1";
      dividingObject.Unit = " Bytes";
    }
  } else if (type === 1) {
    if (data <= 1) {
      dividingObject.MultiplyBy = "1000";
      dividingObject.Unit = " m";
    } else {
      dividingObject.MultiplyBy = "1";
      dividingObject.Unit = " Core";
    }
  }
  return dividingObject;
};

export const validateRegex = (value, regex) => {
  return new RegExp(regex).test(value)
}

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${ attr }']`)
  return wrapper;
}

export const getStatusColor = (state) => {
  let statusColor = ''
  switch (state) {
    case 'Running':
      statusColor = '#4CAF50';
      break;
    case 'Succeeded':
      statusColor = '#2196F3';
      break;
    case 'Fetching Status':
      statusColor = '#2196F3';
      break;
    case 'Failed':
      statusColor = '#FF5252';
      break;
    case 'Stopped':
      statusColor = '#757575';
      break;
    case 'not-installed':
      statusColor = '#FF9800';
      break;
    case 'installed':
      statusColor = '#4CAF50';
      break;
    default:
      statusColor = "#FF9800"
  }
  return statusColor
}

export const getDiffBetweenDates = (_date1, _date2) => {
  let finalString = '';
  var date1 = new Date(_date1);
  var date2 = new Date(_date2);
  var msec = date2.getTime() - date1.getTime();
  var sec = (msec % 60000) / 1000;
  var mins = Math.floor(msec / 60000);

  if (mins > 0) finalString = mins + 'm';
  if (sec > 0) finalString += ' ' + Math.round(sec) + 's';

  return finalString ? finalString.trim() : '0s';
}

export const getDiffInHours = (oldDate) => {
  let hrs = 0;
  if (oldDate) {
    const date1 = new Date(oldDate);
    const date2 = new Date();
    const msec = date2.getTime() - date1.getTime();
    hrs = Math.floor(msec / 3600000);
  }
  return hrs;
}

export function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const validateInputField = (value, type = "default") => {
  let regex = AppConstants.validationRegex[type];
  if (!regex.test(value.trim())) {
    return { error: true, message: `ValidationRegex.${type}` };
  }
  return { error: false };
};

export const generateRandomCoupon = () => {

  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const couponLength = 15;
  let coupan = "";
  for (let i = 0; i <= couponLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    coupan += chars.substring(randomNumber, randomNumber + 1);
  }
  return coupan;
};