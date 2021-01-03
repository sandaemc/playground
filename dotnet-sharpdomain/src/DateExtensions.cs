using System;
using System.Globalization;
using DateTimeExtensions;

namespace SharpDomain
{
    public static class DateExtensions
    {
        private static int GetWeekNumber(this DateTime dt)
        {
            var dfi = DateTimeFormatInfo.CurrentInfo;
            var cal = dfi.Calendar;

            return cal.GetWeekOfYear(dt, dfi.CalendarWeekRule, dfi.FirstDayOfWeek);
        }

        public static bool IsOverDue(this DateTime dt)
        {
            var source = dt.TimeOfDay;
            var current = DateTime.Now.TimeOfDay;

            return current.Hours >= source.Hours &&
                   current.Minutes >= source.Minutes &&
                   current.Seconds >= source.Seconds;
        }

        public static bool IsNextWeek(this DateTime dt)
        {
            return dt.Date >= DateTime.Now.NextDayOfWeek(DayOfWeek.Sunday).Date;
        }

        public static bool IsThisWeek(this DateTime dt)
        {
            return GetWeekNumber(dt) == GetWeekNumber(DateTime.Now);
        }
    }
}