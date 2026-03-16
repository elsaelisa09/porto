import SectionWrapper from "../components/SectionWrapper";

const CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&src=ZWxzYS4xMjIxNDAxMzVAc3R1ZGVudC5pdGVyYS5hYy5pZA&color=%238e24aa";

const Calendar = () => {
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
          <iframe
            src={CALENDAR_EMBED_URL}
            title="Elsa Google Calendar"
            className="h-[560px] w-full rounded-2xl border border-slate-200 sm:h-[680px] md:h-[578px]"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Calendar;
