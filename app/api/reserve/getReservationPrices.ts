import dayjs, { Dayjs } from "dayjs";
import prisma from "@/lib/prisma";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const getReservationPrices = async (
  arrival: Dayjs,
  departure: Dayjs,
) => {
  const reservationDays = [...Array(dayjs(departure).diff(arrival, "day"))].map(
    (_, i) => dayjs(arrival).add(i, "day").utcOffset(0).startOf("day"),
  );

  const discounts = await prisma.priceChange.findMany({
    where: {
      OR: [
        {
          dateFrom: {
            gte: reservationDays[0].toDate(),
            lte: reservationDays[reservationDays.length - 1].toDate(),
          },
        },
        {
          dateTo: {
            gt: reservationDays[0].toDate(),
            lte: reservationDays[reservationDays.length - 1].toDate(),
          },
        },
        {
          dateTo: {
            gt: reservationDays[0].toDate(),
          },
          dateFrom: {
            lte: reservationDays[0].toDate(),
          },
        },
      ],
    },
    select: {
      dateFrom: true,
      dateTo: true,
      change: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const reservationDaysToPrice = reservationDays.map((day) => {
    const activeDiscount = discounts.find(
      ({ dateTo, dateFrom }) =>
        !dayjs(dateFrom).isAfter(day) && !dayjs(dateTo).isBefore(day),
    );
    return 100 + (activeDiscount?.change || 0);
  });

  return { reservationDays, reservationDaysToPrice };
};
