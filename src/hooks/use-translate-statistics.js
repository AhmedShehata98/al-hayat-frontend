import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateStatistics = () => {
  const [t] = useTranslation();
  const translatedStatistics = {
    headingTitle: t(tokens.statistics.headingTitle),
    totalOrders: t(tokens.statistics.totalOrders),
    todayProgress: t(tokens.statistics.todayProgress),
    todayCompleted: t(tokens.statistics.todayCompleted),
    inProgress: t(tokens.statistics.inProgress),
    completed: t(tokens.statistics.completed),
    totalIncome: t(tokens.statistics.totalIncome),
    totalHoldIncome: t(tokens.statistics.totalHoldIncome),
    topDrivers: t(tokens.statistics.topDrivers),
    topProducts: t(tokens.statistics.topProducts),
  };
  return { translatedStatistics };
};

export default useTranslateStatistics;
