"use client";

import { PageTitle, Wizard } from "@/components";
import RoomPickStep from "@/app/(other-pages)/reserve/room-choose/RoomPickStep";
import { RoomChooseContextProvider } from "@/app/(other-pages)/reserve/room-choose/_context";
import { useCallback, useMemo, useState } from "react";
import ReservationDataStep from "@/app/(other-pages)/reserve/room-choose/ReservationDataStep";
import ReservationComplete from "@/app/(other-pages)/reserve/room-choose/ReservationComplete";

const initSteps = [
  {
    title: "Wybierz termin i pokój",
    content: RoomPickStep,
    nextStepButton: "Następny krok",
  },
  {
    title: "Uzupełnij dane rezerwacji",
    content: ReservationDataStep,
    nextStepButton: "Rezerwuj",
  },
  {
    title: "Rezerwacja",
    content: ReservationComplete,
  },
];

const RoomChoose = () => {
  const [isStepValid, setIsStepValid] = useState<boolean[]>(
    initSteps.map(() => false),
  );

  const setStepValid = useCallback(
    (i: number, isValid: boolean) => {
      setIsStepValid((steps) =>
        steps.map((oldVal, j) => (i === j ? isValid : oldVal)),
      );
    },
    [setIsStepValid],
  );

  const steps = useMemo(
    () =>
      initSteps.map((step, i) => ({
        ...step,
        isAvailable: i === 0 || isStepValid[i - 1],
        setIsValid: (val: boolean) => setStepValid(i, val),
      })),
    [isStepValid, setStepValid],
  );

  return (
    <>
      <PageTitle title="Rezerwacja pokoju" />
      <Wizard className="mt-4 lg:mt-10" steps={steps} />
    </>
  );
};

const RoomChooseWithProvider = () => (
  <RoomChooseContextProvider>
    <RoomChoose />
  </RoomChooseContextProvider>
);

export default RoomChooseWithProvider;
