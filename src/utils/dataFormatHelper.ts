/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiDataItem = {
  date: string; // e.g., "2025-05-13"
  booking: number;
  clinician: number;
  service: number;
  location: number;
};

export function transformApiDataToWeeklyChart(apiData: ApiDataItem[]) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return apiData?.map((entry: ApiDataItem) => {
    const dateObj = new Date(entry.date);
    const day = dayNames[dateObj.getUTCDay()];

    return {
      day,
      Booking: entry.booking,
      Clinician: entry.clinician,
      Location: entry.location,
      Services: entry.service,
    };
  });
}

export function getWeekOfMonth(dateStr: string) {
  const date = new Date(dateStr);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const firstDayWeekday = firstDay.getDay(); // Sunday = 0

  return Math.ceil((dayOfMonth + firstDayWeekday) / 7);
}

export function transformApiDataToMonthlyChart(apiData: ApiDataItem[]) {
  const weeksMap: any = {
    1: { day: "Week 1", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    2: { day: "Week 2", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    3: { day: "Week 3", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    4: { day: "Week 4", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    5: { day: "Week 5", Booking: 0, Clinician: 0, Location: 0, Services: 0 }, // Optional, for months with 5 weeks
  };

  apiData.forEach((entry: any) => {
    const weekNum: any = getWeekOfMonth(entry.date);
    if (weeksMap[weekNum]) {
      weeksMap[weekNum].Booking += entry.booking;
      weeksMap[weekNum].Clinician += entry.clinician;
      weeksMap[weekNum].Location += entry.location;
      weeksMap[weekNum].Services += entry.service;
    }
  });

  // Filter out unused weeks (e.g., Week 5 if empty)
  return Object.values(weeksMap);
}


export function transformApiDataToYearlyChart(apiData:ApiDataItem[]) {
  // Initialize months with zero values
  const monthsMap:any = {
    0: { day: "Jan", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    1: { day: "Feb", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    2: { day: "Mar", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    3: { day: "Apr", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    4: { day: "May", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    5: { day: "Jun", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    6: { day: "Jul", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    7: { day: "Aug", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    8: { day: "Sep", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    9: { day: "Oct", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    10: { day: "Nov", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
    11: { day: "Dec", Booking: 0, Clinician: 0, Location: 0, Services: 0 },
  };

  // Aggregate daily values into monthly sums
  apiData.forEach((entry:any) => {
    const dateObj = new Date(entry.date);
    const monthIndex:any = dateObj.getMonth();

    monthsMap[monthIndex].Booking += entry.booking;
    monthsMap[monthIndex].Clinician += entry.clinician;
    monthsMap[monthIndex].Location += entry.location;
    monthsMap[monthIndex].Services += entry.service;
  });

  // Convert object to array sorted by month index
  return Object.values(monthsMap);
}

