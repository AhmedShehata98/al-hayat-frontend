import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DAYS_BACKGROUND_COLORS,
  DAYS_TEXT_COLORS,
  workDaysResponseAdaptor,
} from "../utils/adaptors/workdays-adaptor";

const DAYS = {
  saturday: "saturday",
  sunday: "sunday",
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
};
const INITIAL_WEEKDAYS_LIST = [
  {
    day: DAYS.saturday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.sunday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.monday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.tuesday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.wednesday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.thursday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.friday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
];
function useWeekDays({ initialWeekdaysList, onChangeWeekdays }) {
  const [weekDaysList, setWeekDaysList] = useState(
    initialWeekdaysList || INITIAL_WEEKDAYS_LIST
  );

  const handleSetWeekdays = useCallback(
    (update) => {
      setWeekDaysList((prevState) => {
        const newWeekdaysList =
          typeof update === "function" ? update(prevState) : update;

        onChangeWeekdays?.(newWeekdaysList); // Call the callback with the resolved state.
        return newWeekdaysList;
      });
    },
    [onChangeWeekdays]
  );

  useEffect(() => {
    if (initialWeekdaysList) {
      setWeekDaysList(initialWeekdaysList);
    }
  }, [initialWeekdaysList]);

  return {
    weekDaysList,
    handleSetWeekdays,
  };
}

export default useWeekDays;
