import { useState, useEffect } from "react";

const Step = ({ isCompleted, isLast }) => {
  return (
    <div className="flex flex-col items-end mx-auto">
      <div
        className="rounded-full w-8 h-8 bg-white border-2 border-gray-300 text-gray-700 flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        {isCompleted && (
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" />
          </svg>
        )}
      </div>
      {!isLast && (
        <div className="w-px h-[60px] bg-white bottom-0 left-4 mr-4" />
      )}
    </div>
  );
};

const Stepper = ({ steps, currentStep }) => {
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const newCompletedSteps = [];
    for (let i = 0; i < currentStep; i++) {
      newCompletedSteps.push(i);
    }
    setCompletedSteps(newCompletedSteps);
  }, [currentStep]);

  return (
    <div className="stepper flex flex-row justify-between mx-4 gap-x-12">
      <div className="flex flex-col items-center gap-y-16">
        {steps.map((step, index) => (
          <div className="ml-4 text-lg text-white text-nowrap" key={index}>
            {step}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        {steps.map((step, index) => (
          <Step
            key={index}
            step={step}
            isCompleted={completedSteps.includes(index)}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Stepper;
