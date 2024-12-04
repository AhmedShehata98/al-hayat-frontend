export const DAYS_TEXT_COLORS = {
  vacation: "#161616",
  working: "#f6f6f6",
};
export const DAYS_BACKGROUND_COLORS = {
  vacation: "#FCFAEE",
  working: "#162129",
};

const DAYS_INTEGER = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export function workDaysResponseAdaptor(workDays = []) {
  const transformedWorkDays = workDays.map((day) => {
    return {
      day: day?.day?.toLowerCase() || "",
      shifts:
        day.shifts?.map((shift) => ({
          time: { ...shift },
        })) || [],
      color: DAYS_TEXT_COLORS,
      backgroundColor: DAYS_BACKGROUND_COLORS,
      isSelected: day.isDayOff === false ? true : false,
      isWorkingDay: day.isDayOff === false ? true : false,
      maxCapacity: day?.maxRequestsPerDay || 0,
    };
  });

  return transformedWorkDays;
}

export function workingDaysUpdateRequestAdaptor(days = []) {
  const transformedDays = days.map((day) => ({
    dayOfWeek: DAYS_INTEGER[day.day.toLowerCase()],
    isDayOff: !day.isWorkingDay,
    maxRequestsPerDay: day.maxCapacity,
    shifts: day.shifts.map((shift) => ({
      startTime: `${shift.time.startTime}:00`,
      endTime: `${shift.time.endTime}:00`,
    })),
  }));

  return transformedDays;
}
