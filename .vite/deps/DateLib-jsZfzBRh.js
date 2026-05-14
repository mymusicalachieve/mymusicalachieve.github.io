import { f as startOfWeek, n as enUS$1 } from "./isSameWeek-BhD9Q9QT.js";
import { A as setMonth, Cn as getMonth, Jn as format, Kr as differenceInCalendarMonths, Oi as addMonths, Pr as endOfMonth, Pt as isSameYear, Qn as getWeek, Qr as isSameDay, Rt as isSameMonth, Zr as isDate, _i as differenceInCalendarDays, _r as endOfYear, bi as startOfISOWeek, dr as endOfWeek, gr as startOfYear, hn as getYear, ki as addDays, li as addYears, mr as eachYearOfInterval, oi as min, on as isBefore, si as max, sn as isAfter, tr as getISOWeek, ui as addWeeks, ur as endOfISOWeek, vi as startOfDay, wr as eachMonthOfInterval, y as setYear, yr as startOfMonth } from "./date-fns-PV-AbY4R.js";
//#region node_modules/@date-fns/tz/tzName/index.js
/**
* Time zone name format.
*/
/**
* The function returns the time zone name for the given date in the specified
* time zone.
*
* It uses the `Intl.DateTimeFormat` API and by default outputs the time zone
* name in a long format, e.g. "Pacific Standard Time" or
* "Singapore Standard Time".
*
* It is possible to specify the format as the third argument using one of the following options
*
* - "short": e.g. "EDT" or "GMT+8".
* - "long": e.g. "Eastern Daylight Time".
* - "shortGeneric": e.g. "ET" or "Singapore Time".
* - "longGeneric": e.g. "Eastern Time" or "Singapore Standard Time".
*
* These options correspond to TR35 tokens `z..zzz`, `zzzz`, `v`, and `vvvv` respectively: https://www.unicode.org/reports/tr35/tr35-dates.html#dfst-zone
*
* @param timeZone - Time zone name (IANA or UTC offset)
* @param date - Date object to get the time zone name for
* @param format - Optional format of the time zone name. Defaults to "long". Can be "short", "long", "shortGeneric", or "longGeneric".
*
* @returns Time zone name (e.g. "Singapore Standard Time")
*/
function tzName(timeZone, date, format = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone,
		timeZoneName: format
	}).format(date).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/@date-fns/tz/tzOffset/index.js
var offsetFormatCache = {};
var offsetCache = {};
/**
* The function extracts UTC offset in minutes from the given date in specified
* time zone.
*
* Unlike `Date.prototype.getTimezoneOffset`, this function returns the value
* mirrored to the sign of the offset in the time zone. For Asia/Singapore
* (UTC+8), `tzOffset` returns 480, while `getTimezoneOffset` returns -480.
*
* @param timeZone - Time zone name (IANA or UTC offset)
* @param date - Date to check the offset for
*
* @returns UTC offset in minutes
*/
function tzOffset(timeZone, date) {
	try {
		const offsetStr = (offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-US", {
			timeZone,
			timeZoneName: "longOffset"
		}).format)(date).split("GMT")[1];
		if (offsetStr in offsetCache) return offsetCache[offsetStr];
		return calcOffset(offsetStr, offsetStr.split(":"));
	} catch {
		if (timeZone in offsetCache) return offsetCache[timeZone];
		const captures = timeZone?.match(offsetRe);
		if (captures) return calcOffset(timeZone, captures.slice(1));
		return NaN;
	}
}
var offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
	const hours = +(values[0] || 0);
	const minutes = +(values[1] || 0);
	const seconds = +(values[2] || 0) / 60;
	return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
}
//#endregion
//#region node_modules/@date-fns/tz/date/mini.js
var TZDateMini = class TZDateMini extends Date {
	constructor(...args) {
		super();
		if (args.length > 1 && typeof args[args.length - 1] === "string") this.timeZone = args.pop();
		this.internal = /* @__PURE__ */ new Date();
		if (isNaN(tzOffset(this.timeZone, this))) this.setTime(NaN);
		else if (!args.length) this.setTime(Date.now());
		else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) this.setTime(args[0]);
		else if (typeof args[0] === "string") this.setTime(+new Date(args[0]));
		else if (args[0] instanceof Date) this.setTime(+args[0]);
		else {
			this.setTime(+new Date(...args));
			adjustToSystemTZ(this, NaN);
			syncToInternal(this);
		}
	}
	static tz(tz, ...args) {
		return args.length ? new TZDateMini(...args, tz) : new TZDateMini(Date.now(), tz);
	}
	withTimeZone(timeZone) {
		return new TZDateMini(+this, timeZone);
	}
	getTimezoneOffset() {
		const offset = -tzOffset(this.timeZone, this);
		return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
	}
	setTime(time) {
		Date.prototype.setTime.apply(this, arguments);
		syncToInternal(this);
		return +this;
	}
	[Symbol.for("constructDateFrom")](date) {
		return new TZDateMini(+new Date(date), this.timeZone);
	}
};
var re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
	if (!re.test(method)) return;
	const utcMethod = method.replace(re, "$1UTC");
	if (!TZDateMini.prototype[utcMethod]) return;
	if (method.startsWith("get")) TZDateMini.prototype[method] = function() {
		return this.internal[utcMethod]();
	};
	else {
		TZDateMini.prototype[method] = function() {
			Date.prototype[utcMethod].apply(this.internal, arguments);
			syncFromInternal(this);
			return +this;
		};
		TZDateMini.prototype[utcMethod] = function() {
			Date.prototype[utcMethod].apply(this, arguments);
			syncToInternal(this);
			return +this;
		};
	}
});
/**
* Function syncs time to internal date, applying the time zone offset.
*
* @param {Date} date - Date to sync
*/
function syncToInternal(date) {
	date.internal.setTime(+date);
	date.internal.setUTCSeconds(date.internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, date) * 60));
}
/**
* Function syncs the internal date UTC values to the date. It allows to get
* accurate timestamp value.
*
* @param {Date} date - The date to sync
*/
function syncFromInternal(date) {
	Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
	Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());
	adjustToSystemTZ(date);
}
/**
* Function adjusts the date to the system time zone. It uses the time zone
* differences to calculate the offset and adjust the date.
*
* @param {Date} date - Date to adjust
*/
function adjustToSystemTZ(date) {
	const baseOffset = tzOffset(date.timeZone, date);
	const offset = baseOffset > 0 ? Math.floor(baseOffset) : Math.ceil(baseOffset);
	const prevHour = /* @__PURE__ */ new Date(+date);
	prevHour.setUTCHours(prevHour.getUTCHours() - 1);
	const systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
	const systemDSTChange = systemOffset - -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset();
	const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();
	if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);
	const offsetDiff = systemOffset - offset;
	if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
	const systemDate = /* @__PURE__ */ new Date(+date);
	systemDate.setUTCSeconds(0);
	const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60;
	const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
	if (secondsOffset || systemSecondsOffset) {
		date.internal.setUTCSeconds(date.internal.getUTCSeconds() + secondsOffset);
		Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
	}
	const postBaseOffset = tzOffset(date.timeZone, date);
	const postOffset = postBaseOffset > 0 ? Math.floor(postBaseOffset) : Math.ceil(postBaseOffset);
	const postOffsetDiff = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset() - postOffset;
	const offsetChanged = postOffset !== offset;
	const postDiff = postOffsetDiff - offsetDiff;
	if (offsetChanged && postDiff) {
		Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
		const newBaseOffset = tzOffset(date.timeZone, date);
		const offsetChange = postOffset - (newBaseOffset > 0 ? Math.floor(newBaseOffset) : Math.ceil(newBaseOffset));
		if (offsetChange) {
			date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange);
			Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
		}
	}
}
//#endregion
//#region node_modules/@date-fns/tz/date/index.js
var TZDate = class TZDate extends TZDateMini {
	static tz(tz, ...args) {
		return args.length ? new TZDate(...args, tz) : new TZDate(Date.now(), tz);
	}
	toISOString() {
		const [sign, hours, minutes] = this.tzComponents();
		const tz = `${sign}${hours}:${minutes}`;
		return this.internal.toISOString().slice(0, -1) + tz;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		const [day, date, month, year] = this.internal.toUTCString().split(" ");
		return `${day?.slice(0, -1)} ${month} ${date} ${year}`;
	}
	toTimeString() {
		const time = this.internal.toUTCString().split(" ")[4];
		const [sign, hours, minutes] = this.tzComponents();
		return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
	}
	toLocaleString(locales, options) {
		return Date.prototype.toLocaleString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(locales, options) {
		return Date.prototype.toLocaleDateString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(locales, options) {
		return Date.prototype.toLocaleTimeString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		const offset = this.getTimezoneOffset();
		return [
			offset > 0 ? "-" : "+",
			String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0"),
			String(Math.abs(offset) % 60).padStart(2, "0")
		];
	}
	withTimeZone(timeZone) {
		return new TZDate(+this, timeZone);
	}
	[Symbol.for("constructDateFrom")](date) {
		return new TZDate(+new Date(date), this.timeZone);
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var FIVE_WEEKS = 5;
var FOUR_WEEKS = 4;
/**
* Returns the number of weeks to display in the broadcast calendar for a given
* month.
*
* The broadcast calendar may have either 4 or 5 weeks in a month, depending on
* the start and end dates of the broadcast weeks.
*
* @since 9.4.0
* @param month The month for which to calculate the number of weeks.
* @param dateLib The date library to use for date manipulation.
* @returns The number of weeks in the broadcast calendar (4 or 5).
*/
function getBroadcastWeeksInMonth(month, dateLib) {
	const firstDayOfMonth = dateLib.startOfMonth(month);
	const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
	const broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1);
	const lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
	return dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
/**
* Returns the start date of the week in the broadcast calendar.
*
* The broadcast week starts on Monday. If the first day of the month is not a
* Monday, this function calculates the previous Monday as the start of the
* broadcast week.
*
* @since 9.4.0
* @param date The date for which to calculate the start of the broadcast week.
* @param dateLib The date library to use for date manipulation.
* @returns The start date of the broadcast week.
*/
function startOfBroadcastWeek(date, dateLib) {
	const firstOfMonth = dateLib.startOfMonth(date);
	const dayOfWeek = firstOfMonth.getDay();
	if (dayOfWeek === 1) return firstOfMonth;
	else if (dayOfWeek === 0) return dateLib.addDays(firstOfMonth, -6);
	else return dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
/**
* Returns the end date of the week in the broadcast calendar.
*
* The broadcast week ends on the last day of the last broadcast week for the
* given date.
*
* @since 9.4.0
* @param date The date for which to calculate the end of the broadcast week.
* @param dateLib The date library to use for date manipulation.
* @returns The end date of the broadcast week.
*/
function endOfBroadcastWeek(date, dateLib) {
	const startDate = startOfBroadcastWeek(date, dateLib);
	const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
	return dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-US.js
/** English (United States) locale extended with DayPicker-specific translations. */
var enUS = {
	...enUS$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			let label = formatDate(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			return formatDate(date, "LLLL yyyy");
		},
		labelGridcell: (date, modifiers, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			let label = formatDate(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			return formatDate(date, "cccc");
		}
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/classes/DateLib.js
/**
* A wrapper class around [date-fns](http://date-fns.org) that provides utility
* methods for date manipulation and formatting.
*
* @since 9.2.0
* @example
*   const dateLib = new DateLib({ locale: es });
*   const newDate = dateLib.addDays(new Date(), 5);
*/
var DateLib = class DateLib {
	/**
	* Creates an instance of `DateLib`.
	*
	* @param options Configuration options for the date library.
	* @param overrides Custom overrides for the date library functions.
	*/
	constructor(options, overrides) {
		/**
		* Creates a new `Date` object representing today's date.
		*
		* @since 9.5.0
		* @returns A `Date` object for today's date.
		*/
		this.today = () => {
			if (this.overrides?.today) return this.overrides.today();
			if (this.options.timeZone) return TZDate.tz(this.options.timeZone);
			return new (this.options.Date ?? Date)();
		};
		/**
		* Creates a new `Date` object with the specified year, month, and day.
		*
		* @since 9.5.0
		* @param year The year.
		* @param monthIndex The month (0-11).
		* @param date The day of the month.
		* @returns A new `Date` object.
		*/
		this.newDate = (year, monthIndex, date) => {
			if (this.overrides?.newDate) return this.overrides.newDate(year, monthIndex, date);
			if (this.options.timeZone) return new TZDate(year, monthIndex, date, this.options.timeZone);
			return new Date(year, monthIndex, date);
		};
		/**
		* Adds the specified number of days to the given date.
		*
		* @param date The date to add days to.
		* @param amount The number of days to add.
		* @returns The new date with the days added.
		*/
		this.addDays = (date, amount) => {
			return this.overrides?.addDays ? this.overrides.addDays(date, amount) : addDays(date, amount);
		};
		/**
		* Adds the specified number of months to the given date.
		*
		* @param date The date to add months to.
		* @param amount The number of months to add.
		* @returns The new date with the months added.
		*/
		this.addMonths = (date, amount) => {
			return this.overrides?.addMonths ? this.overrides.addMonths(date, amount) : addMonths(date, amount);
		};
		/**
		* Adds the specified number of weeks to the given date.
		*
		* @param date The date to add weeks to.
		* @param amount The number of weeks to add.
		* @returns The new date with the weeks added.
		*/
		this.addWeeks = (date, amount) => {
			return this.overrides?.addWeeks ? this.overrides.addWeeks(date, amount) : addWeeks(date, amount);
		};
		/**
		* Adds the specified number of years to the given date.
		*
		* @param date The date to add years to.
		* @param amount The number of years to add.
		* @returns The new date with the years added.
		*/
		this.addYears = (date, amount) => {
			return this.overrides?.addYears ? this.overrides.addYears(date, amount) : addYears(date, amount);
		};
		/**
		* Returns the number of calendar days between the given dates.
		*
		* @param dateLeft The later date.
		* @param dateRight The earlier date.
		* @returns The number of calendar days between the dates.
		*/
		this.differenceInCalendarDays = (dateLeft, dateRight) => {
			return this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : differenceInCalendarDays(dateLeft, dateRight);
		};
		/**
		* Returns the number of calendar months between the given dates.
		*
		* @param dateLeft The later date.
		* @param dateRight The earlier date.
		* @returns The number of calendar months between the dates.
		*/
		this.differenceInCalendarMonths = (dateLeft, dateRight) => {
			return this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : differenceInCalendarMonths(dateLeft, dateRight);
		};
		/**
		* Returns the months between the given dates.
		*
		* @param interval The interval to get the months for.
		*/
		this.eachMonthOfInterval = (interval) => {
			return this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(interval) : eachMonthOfInterval(interval);
		};
		/**
		* Returns the years between the given dates.
		*
		* @since 9.11.1
		* @param interval The interval to get the years for.
		* @returns The array of years in the interval.
		*/
		this.eachYearOfInterval = (interval) => {
			const years = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(interval) : eachYearOfInterval(interval);
			const uniqueYears = new Set(years.map((d) => this.getYear(d)));
			if (uniqueYears.size === years.length) return years;
			const yearsArray = [];
			uniqueYears.forEach((y) => {
				yearsArray.push(new Date(y, 0, 1));
			});
			return yearsArray;
		};
		/**
		* Returns the end of the broadcast week for the given date.
		*
		* @param date The original date.
		* @returns The end of the broadcast week.
		*/
		this.endOfBroadcastWeek = (date) => {
			return this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this);
		};
		/**
		* Returns the end of the ISO week for the given date.
		*
		* @param date The original date.
		* @returns The end of the ISO week.
		*/
		this.endOfISOWeek = (date) => {
			return this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(date) : endOfISOWeek(date);
		};
		/**
		* Returns the end of the month for the given date.
		*
		* @param date The original date.
		* @returns The end of the month.
		*/
		this.endOfMonth = (date) => {
			return this.overrides?.endOfMonth ? this.overrides.endOfMonth(date) : endOfMonth(date);
		};
		/**
		* Returns the end of the week for the given date.
		*
		* @param date The original date.
		* @returns The end of the week.
		*/
		this.endOfWeek = (date, options) => {
			return this.overrides?.endOfWeek ? this.overrides.endOfWeek(date, options) : endOfWeek(date, this.options);
		};
		/**
		* Returns the end of the year for the given date.
		*
		* @param date The original date.
		* @returns The end of the year.
		*/
		this.endOfYear = (date) => {
			return this.overrides?.endOfYear ? this.overrides.endOfYear(date) : endOfYear(date);
		};
		/**
		* Formats the given date using the specified format string.
		*
		* @param date The date to format.
		* @param formatStr The format string.
		* @returns The formatted date string.
		*/
		this.format = (date, formatStr, _options) => {
			const formatted = this.overrides?.format ? this.overrides.format(date, formatStr, this.options) : format(date, formatStr, this.options);
			if (this.options.numerals && this.options.numerals !== "latn") return this.replaceDigits(formatted);
			return formatted;
		};
		/**
		* Returns the ISO week number for the given date.
		*
		* @param date The date to get the ISO week number for.
		* @returns The ISO week number.
		*/
		this.getISOWeek = (date) => {
			return this.overrides?.getISOWeek ? this.overrides.getISOWeek(date) : getISOWeek(date);
		};
		/**
		* Returns the month of the given date.
		*
		* @param date The date to get the month for.
		* @returns The month.
		*/
		this.getMonth = (date, _options) => {
			return this.overrides?.getMonth ? this.overrides.getMonth(date, this.options) : getMonth(date, this.options);
		};
		/**
		* Returns the year of the given date.
		*
		* @param date The date to get the year for.
		* @returns The year.
		*/
		this.getYear = (date, _options) => {
			return this.overrides?.getYear ? this.overrides.getYear(date, this.options) : getYear(date, this.options);
		};
		/**
		* Returns the local week number for the given date.
		*
		* @param date The date to get the week number for.
		* @returns The week number.
		*/
		this.getWeek = (date, _options) => {
			return this.overrides?.getWeek ? this.overrides.getWeek(date, this.options) : getWeek(date, this.options);
		};
		/**
		* Checks if the first date is after the second date.
		*
		* @param date The date to compare.
		* @param dateToCompare The date to compare with.
		* @returns True if the first date is after the second date.
		*/
		this.isAfter = (date, dateToCompare) => {
			return this.overrides?.isAfter ? this.overrides.isAfter(date, dateToCompare) : isAfter(date, dateToCompare);
		};
		/**
		* Checks if the first date is before the second date.
		*
		* @param date The date to compare.
		* @param dateToCompare The date to compare with.
		* @returns True if the first date is before the second date.
		*/
		this.isBefore = (date, dateToCompare) => {
			return this.overrides?.isBefore ? this.overrides.isBefore(date, dateToCompare) : isBefore(date, dateToCompare);
		};
		/**
		* Checks if the given value is a Date object.
		*
		* @param value The value to check.
		* @returns True if the value is a Date object.
		*/
		this.isDate = (value) => {
			return this.overrides?.isDate ? this.overrides.isDate(value) : isDate(value);
		};
		/**
		* Checks if the given dates are on the same day.
		*
		* @param dateLeft The first date to compare.
		* @param dateRight The second date to compare.
		* @returns True if the dates are on the same day.
		*/
		this.isSameDay = (dateLeft, dateRight) => {
			return this.overrides?.isSameDay ? this.overrides.isSameDay(dateLeft, dateRight) : isSameDay(dateLeft, dateRight);
		};
		/**
		* Checks if the given dates are in the same month.
		*
		* @param dateLeft The first date to compare.
		* @param dateRight The second date to compare.
		* @returns True if the dates are in the same month.
		*/
		this.isSameMonth = (dateLeft, dateRight) => {
			return this.overrides?.isSameMonth ? this.overrides.isSameMonth(dateLeft, dateRight) : isSameMonth(dateLeft, dateRight);
		};
		/**
		* Checks if the given dates are in the same year.
		*
		* @param dateLeft The first date to compare.
		* @param dateRight The second date to compare.
		* @returns True if the dates are in the same year.
		*/
		this.isSameYear = (dateLeft, dateRight) => {
			return this.overrides?.isSameYear ? this.overrides.isSameYear(dateLeft, dateRight) : isSameYear(dateLeft, dateRight);
		};
		/**
		* Returns the latest date in the given array of dates.
		*
		* @param dates The array of dates to compare.
		* @returns The latest date.
		*/
		this.max = (dates) => {
			return this.overrides?.max ? this.overrides.max(dates) : max(dates);
		};
		/**
		* Returns the earliest date in the given array of dates.
		*
		* @param dates The array of dates to compare.
		* @returns The earliest date.
		*/
		this.min = (dates) => {
			return this.overrides?.min ? this.overrides.min(dates) : min(dates);
		};
		/**
		* Sets the month of the given date.
		*
		* @param date The date to set the month on.
		* @param month The month to set (0-11).
		* @returns The new date with the month set.
		*/
		this.setMonth = (date, month) => {
			return this.overrides?.setMonth ? this.overrides.setMonth(date, month) : setMonth(date, month);
		};
		/**
		* Sets the year of the given date.
		*
		* @param date The date to set the year on.
		* @param year The year to set.
		* @returns The new date with the year set.
		*/
		this.setYear = (date, year) => {
			return this.overrides?.setYear ? this.overrides.setYear(date, year) : setYear(date, year);
		};
		/**
		* Returns the start of the broadcast week for the given date.
		*
		* @param date The original date.
		* @returns The start of the broadcast week.
		*/
		this.startOfBroadcastWeek = (date, _dateLib) => {
			return this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this);
		};
		/**
		* Returns the start of the day for the given date.
		*
		* @param date The original date.
		* @returns The start of the day.
		*/
		this.startOfDay = (date) => {
			return this.overrides?.startOfDay ? this.overrides.startOfDay(date) : startOfDay(date);
		};
		/**
		* Returns the start of the ISO week for the given date.
		*
		* @param date The original date.
		* @returns The start of the ISO week.
		*/
		this.startOfISOWeek = (date) => {
			return this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(date) : startOfISOWeek(date);
		};
		/**
		* Returns the start of the month for the given date.
		*
		* @param date The original date.
		* @returns The start of the month.
		*/
		this.startOfMonth = (date) => {
			return this.overrides?.startOfMonth ? this.overrides.startOfMonth(date) : startOfMonth(date);
		};
		/**
		* Returns the start of the week for the given date.
		*
		* @param date The original date.
		* @returns The start of the week.
		*/
		this.startOfWeek = (date, _options) => {
			return this.overrides?.startOfWeek ? this.overrides.startOfWeek(date, this.options) : startOfWeek(date, this.options);
		};
		/**
		* Returns the start of the year for the given date.
		*
		* @param date The original date.
		* @returns The start of the year.
		*/
		this.startOfYear = (date) => {
			return this.overrides?.startOfYear ? this.overrides.startOfYear(date) : startOfYear(date);
		};
		this.options = {
			locale: enUS,
			...options
		};
		this.overrides = overrides;
	}
	/**
	* Generates a mapping of Arabic digits (0-9) to the target numbering system
	* digits.
	*
	* @since 9.5.0
	* @returns A record mapping Arabic digits to the target numerals.
	*/
	getDigitMap() {
		const { numerals = "latn" } = this.options;
		const formatter = new Intl.NumberFormat("en-US", { numberingSystem: numerals });
		const digitMap = {};
		for (let i = 0; i < 10; i++) digitMap[i.toString()] = formatter.format(i);
		return digitMap;
	}
	/**
	* Replaces Arabic digits in a string with the target numbering system digits.
	*
	* @since 9.5.0
	* @param input The string containing Arabic digits.
	* @returns The string with digits replaced.
	*/
	replaceDigits(input) {
		const digitMap = this.getDigitMap();
		return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
	}
	/**
	* Formats a number using the configured numbering system.
	*
	* @since 9.5.0
	* @param value The number to format.
	* @returns The formatted number as a string.
	*/
	formatNumber(value) {
		return this.replaceDigits(value.toString());
	}
	/**
	* Returns the preferred ordering for month and year labels for the current
	* locale.
	*/
	getMonthYearOrder() {
		const code = this.options.locale?.code;
		if (!code) return "month-first";
		return DateLib.yearFirstLocales.has(code) ? "year-first" : "month-first";
	}
	/**
	* Formats the month/year pair respecting locale conventions.
	*
	* @since 9.11.0
	*/
	formatMonthYear(date) {
		const { locale, timeZone, numerals } = this.options;
		const localeCode = locale?.code;
		if (localeCode && DateLib.yearFirstLocales.has(localeCode)) try {
			return new Intl.DateTimeFormat(localeCode, {
				month: "long",
				year: "numeric",
				timeZone,
				numberingSystem: numerals
			}).format(date);
		} catch {}
		const pattern = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(date, pattern);
	}
};
DateLib.yearFirstLocales = new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
/**
* The default date library with English locale.
*
* @since 9.2.0
*/
var defaultDateLib = new DateLib();
//#endregion
export { TZDate as i, defaultDateLib as n, enUS as r, DateLib as t };

//# sourceMappingURL=DateLib-jsZfzBRh.js.map