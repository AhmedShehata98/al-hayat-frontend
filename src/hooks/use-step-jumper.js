import React from "react";

function useStepJumper({ initialStep = 0, maxStep = 10, jumpFrames = 100 }) {
  const [step, setStep] = React.useState(initialStep);

  const jumpToStep = React.useCallback(
    (newStep) => {
      if (step <= maxStep) {
        setStep((prevStep) => (prevStep += 1));
      }
    },
    [maxStep]
  );

  React.useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep < maxStep) {
          return prevStep + 1;
        } else {
          clearInterval(interval);
          return prevStep;
        }
      });
    }, jumpFrames);
    return () => clearInterval(interval);
  }, [jumpFrames, maxStep]);

  return [step, jumpToStep];
}

export default useStepJumper;
