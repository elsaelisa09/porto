import { useState } from "react";
import SectionWrapper from "../components/SectionWrapper";

const CALENDAR_BASE_URL = "https://calendar.google.com/calendar/embed";
const CALENDAR_QUERY =
  "height=600&wkst=1&ctz=Asia%2FJakarta&src=ZWxzYS4xMjIxNDAxMzVAc3R1ZGVudC5pdGVyYS5hYy5pZA&color=%238e24aa";
const DESKTOP_CALENDAR_EMBED_URL = `${CALENDAR_BASE_URL}?${CALENDAR_QUERY}&mode=MONTH`;
const MOBILE_DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const formatEmbedDate = (date: Date) => {
  const jakartaDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
  );
  const year = jakartaDate.getFullYear();
  const month = String(jakartaDate.getMonth() + 1).padStart(2, "0");
  const day = String(jakartaDate.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

const shiftDay = (date: Date, amount: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);

  return nextDate;
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const selectedDateKey = formatEmbedDate(selectedDate);
  const mobileCalendarEmbedUrl = `${CALENDAR_BASE_URL}?${CALENDAR_QUERY}&mode=DAY&dates=${selectedDateKey}/${selectedDateKey}&showTitle=0&showTabs=0&showPrint=0&showCalendars=0`;

  return (
    <SectionWrapper
      id="calendar"
      title={
        <span className="flex w-full items-center justify-start gap-8 text-[42px] lg:text-[82px] xl:mb-8">
          <span className="font-light">My</span>
          <span className="font-light tracking-[0.28em]">Calendar</span>
        </span>
      }
      containerClassName="max-w-6xl !pt-4 md:!pt-12"
      contentClassName="max-w-none"
      sectionClassName="min-h-0"
      titleClassName="font-chathura font-light uppercase text-slate-900 text-[20px] sm:text-[22px] lg:text-[90px]"
    >
      <div className="md:mx-auto md:max-w-[979px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_16px_44px_rgba(15,23,42,0.08)] sm:p-5">
          <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:hidden">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedDate((current) => shiftDay(current, -1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                aria-label="Lihat hari sebelumnya"
              >
                &#8249;
              </button>

              <div className="min-w-0 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
                  Mobile Daily View
                </p>
                <p className="mt-1 text-sm font-medium capitalize text-slate-900">
                  {MOBILE_DATE_FORMATTER.format(selectedDate)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDate((current) => shiftDay(current, 1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                aria-label="Lihat hari berikutnya"
              >
                &#8250;
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedDate(new Date())}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Balik ke hari ini
            </button>
          </div>

          <iframe
            key={selectedDateKey}
            src={mobileCalendarEmbedUrl}
            title="Elsa Google Calendar mobile daily view"
            className="h-[680px] w-full rounded-2xl border border-slate-200 md:hidden"
          />
          <iframe
            src={DESKTOP_CALENDAR_EMBED_URL}
            title="Elsa Google Calendar"
            className="hidden h-[578px] w-full rounded-2xl border border-slate-200 md:block"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Calendar;
