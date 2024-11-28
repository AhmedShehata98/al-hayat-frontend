export const DAYS_TEXT_COLORS = {
  vacation: "#161616",
  working: "#f6f6f6",
};
export const DAYS_BACKGROUND_COLORS = {
  vacation: "#FCFAEE",
  working: "#162129",
};

// schema for workDays adaptor:
// {
//   day: DAYS.sunday,
//   shifts: [],
//   color: DAYS_TEXT_COLORS,
//   backgroundColor: DAYS_BACKGROUND_COLORS,
//   isSelected: false,
//   isWorkingDay: false,
// },
export function workDaysResponseAdaptor(workDays = []) {
  const transformedWorkDays = workDays.map((day) => ({
    day: day.day.toLowerCase(),
    shifts: day.shifts.map((shift) => ({ time: shift })),
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: !day.isDayOff,
    isVacation: day.isDayOff,
    isWorkingDay: !day.isDayOff,
    maxCapacity: day.maxRequestsPerDay || 0,
  }));

  return transformedWorkDays;
}

export function workingDaysUpdateRequestAdaptor(days = []) {
  const transformedDays = days.map((day) => ({
    dayOfWeek: day.day.toLowerCase(),
    isDayOff: day.isVacation,
    maxRequestsPerDay: day.maxCapacity,
    shifts: day.shifts.map((shift) => ({
      startTime: `${shift.time.startTime}:00`,
      endTime: `${shift.time.endTime}:00`,
    })),
  }));

  return transformedDays;
}
