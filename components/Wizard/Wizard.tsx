"use client";

import { FC, HTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";

const Wizard: FC<
  HTMLAttributes<HTMLDivElement> & {
    steps: WizardStep[];
  }
> = ({ className, steps }) => {
  const [activeStep, setActiveStep] = useState(1);
  const StepContent = steps[activeStep - 1].content;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeStep]);

  return (
    <div className={className}>
      <div className="w-full max-w-screen-lg mx-auto flex flex-col md:flex-row justify-center gap-2 px-4 lg:px-0">
        {steps.map(({ title, isAvailable }, i) => {
          const isAllowed =
            isAvailable &&
            (activeStep !== steps.length || i === activeStep - 1);

          return (
            <button
              key={i}
              className={clsx(
                i + 1 === activeStep
                  ? "bg-green-800 bg-opacity-80 text-white border-transparent"
                  : "border-green-800 border-opacity-80",
                !isAllowed &&
                  "bg-gray-300 border-transparent cursor-not-allowed",
                "px-4 rounded-md text-center text-sm py-1 lg:text-base lg:py-2 border-2",
              )}
              onClick={() => isAllowed && setActiveStep(i + 1)}
            >
              {`${i + 1}. ${title}`}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-screen-lg mx-auto my-10 px-4 lg:px-0">
        <StepContent setIsValid={steps[activeStep - 1].setIsValid} />
      </div>

      {steps[activeStep - 1].nextStepButton && (
        <div className="flex justify-center sticky bottom-0 mt-10 py-4 bg-gray-100 rounded-md">
          <button
            className={clsx(
              steps[activeStep].isAvailable
                ? "bg-green-800 bg-opacity-80 text-white"
                : "bg-gray-300 border-transparent cursor-not-allowed",
              "px-10 rounded-md py-2 text-center text-sm lg:text-base ",
            )}
            onClick={() => {
              if (steps[activeStep].isAvailable) {
                setActiveStep((step) => step + 1);
              }
            }}
          >
            {steps[activeStep - 1].nextStepButton}
          </button>
        </div>
      )}
    </div>
  );
};

type WizardStep = {
  title: string;
  content: FC<{ setIsValid: (val: boolean) => void }>;
  isAvailable: boolean;
  setIsValid: (val: boolean) => void;
  nextStepButton?: string;
};

export default Wizard;
