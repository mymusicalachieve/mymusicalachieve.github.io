import { r as enUS, t as DateLib } from "./DateLib-jsZfzBRh.js";
import { $ as he$1, A as mt$1, At as bg$1, B as kk$1, Bt as af$1, C as pt$1, Ct as da$1, D as nlBE$1, Dt as ca$1, E as nn$1, Et as ckb$1, F as lt$1, Ft as arSA$1, G as it$1, H as jaHira$1, I as lb$1, It as arMA$1, J as hy$1, K as is$1, L as ko$1, Lt as arEG$1, M as mn$1, Mt as be$1, N as mk$1, Nt as az$1, O as nl$1, Ot as bs$1, P as lv$1, Pt as arTN$1, Q as hi$1, R as kn$1, Rt as arDZ$1, S as ptBR$1, St as de$1, T as oc$1, Tt as cs$1, U as ja$1, V as ka$1, W as itCH$1, X as ht$1, Y as hu$1, Z as hr$1, _ as sl$1, _t as enGB$1, a as uzCyrl$1, at as frCA$1, b as ru$1, bt as el$1, c as ug$1, ct as faIR$1, d as te$1, dt as es$1, et as gu$1, f as ta$1, ft as eo$1, g as sq$1, gt as enIE$1, h as sr$1, ht as enIN$1, i as vi$1, it as frCH$1, j as ms$1, jt as beTarask$1, k as nb$1, kt as bn$1, l as tr$1, lt as eu$1, m as srLatn$1, mt as enNZ$1, n as zhHK$1, nt as gd$1, o as uz$1, ot as fr$1, p as sv$1, pt as enZA$1, q as id$1, r as zhCN$1, rt as fy$1, s as uk$1, st as fi$1, t as zhTW$1, tt as gl$1, u as th$1, ut as et$1, v as sk$1, vt as enCA$1, w as pl$1, wt as cy$1, x as ro$1, xt as deAT$1, y as se$1, yt as enAU$1, z as km$1, zt as ar$1 } from "./locale-CrMkr7iU.js";
//#region node_modules/react-day-picker/dist/esm/locale/af.js
/** Afrikaans locale extended with DayPicker-specific translations. */
var af = {
	...af$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Vandag, ${label}`;
			if (modifiers.selected) label = `${label}, gekies`;
			return label;
		},
		labelMonthDropdown: "Kies die maand",
		labelNext: "Gaan na volgende maand",
		labelPrevious: "Gaan na vorige maand",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Kies die jaar",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Vandag, ${label}`;
			return label;
		},
		labelNav: "Navigasiebalk",
		labelWeekNumberHeader: "Weeknommer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ar.js
/** Arabic locale extended with DayPicker-specific translations. */
var ar = {
	...ar$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `اليوم، ${label}`;
			if (modifiers.selected) label = `${label}، محدد`;
			return label;
		},
		labelMonthDropdown: "اختر الشهر",
		labelNext: "اذهب إلى الشهر التالي",
		labelPrevious: "اذهب إلى الشهر السابق",
		labelWeekNumber: (weekNumber) => `الأسبوع ${weekNumber}`,
		labelYearDropdown: "اختر السنة",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `اليوم، ${label}`;
			return label;
		},
		labelNav: "شريط التنقل",
		labelWeekNumberHeader: "رقم الأسبوع",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ar-DZ.js
/** Arabic (Algeria) locale extended with DayPicker-specific translations. */
var arDZ = {
	...arDZ$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `اليوم، ${label}`;
			if (modifiers.selected) label = `${label}، محدد`;
			return label;
		},
		labelMonthDropdown: "اختر الشهر",
		labelNext: "اذهب إلى الشهر التالي",
		labelPrevious: "اذهب إلى الشهر السابق",
		labelWeekNumber: (weekNumber) => `الأسبوع ${weekNumber}`,
		labelYearDropdown: "اختر السنة",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `اليوم، ${label}`;
			return label;
		},
		labelNav: "شريط التنقل",
		labelWeekNumberHeader: "رقم الأسبوع",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ar-EG.js
/** Arabic (Egypt) locale extended with DayPicker-specific translations. */
var arEG = {
	...arEG$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `اليوم، ${label}`;
			if (modifiers.selected) label = `${label}، محدد`;
			return label;
		},
		labelMonthDropdown: "اختر الشهر",
		labelNext: "اذهب إلى الشهر التالي",
		labelPrevious: "اذهب إلى الشهر السابق",
		labelWeekNumber: (weekNumber) => `الأسبوع ${weekNumber}`,
		labelYearDropdown: "اختر السنة",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `اليوم، ${label}`;
			return label;
		},
		labelNav: "شريط التنقل",
		labelWeekNumberHeader: "رقم الأسبوع",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ar-MA.js
/** Arabic (Morocco) locale extended with DayPicker-specific translations. */
var arMA = {
	...arMA$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `اليوم، ${label}`;
			if (modifiers.selected) label = `${label}، محدد`;
			return label;
		},
		labelMonthDropdown: "اختر الشهر",
		labelNext: "اذهب إلى الشهر التالي",
		labelPrevious: "اذهب إلى الشهر السابق",
		labelWeekNumber: (weekNumber) => `الأسبوع ${weekNumber}`,
		labelYearDropdown: "اختر السنة",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `اليوم، ${label}`;
			return label;
		},
		labelNav: "شريط التنقل",
		labelWeekNumberHeader: "رقم الأسبوع",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ar-SA.js
/** Arabic (Saudi Arabia) locale extended with DayPicker-specific translations. */
var arSA = {
	...arSA$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `اليوم، ${label}`;
			if (modifiers.selected) label = `${label}، محدد`;
			return label;
		},
		labelMonthDropdown: "اختر الشهر",
		labelNext: "اذهب إلى الشهر التالي",
		labelPrevious: "اذهب إلى الشهر السابق",
		labelWeekNumber: (weekNumber) => `الأسبوع ${weekNumber}`,
		labelYearDropdown: "اختر السنة",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `اليوم، ${label}`;
			return label;
		},
		labelNav: "شريط التنقل",
		labelWeekNumberHeader: "رقم الأسبوع",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ar-TN.js
/** Arabic (Tunisia) locale extended with DayPicker-specific translations. */
var arTN = {
	...arTN$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `اليوم، ${label}`;
			if (modifiers.selected) label = `${label}، محدد`;
			return label;
		},
		labelMonthDropdown: "اختر الشهر",
		labelNext: "اذهب إلى الشهر التالي",
		labelPrevious: "اذهب إلى الشهر السابق",
		labelWeekNumber: (weekNumber) => `الأسبوع ${weekNumber}`,
		labelYearDropdown: "اختر السنة",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `اليوم، ${label}`;
			return label;
		},
		labelNav: "شريط التنقل",
		labelWeekNumberHeader: "رقم الأسبوع",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/az.js
/** Azerbaijani locale extended with DayPicker-specific translations. */
var az = {
	...az$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Bu gün, ${label}`;
			if (modifiers.selected) label = `${label}, seçilmiş`;
			return label;
		},
		labelMonthDropdown: "Ayı seçin",
		labelNext: "Növbəti aya keç",
		labelPrevious: "Əvvəlki aya keç",
		labelWeekNumber: (weekNumber) => `Həftə ${weekNumber}`,
		labelYearDropdown: "İli seçin",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Bu gün, ${label}`;
			return label;
		},
		labelNav: "Naviqasiya paneli",
		labelWeekNumberHeader: "Həftə nömrəsi",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/be.js
/** Belarusian locale extended with DayPicker-specific translations. */
var be = {
	...be$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Сёння, ${label}`;
			if (modifiers.selected) label = `${label}, абрана`;
			return label;
		},
		labelMonthDropdown: "Абярыце месяц",
		labelNext: "Перайсці да наступнага месяца",
		labelPrevious: "Перайсці да папярэдняга месяца",
		labelWeekNumber: (weekNumber) => `Тыдзень ${weekNumber}`,
		labelYearDropdown: "Абярыце год",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Сёння, ${label}`;
			return label;
		},
		labelNav: "Панэль навігацыі",
		labelWeekNumberHeader: "Нумар тыдня",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/be-tarask.js
/**
* Belarusian (Taraskievica) locale extended with DayPicker-specific
* translations.
*/
var beTarask = {
	...beTarask$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Сёньня, ${label}`;
			if (modifiers.selected) label = `${label}, абрана`;
			return label;
		},
		labelMonthDropdown: "Выберыце месяц",
		labelNext: "Перайсьці да наступнага месяца",
		labelPrevious: "Перайсьці да папярэдняга месяца",
		labelWeekNumber: (weekNumber) => `Тыдзень ${weekNumber}`,
		labelYearDropdown: "Выберыце год",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Сёньня, ${label}`;
			return label;
		},
		labelNav: "Панэль навігацыі",
		labelWeekNumberHeader: "Нумар тыдня",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/bg.js
/** Bulgarian locale extended with DayPicker-specific translations. */
var bg = {
	...bg$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Днес, ${label}`;
			if (modifiers.selected) label = `${label}, избрано`;
			return label;
		},
		labelMonthDropdown: "Изберете месец",
		labelNext: "Към следващия месец",
		labelPrevious: "Към предишния месец",
		labelWeekNumber: (weekNumber) => `Седмица ${weekNumber}`,
		labelYearDropdown: "Изберете година",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Днес, ${label}`;
			return label;
		},
		labelNav: "Лента за навигация",
		labelWeekNumberHeader: "Номер на седмица",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/bn.js
/** Bengali locale extended with DayPicker-specific translations. */
var bn = {
	...bn$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `আজ, ${label}`;
			if (modifiers.selected) label = `${label}, নির্বাচিত`;
			return label;
		},
		labelMonthDropdown: "মাস নির্বাচন করুন",
		labelNext: "পরবর্তী মাসে যান",
		labelPrevious: "পূর্ববর্তী মাসে যান",
		labelWeekNumber: (weekNumber) => `সপ্তাহ ${weekNumber}`,
		labelYearDropdown: "বছর নির্বাচন করুন",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `আজ, ${label}`;
			return label;
		},
		labelNav: "নেভিগেশন বার",
		labelWeekNumberHeader: "সপ্তাহ নম্বর",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/bs.js
/** Bosnian locale extended with DayPicker-specific translations. */
var bs = {
	...bs$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Danas, ${label}`;
			if (modifiers.selected) label = `${label}, odabrano`;
			return label;
		},
		labelMonthDropdown: "Odaberite mjesec",
		labelNext: "Idi na sljedeći mjesec",
		labelPrevious: "Idi na prethodni mjesec",
		labelWeekNumber: (weekNumber) => `Sedmica ${weekNumber}`,
		labelYearDropdown: "Odaberite godinu",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Danas, ${label}`;
			return label;
		},
		labelNav: "Navigacijska traka",
		labelWeekNumberHeader: "Broj sedmice",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ca.js
/** Catalan locale extended with DayPicker-specific translations. */
var ca = {
	...ca$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Avui, ${label}`;
			if (modifiers.selected) label = `${label}, seleccionat`;
			return label;
		},
		labelMonthDropdown: "Tria el mes",
		labelNext: "Ves al mes següent",
		labelPrevious: "Ves al mes anterior",
		labelWeekNumber: (weekNumber) => `Setmana ${weekNumber}`,
		labelYearDropdown: "Tria l'any",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Avui, ${label}`;
			return label;
		},
		labelNav: "Barra de navegació",
		labelWeekNumberHeader: "Número de setmana",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ckb.js
/**
* Central Kurdish (Sorani) locale extended with DayPicker-specific
* translations.
*/
var ckb = {
	...ckb$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `ئەمڕۆ، ${label}`;
			if (modifiers.selected) label = `${label}، هەڵبژێرا`;
			return label;
		},
		labelMonthDropdown: "مانگ هەڵبژێرە",
		labelNext: "بڕۆ بۆ مانگی داهاتوو",
		labelPrevious: "بڕۆ بۆ مانگی پێشوو",
		labelWeekNumber: (weekNumber) => `هەفتە ${weekNumber}`,
		labelYearDropdown: "ساڵ هەڵبژێرە",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `ئەمڕۆ، ${label}`;
			return label;
		},
		labelNav: "شریتی ڕاڕەوێژ",
		labelWeekNumberHeader: "ژمارەی هەفتە",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/cs.js
/** Czech locale extended with DayPicker-specific translations. */
var cs = {
	...cs$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Dnes, ${label}`;
			if (modifiers.selected) label = `${label}, vybráno`;
			return label;
		},
		labelMonthDropdown: "Vyberte měsíc",
		labelNext: "Přejít na další měsíc",
		labelPrevious: "Přejít na předchozí měsíc",
		labelWeekNumber: (weekNumber) => `Týden ${weekNumber}`,
		labelYearDropdown: "Vyberte rok",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Dnes, ${label}`;
			return label;
		},
		labelNav: "Navigační panel",
		labelWeekNumberHeader: "Číslo týdne",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/cy.js
/** Welsh locale extended with DayPicker-specific translations. */
var cy = {
	...cy$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Heddiw, ${label}`;
			if (modifiers.selected) label = `${label}, wedi'i ddewis`;
			return label;
		},
		labelMonthDropdown: "Dewiswch y mis",
		labelNext: "Ewch i'r mis nesaf",
		labelPrevious: "Ewch i'r mis blaenorol",
		labelWeekNumber: (weekNumber) => `Wythnos ${weekNumber}`,
		labelYearDropdown: "Dewiswch y flwyddyn",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Heddiw, ${label}`;
			return label;
		},
		labelNav: "Bar llywio",
		labelWeekNumberHeader: "Rhif yr wythnos",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/da.js
/** Danish locale extended with DayPicker-specific translations. */
var da = {
	...da$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `I dag, ${label}`;
			if (modifiers.selected) label = `${label}, valgt`;
			return label;
		},
		labelMonthDropdown: "Vælg måned",
		labelNext: "Gå til næste måned",
		labelPrevious: "Gå til forrige måned",
		labelWeekNumber: (weekNumber) => `Uge ${weekNumber}`,
		labelYearDropdown: "Vælg år",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `I dag, ${label}`;
			return label;
		},
		labelNav: "Navigationslinje",
		labelWeekNumberHeader: "Ugenummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/de.js
/** German locale extended with DayPicker-specific translations. */
var de = {
	...de$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Heute, ${label}`;
			if (modifiers.selected) label = `${label}, ausgewählt`;
			return label;
		},
		labelMonthDropdown: "Monat auswählen",
		labelNext: "Zum nächsten Monat",
		labelPrevious: "Zum vorherigen Monat",
		labelWeekNumber: (weekNumber) => `Woche ${weekNumber}`,
		labelYearDropdown: "Jahr auswählen",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Heute, ${label}`;
			return label;
		},
		labelNav: "Navigationsleiste",
		labelWeekNumberHeader: "Wochennummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/de-AT.js
/** German (Austria) locale extended with DayPicker-specific translations. */
var deAT = {
	...deAT$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Heute, ${label}`;
			if (modifiers.selected) label = `${label}, ausgewählt`;
			return label;
		},
		labelMonthDropdown: "Monat auswählen",
		labelNext: "Zum nächsten Monat",
		labelPrevious: "Zum vorherigen Monat",
		labelWeekNumber: (weekNumber) => `Woche ${weekNumber}`,
		labelYearDropdown: "Jahr auswählen",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Heute, ${label}`;
			return label;
		},
		labelNav: "Navigationsleiste",
		labelWeekNumberHeader: "Wochennummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/el.js
/** Greek locale extended with DayPicker-specific translations. */
var el = {
	...el$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Σήμερα, ${label}`;
			if (modifiers.selected) label = `${label}, επιλεγμένο`;
			return label;
		},
		labelMonthDropdown: "Επιλέξτε μήνα",
		labelNext: "Μετάβαση στον επόμενο μήνα",
		labelPrevious: "Μετάβαση στον προηγούμενο μήνα",
		labelWeekNumber: (weekNumber) => `Εβδομάδα ${weekNumber}`,
		labelYearDropdown: "Επιλέξτε έτος",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Σήμερα, ${label}`;
			return label;
		},
		labelNav: "Γραμμή πλοήγησης",
		labelWeekNumberHeader: "Αριθμός εβδομάδας",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-AU.js
/** English (Australia) locale extended with DayPicker-specific translations. */
var enAU = {
	...enAU$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-CA.js
/** English (Canada) locale extended with DayPicker-specific translations. */
var enCA = {
	...enCA$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-GB.js
/**
* English (United Kingdom) locale extended with DayPicker-specific
* translations.
*/
var enGB = {
	...enGB$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-IE.js
/** English (Ireland) locale extended with DayPicker-specific translations. */
var enIE = {
	...enIE$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-IN.js
/** English (India) locale extended with DayPicker-specific translations. */
var enIN = {
	...enIN$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-NZ.js
/** English (New Zealand) locale extended with DayPicker-specific translations. */
var enNZ = {
	...enNZ$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-ZA.js
/** English (South Africa) locale extended with DayPicker-specific translations. */
var enZA = {
	...enZA$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/eo.js
/** Esperanto locale extended with DayPicker-specific translations. */
var eo = {
	...eo$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hodiaŭ, ${label}`;
			if (modifiers.selected) label = `${label}, elektita`;
			return label;
		},
		labelMonthDropdown: "Elektu la monaton",
		labelNext: "Iru al la sekva monato",
		labelPrevious: "Iru al la antaŭa monato",
		labelWeekNumber: (weekNumber) => `Semajno ${weekNumber}`,
		labelYearDropdown: "Elektu la jaron",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hodiaŭ, ${label}`;
			return label;
		},
		labelNav: "Naviga breto",
		labelWeekNumberHeader: "Semajna numero",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/es.js
/** Spanish locale extended with DayPicker-specific translations. */
var es = {
	...es$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hoy, ${label}`;
			if (modifiers.selected) label = `${label}, seleccionado`;
			return label;
		},
		labelMonthDropdown: "Elegir el mes",
		labelNext: "Ir al mes siguiente",
		labelPrevious: "Ir al mes anterior",
		labelWeekNumber: (weekNumber) => `Semana ${weekNumber}`,
		labelYearDropdown: "Elegir el año",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hoy, ${label}`;
			return label;
		},
		labelNav: "Barra de navegación",
		labelWeekNumberHeader: "Número de semana",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/et.js
/** Estonian locale extended with DayPicker-specific translations. */
var et = {
	...et$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Täna, ${label}`;
			if (modifiers.selected) label = `${label}, valitud`;
			return label;
		},
		labelMonthDropdown: "Vali kuu",
		labelNext: "Mine järgmisele kuule",
		labelPrevious: "Mine eelmisele kuule",
		labelWeekNumber: (weekNumber) => `Nädal ${weekNumber}`,
		labelYearDropdown: "Vali aasta",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Täna, ${label}`;
			return label;
		},
		labelNav: "Navigeerimisriba",
		labelWeekNumberHeader: "Nädala number",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/eu.js
/** Basque locale extended with DayPicker-specific translations. */
var eu = {
	...eu$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Gaur, ${label}`;
			if (modifiers.selected) label = `${label}, hautatua`;
			return label;
		},
		labelMonthDropdown: "Hautatu hilabetea",
		labelNext: "Joan hurrengo hilabetera",
		labelPrevious: "Joan aurreko hilabetera",
		labelWeekNumber: (weekNumber) => `Astea ${weekNumber}`,
		labelYearDropdown: "Hautatu urtea",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Gaur, ${label}`;
			return label;
		},
		labelNav: "Nabigazio barra",
		labelWeekNumberHeader: "Aste zenbakia",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/fa-IR.js
/** Persian (Iran) locale extended with DayPicker-specific translations. */
var faIR = {
	...faIR$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `امروز، ${label}`;
			if (modifiers.selected) label = `${label}، انتخاب شده`;
			return label;
		},
		labelMonthDropdown: "ماه را انتخاب کنید",
		labelNext: "رفتن به ماه بعد",
		labelPrevious: "رفتن به ماه قبل",
		labelWeekNumber: (weekNumber) => `هفته ${weekNumber}`,
		labelYearDropdown: "سال را انتخاب کنید",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `امروز، ${label}`;
			return label;
		},
		labelNav: "نوار ناوبری",
		labelWeekNumberHeader: "شماره هفته",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/fi.js
/** Finnish locale extended with DayPicker-specific translations. */
var fi = {
	...fi$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Tänään, ${label}`;
			if (modifiers.selected) label = `${label}, valittu`;
			return label;
		},
		labelMonthDropdown: "Valitse kuukausi",
		labelNext: "Siirry seuraavaan kuukauteen",
		labelPrevious: "Siirry edelliseen kuukauteen",
		labelWeekNumber: (weekNumber) => `Viikko ${weekNumber}`,
		labelYearDropdown: "Valitse vuosi",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Tänään, ${label}`;
			return label;
		},
		labelNav: "Navigointipalkki",
		labelWeekNumberHeader: "Viikkonumero",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/fr.js
/** French locale extended with DayPicker-specific translations. */
var fr = {
	...fr$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Aujourd'hui, ${label}`;
			if (modifiers.selected) label = `${label}, sélectionné`;
			return label;
		},
		labelMonthDropdown: "Choisir le mois",
		labelNext: "Aller au mois suivant",
		labelPrevious: "Aller au mois précédent",
		labelWeekNumber: (weekNumber) => `Semaine ${weekNumber}`,
		labelYearDropdown: "Choisir l'année",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Aujourd'hui, ${label}`;
			return label;
		},
		labelNav: "Barre de navigation",
		labelWeekNumberHeader: "Numéro de semaine",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/fr-CA.js
/** French (Canada) locale extended with DayPicker-specific translations. */
var frCA = {
	...frCA$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Aujourd'hui, ${label}`;
			if (modifiers.selected) label = `${label}, sélectionné`;
			return label;
		},
		labelMonthDropdown: "Choisir le mois",
		labelNext: "Aller au mois suivant",
		labelPrevious: "Aller au mois précédent",
		labelWeekNumber: (weekNumber) => `Semaine ${weekNumber}`,
		labelYearDropdown: "Choisir l'année",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Aujourd'hui, ${label}`;
			return label;
		},
		labelNav: "Barre de navigation",
		labelWeekNumberHeader: "Numéro de semaine",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/fr-CH.js
/** French (Switzerland) locale extended with DayPicker-specific translations. */
var frCH = {
	...frCH$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Aujourd'hui, ${label}`;
			if (modifiers.selected) label = `${label}, sélectionné`;
			return label;
		},
		labelMonthDropdown: "Choisir le mois",
		labelNext: "Aller au mois suivant",
		labelPrevious: "Aller au mois précédent",
		labelWeekNumber: (weekNumber) => `Semaine ${weekNumber}`,
		labelYearDropdown: "Choisir l'année",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Aujourd'hui, ${label}`;
			return label;
		},
		labelNav: "Barre de navigation",
		labelWeekNumberHeader: "Numéro de semaine",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/fy.js
/** Frisian locale extended with DayPicker-specific translations. */
var fy = {
	...fy$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hjoed, ${label}`;
			if (modifiers.selected) label = `${label}, selektearre`;
			return label;
		},
		labelMonthDropdown: "Kies de moanne",
		labelNext: "Nei folgjende moanne",
		labelPrevious: "Nei foarige moanne",
		labelWeekNumber: (weekNumber) => `Wike ${weekNumber}`,
		labelYearDropdown: "Kies it jier",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hjoed, ${label}`;
			return label;
		},
		labelNav: "Navigaasjebalke",
		labelWeekNumberHeader: "Wikenûmer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/gd.js
/** Scottish Gaelic locale extended with DayPicker-specific translations. */
var gd = {
	...gd$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `An-diugh, ${label}`;
			if (modifiers.selected) label = `${label}, air a thaghadh`;
			return label;
		},
		labelMonthDropdown: "Tagh am mìos",
		labelNext: "Rach gu mìos an ath mhìos",
		labelPrevious: "Rach gu mìos roimhe",
		labelWeekNumber: (weekNumber) => `Seachdain ${weekNumber}`,
		labelYearDropdown: "Tagh am bliadhna",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `An-diugh, ${label}`;
			return label;
		},
		labelNav: "Bàr seòlaidh",
		labelWeekNumberHeader: "Àireamh seachdain",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/gl.js
/** Galician locale extended with DayPicker-specific translations. */
var gl = {
	...gl$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hoxe, ${label}`;
			if (modifiers.selected) label = `${label}, seleccionado`;
			return label;
		},
		labelMonthDropdown: "Escoller o mes",
		labelNext: "Ir ao mes seguinte",
		labelPrevious: "Ir ao mes anterior",
		labelWeekNumber: (weekNumber) => `Semana ${weekNumber}`,
		labelYearDropdown: "Escoller o ano",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hoxe, ${label}`;
			return label;
		},
		labelNav: "Barra de navegación",
		labelWeekNumberHeader: "Número de semana",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/gu.js
/** Gujarati locale extended with DayPicker-specific translations. */
var gu = {
	...gu$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `આજે, ${label}`;
			if (modifiers.selected) label = `${label}, પસંદ કરાયેલ`;
			return label;
		},
		labelMonthDropdown: "મહિનો પસંદ કરો",
		labelNext: "આગલા મહિને જાઓ",
		labelPrevious: "પાછલા મહિને જાઓ",
		labelWeekNumber: (weekNumber) => `અઠવાડિયું ${weekNumber}`,
		labelYearDropdown: "વર્ષ પસંદ કરો",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `આજે, ${label}`;
			return label;
		},
		labelNav: "નેવિગેશન બાર",
		labelWeekNumberHeader: "અઠવાડિયાનો નંબર",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/he.js
/** Hebrew locale extended with DayPicker-specific translations. */
var he = {
	...he$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `היום, ${label}`;
			if (modifiers.selected) label = `${label}, נבחר`;
			return label;
		},
		labelMonthDropdown: "בחר את החודש",
		labelNext: "עבור לחודש הבא",
		labelPrevious: "עבור לחודש הקודם",
		labelWeekNumber: (weekNumber) => `שבוע ${weekNumber}`,
		labelYearDropdown: "בחר את השנה",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `היום, ${label}`;
			return label;
		},
		labelNav: "סרגל ניווט",
		labelWeekNumberHeader: "מספר שבוע",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/hi.js
/** Hindi locale extended with DayPicker-specific translations. */
var hi = {
	...hi$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `आज, ${label}`;
			if (modifiers.selected) label = `${label}, चयनित`;
			return label;
		},
		labelMonthDropdown: "महीना चुनें",
		labelNext: "अगले महीने पर जाएं",
		labelPrevious: "पिछले महीने पर जाएं",
		labelWeekNumber: (weekNumber) => `सप्ताह ${weekNumber}`,
		labelYearDropdown: "वर्ष चुनें",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `आज, ${label}`;
			return label;
		},
		labelNav: "नेविगेशन बार",
		labelWeekNumberHeader: "सप्ताह संख्या",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/hr.js
/** Croatian locale extended with DayPicker-specific translations. */
var hr = {
	...hr$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Danas, ${label}`;
			if (modifiers.selected) label = `${label}, odabrano`;
			return label;
		},
		labelMonthDropdown: "Odaberite mjesec",
		labelNext: "Prijeđi na sljedeći mjesec",
		labelPrevious: "Prijeđi na prethodni mjesec",
		labelWeekNumber: (weekNumber) => `Tjedan ${weekNumber}`,
		labelYearDropdown: "Odaberite godinu",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Danas, ${label}`;
			return label;
		},
		labelNav: "Navigacijska traka",
		labelWeekNumberHeader: "Broj tjedna",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ht.js
/** Haitian Creole locale extended with DayPicker-specific translations. */
var ht = {
	...ht$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Jodi a, ${label}`;
			if (modifiers.selected) label = `${label}, chwazi`;
			return label;
		},
		labelMonthDropdown: "Chwazi mwa a",
		labelNext: "Ale nan pwochen mwa",
		labelPrevious: "Ale nan mwa anvan",
		labelWeekNumber: (weekNumber) => `Semèn ${weekNumber}`,
		labelYearDropdown: "Chwazi ane a",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Jodi a, ${label}`;
			return label;
		},
		labelNav: "Ba navigasyon",
		labelWeekNumberHeader: "Nimewo semèn",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/hu.js
/** Hungarian locale extended with DayPicker-specific translations. */
var hu = {
	...hu$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Ma, ${label}`;
			if (modifiers.selected) label = `${label}, kiválasztva`;
			return label;
		},
		labelMonthDropdown: "Válassza ki a hónapot",
		labelNext: "Ugrás a következő hónapra",
		labelPrevious: "Ugrás az előző hónapra",
		labelWeekNumber: (weekNumber) => `Hét ${weekNumber}`,
		labelYearDropdown: "Válassza ki az évet",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Ma, ${label}`;
			return label;
		},
		labelNav: "Navigációs sáv",
		labelWeekNumberHeader: "Hét száma",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/hy.js
/** Armenian locale extended with DayPicker-specific translations. */
var hy = {
	...hy$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Այսօր, ${label}`;
			if (modifiers.selected) label = `${label}, ընտրված`;
			return label;
		},
		labelMonthDropdown: "Ընտրեք ամիսը",
		labelNext: "Անցնել հաջորդ ամսին",
		labelPrevious: "Անցնել նախորդ ամսին",
		labelWeekNumber: (weekNumber) => `Շաբաթ ${weekNumber}`,
		labelYearDropdown: "Ընտրեք տարին",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Այսօր, ${label}`;
			return label;
		},
		labelNav: "Նավիգացիայի վահանակ",
		labelWeekNumberHeader: "Շաբաթվա համարը",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/id.js
/** Indonesian locale extended with DayPicker-specific translations. */
var id = {
	...id$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hari ini, ${label}`;
			if (modifiers.selected) label = `${label}, dipilih`;
			return label;
		},
		labelMonthDropdown: "Pilih bulan",
		labelNext: "Ke bulan berikutnya",
		labelPrevious: "Ke bulan sebelumnya",
		labelWeekNumber: (weekNumber) => `Minggu ${weekNumber}`,
		labelYearDropdown: "Pilih tahun",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hari ini, ${label}`;
			return label;
		},
		labelNav: "Bilah navigasi",
		labelWeekNumberHeader: "Nomor minggu",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/is.js
/** Icelandic locale extended with DayPicker-specific translations. */
var is = {
	...is$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Í dag, ${label}`;
			if (modifiers.selected) label = `${label}, valið`;
			return label;
		},
		labelMonthDropdown: "Veldu mánuð",
		labelNext: "Farðu í næsta mánuð",
		labelPrevious: "Farðu í fyrri mánuð",
		labelWeekNumber: (weekNumber) => `Vika ${weekNumber}`,
		labelYearDropdown: "Veldu árið",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Í dag, ${label}`;
			return label;
		},
		labelNav: "Leiðarstika",
		labelWeekNumberHeader: "Vikunúmer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/it.js
/** Italian locale extended with DayPicker-specific translations. */
var it = {
	...it$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Oggi, ${label}`;
			if (modifiers.selected) label = `${label}, selezionato`;
			return label;
		},
		labelMonthDropdown: "Scegli il mese",
		labelNext: "Vai al mese successivo",
		labelPrevious: "Vai al mese precedente",
		labelWeekNumber: (weekNumber) => `Settimana ${weekNumber}`,
		labelYearDropdown: "Scegli l’anno",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Oggi, ${label}`;
			return label;
		},
		labelNav: "Barra di navigazione",
		labelWeekNumberHeader: "Numero settimana",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/it-CH.js
/** Italian (Switzerland) locale extended with DayPicker-specific translations. */
var itCH = {
	...itCH$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Oggi, ${label}`;
			if (modifiers.selected) label = `${label}, selezionato`;
			return label;
		},
		labelMonthDropdown: "Scegli il mese",
		labelNext: "Vai al mese successivo",
		labelPrevious: "Vai al mese precedente",
		labelWeekNumber: (weekNumber) => `Settimana ${weekNumber}`,
		labelYearDropdown: "Scegli l'anno",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Oggi, ${label}`;
			return label;
		},
		labelNav: "Barra di navigazione",
		labelWeekNumberHeader: "Numero settimana",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ja.js
/** Japanese locale extended with DayPicker-specific translations. */
var ja = {
	...ja$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `今日、${label}`;
			if (modifiers.selected) label = `${label}、選択済み`;
			return label;
		},
		labelMonthDropdown: "月を選択",
		labelNext: "次の月へ",
		labelPrevious: "前の月へ",
		labelWeekNumber: (weekNumber) => `第${weekNumber}週`,
		labelYearDropdown: "年を選択",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `今日、${label}`;
			return label;
		},
		labelNav: "ナビゲーションバー",
		labelWeekNumberHeader: "週番号",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ja-Hira.js
/** Japanese (Hiragana) locale extended with DayPicker-specific translations. */
var jaHira = {
	...jaHira$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `きょう、${label}`;
			if (modifiers.selected) label = `${label}、せんたくずみ`;
			return label;
		},
		labelMonthDropdown: "つきをえらぶ",
		labelNext: "つぎのつきへ",
		labelPrevious: "まえのつきへ",
		labelWeekNumber: (weekNumber) => `しゅう ${weekNumber}`,
		labelYearDropdown: "としをえらぶ",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `きょう、${label}`;
			return label;
		},
		labelNav: "なびげえしょんばあ",
		labelWeekNumberHeader: "しゅうばんごう",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ka.js
/** Georgian locale extended with DayPicker-specific translations. */
var ka = {
	...ka$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `დღეს, ${label}`;
			if (modifiers.selected) label = `${label}, მონიშნული`;
			return label;
		},
		labelMonthDropdown: "აირჩიეთ თვე",
		labelNext: "გადასვლა შემდეგ თვეზე",
		labelPrevious: "გადასვლა წინა თვეზე",
		labelWeekNumber: (weekNumber) => `კვირა ${weekNumber}`,
		labelYearDropdown: "აირჩიეთ წელი",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `დღეს, ${label}`;
			return label;
		},
		labelNav: "ნავიგაციის ზოლი",
		labelWeekNumberHeader: "კვირის ნომერი",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/kk.js
/** Kazakh locale extended with DayPicker-specific translations. */
var kk = {
	...kk$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Бүгін, ${label}`;
			if (modifiers.selected) label = `${label}, таңдалған`;
			return label;
		},
		labelMonthDropdown: "Айды таңдаңыз",
		labelNext: "Келесі айға өту",
		labelPrevious: "Алдыңғы айға өту",
		labelWeekNumber: (weekNumber) => `Апта ${weekNumber}`,
		labelYearDropdown: "Жылды таңдаңыз",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Бүгін, ${label}`;
			return label;
		},
		labelNav: "Навигация жолағы",
		labelWeekNumberHeader: "Апта нөмірі",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/km.js
/** Khmer locale extended with DayPicker-specific translations. */
var km = {
	...km$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `ថ្ងៃ​នេះ, ${label}`;
			if (modifiers.selected) label = `${label}, បាន​ជ្រើស`;
			return label;
		},
		labelMonthDropdown: "ជ្រើសខែ",
		labelNext: "ទៅខែក្រោយ",
		labelPrevious: "ទៅខែមុន",
		labelWeekNumber: (weekNumber) => `សប្ដាហ៍ ${weekNumber}`,
		labelYearDropdown: "ជ្រើសឆ្នាំ",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `ថ្ងៃ​នេះ, ${label}`;
			return label;
		},
		labelNav: "របាររុករក",
		labelWeekNumberHeader: "លេខសប្ដាហ៍",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/kn.js
/** Kannada locale extended with DayPicker-specific translations. */
var kn = {
	...kn$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `ಇಂದು, ${label}`;
			if (modifiers.selected) label = `${label}, ಆಯ್ಕೆ ಮಾಡಿದ`;
			return label;
		},
		labelMonthDropdown: "ತಿಂಗಳ ಆಯ್ಕೆ",
		labelNext: "ಮುಂದಿನ ತಿಂಗಳಿಗೆ ಹೋಗಿ",
		labelPrevious: "ಹಿಂದಿನ ತಿಂಗಳಿಗೆ ಹೋಗಿ",
		labelWeekNumber: (weekNumber) => `ವಾರ ${weekNumber}`,
		labelYearDropdown: "ವರ್ಷ ಆಯ್ಕೆಮಾಡಿ",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `ಇಂದು, ${label}`;
			return label;
		},
		labelNav: "ನವಿಗೇಶನ್ ಪಟ್ಟೆ",
		labelWeekNumberHeader: "ವಾರ ಸಂಖ್ಯೆ",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ko.js
/** Korean locale extended with DayPicker-specific translations. */
var ko = {
	...ko$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `오늘, ${label}`;
			if (modifiers.selected) label = `${label}, 선택됨`;
			return label;
		},
		labelMonthDropdown: "월 선택",
		labelNext: "다음 달로 이동",
		labelPrevious: "이전 달로 이동",
		labelWeekNumber: (weekNumber) => `주 ${weekNumber}`,
		labelYearDropdown: "연도 선택",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `오늘, ${label}`;
			return label;
		},
		labelNav: "탐색 모음",
		labelWeekNumberHeader: "주 번호",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/lb.js
/** Luxembourgish locale extended with DayPicker-specific translations. */
var lb = {
	...lb$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Haut, ${label}`;
			if (modifiers.selected) label = `${label}, ausgewielt`;
			return label;
		},
		labelMonthDropdown: "Mount auswielen",
		labelNext: "Op de nächste Mount",
		labelPrevious: "Op de virdrun Mount",
		labelWeekNumber: (weekNumber) => `Woch ${weekNumber}`,
		labelYearDropdown: "Joer auswielen",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Haut, ${label}`;
			return label;
		},
		labelNav: "Navigatiounsbar",
		labelWeekNumberHeader: "Wochennummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/lt.js
/** Lithuanian locale extended with DayPicker-specific translations. */
var lt = {
	...lt$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Šiandien, ${label}`;
			if (modifiers.selected) label = `${label}, pasirinkta`;
			return label;
		},
		labelMonthDropdown: "Pasirinkite mėnesį",
		labelNext: "Pereiti į kitą mėnesį",
		labelPrevious: "Pereiti į ankstesnį mėnesį",
		labelWeekNumber: (weekNumber) => `Savaitė ${weekNumber}`,
		labelYearDropdown: "Pasirinkite metus",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Šiandien, ${label}`;
			return label;
		},
		labelNav: "Naršymo juosta",
		labelWeekNumberHeader: "Savaitės numeris",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/lv.js
/** Latvian locale extended with DayPicker-specific translations. */
var lv = {
	...lv$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Šodien, ${label}`;
			if (modifiers.selected) label = `${label}, izvēlēts`;
			return label;
		},
		labelMonthDropdown: "Izvēlieties mēnesi",
		labelNext: "Uz nākamo mēnesi",
		labelPrevious: "Uz iepriekšējo mēnesi",
		labelWeekNumber: (weekNumber) => `Nedēļa ${weekNumber}`,
		labelYearDropdown: "Izvēlieties gadu",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Šodien, ${label}`;
			return label;
		},
		labelNav: "Navigācijas josla",
		labelWeekNumberHeader: "Nedēļas numurs",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/mk.js
/** Macedonian locale extended with DayPicker-specific translations. */
var mk = {
	...mk$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Денес, ${label}`;
			if (modifiers.selected) label = `${label}, избрано`;
			return label;
		},
		labelMonthDropdown: "Изберете месец",
		labelNext: "Оди на следниот месец",
		labelPrevious: "Оди на претходниот месец",
		labelWeekNumber: (weekNumber) => `Недела ${weekNumber}`,
		labelYearDropdown: "Изберете година",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Денес, ${label}`;
			return label;
		},
		labelNav: "Лента за навигација",
		labelWeekNumberHeader: "Број на недела",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/mn.js
/** Mongolian locale extended with DayPicker-specific translations. */
var mn = {
	...mn$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Өнөөдөр, ${label}`;
			if (modifiers.selected) label = `${label}, сонгогдсон`;
			return label;
		},
		labelMonthDropdown: "Сараа сонгоно уу",
		labelNext: "Дараагийн сар руу очих",
		labelPrevious: "Өмнөх сар руу очих",
		labelWeekNumber: (weekNumber) => `Долоо хоног ${weekNumber}`,
		labelYearDropdown: "Жилээ сонгоно уу",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Өнөөдөр, ${label}`;
			return label;
		},
		labelNav: "Навигацийн самбар",
		labelWeekNumberHeader: "Долоо хонгийн дугаар",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ms.js
/** Malay locale extended with DayPicker-specific translations. */
var ms = {
	...ms$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hari ini, ${label}`;
			if (modifiers.selected) label = `${label}, dipilih`;
			return label;
		},
		labelMonthDropdown: "Pilih bulan",
		labelNext: "Pergi ke bulan seterusnya",
		labelPrevious: "Pergi ke bulan sebelumnya",
		labelWeekNumber: (weekNumber) => `Minggu ${weekNumber}`,
		labelYearDropdown: "Pilih tahun",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hari ini, ${label}`;
			return label;
		},
		labelNav: "Bar navigasi",
		labelWeekNumberHeader: "Nombor minggu",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/mt.js
/** Maltese locale extended with DayPicker-specific translations. */
var mt = {
	...mt$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Illum, ${label}`;
			if (modifiers.selected) label = `${label}, magħżul`;
			return label;
		},
		labelMonthDropdown: "Agħżel ix-xahar",
		labelNext: "Mur għax-xahar li jmiss",
		labelPrevious: "Mur għax-xahar ta' qabel",
		labelWeekNumber: (weekNumber) => `Ġimgħa ${weekNumber}`,
		labelYearDropdown: "Agħżel is-sena",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Illum, ${label}`;
			return label;
		},
		labelNav: "Bar tan-navigazzjoni",
		labelWeekNumberHeader: "Numru tal-ġimgħa",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/nb.js
/** Norwegian Bokmål locale extended with DayPicker-specific translations. */
var nb = {
	...nb$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `I dag, ${label}`;
			if (modifiers.selected) label = `${label}, valgt`;
			return label;
		},
		labelMonthDropdown: "Velg måned",
		labelNext: "Gå til neste måned",
		labelPrevious: "Gå til forrige måned",
		labelWeekNumber: (weekNumber) => `Uke ${weekNumber}`,
		labelYearDropdown: "Velg år",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `I dag, ${label}`;
			return label;
		},
		labelNav: "Navigasjonslinje",
		labelWeekNumberHeader: "Ukenummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/nl.js
/** Dutch locale extended with DayPicker-specific translations. */
var nl = {
	...nl$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Vandaag, ${label}`;
			if (modifiers.selected) label = `${label}, geselecteerd`;
			return label;
		},
		labelMonthDropdown: "Kies de maand",
		labelNext: "Ga naar volgende maand",
		labelPrevious: "Ga naar vorige maand",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Kies het jaar",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Vandaag, ${label}`;
			return label;
		},
		labelNav: "Navigatiebalk",
		labelWeekNumberHeader: "Weeknummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/nl-BE.js
/** Dutch (Belgium) locale extended with DayPicker-specific translations. */
var nlBE = {
	...nlBE$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Vandaag, ${label}`;
			if (modifiers.selected) label = `${label}, geselecteerd`;
			return label;
		},
		labelMonthDropdown: "Kies de maand",
		labelNext: "Ga naar volgende maand",
		labelPrevious: "Ga naar vorige maand",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Kies het jaar",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Vandaag, ${label}`;
			return label;
		},
		labelNav: "Navigatiebalk",
		labelWeekNumberHeader: "Weeknummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/nn.js
/** Norwegian Nynorsk locale extended with DayPicker-specific translations. */
var nn = {
	...nn$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `I dag, ${label}`;
			if (modifiers.selected) label = `${label}, vald`;
			return label;
		},
		labelMonthDropdown: "Vel månad",
		labelNext: "Gå til neste månad",
		labelPrevious: "Gå til førre månad",
		labelWeekNumber: (weekNumber) => `Veke ${weekNumber}`,
		labelYearDropdown: "Vel år",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `I dag, ${label}`;
			return label;
		},
		labelNav: "Navigasjonslinje",
		labelWeekNumberHeader: "Vekenummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/oc.js
/** Occitan locale extended with DayPicker-specific translations. */
var oc = {
	...oc$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Uèi, ${label}`;
			if (modifiers.selected) label = `${label}, seleccionat`;
			return label;
		},
		labelMonthDropdown: "Causissètz lo mes",
		labelNext: "Anar al mes que ven",
		labelPrevious: "Anar al mes precedent",
		labelWeekNumber: (weekNumber) => `Setmana ${weekNumber}`,
		labelYearDropdown: "Causissètz l'annada",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Uèi, ${label}`;
			return label;
		},
		labelNav: "Barra de navigacion",
		labelWeekNumberHeader: "Numèro de setmana",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/pl.js
/** Polish locale extended with DayPicker-specific translations. */
var pl = {
	...pl$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Dziś, ${label}`;
			if (modifiers.selected) label = `${label}, zaznaczony`;
			return label;
		},
		labelMonthDropdown: "Wybierz miesiąc",
		labelNext: "Przejdź do następnego miesiąca",
		labelPrevious: "Przejdź do poprzedniego miesiąca",
		labelWeekNumber: (weekNumber) => `Tydzień ${weekNumber}`,
		labelYearDropdown: "Wybierz rok",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Dziś, ${label}`;
			return label;
		},
		labelNav: "Pasek nawigacyjny",
		labelWeekNumberHeader: "Numer tygodnia",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/pt.js
/** Portuguese locale extended with DayPicker-specific translations. */
var pt = {
	...pt$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hoje, ${label}`;
			if (modifiers.selected) label = `${label}, selecionado`;
			return label;
		},
		labelMonthDropdown: "Escolha o mês",
		labelNext: "Ir para o próximo mês",
		labelPrevious: "Ir para o mês anterior",
		labelWeekNumber: (weekNumber) => `Semana ${weekNumber}`,
		labelYearDropdown: "Escolha o ano",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hoje, ${label}`;
			return label;
		},
		labelNav: "Barra de navegação",
		labelWeekNumberHeader: "Número da semana",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/pt-BR.js
/** Portuguese (Brazil) locale extended with DayPicker-specific translations. */
var ptBR = {
	...ptBR$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hoje, ${label}`;
			if (modifiers.selected) label = `${label}, selecionado`;
			return label;
		},
		labelMonthDropdown: "Escolha o mês",
		labelNext: "Ir para o próximo mês",
		labelPrevious: "Ir para o mês anterior",
		labelWeekNumber: (weekNumber) => `Semana ${weekNumber}`,
		labelYearDropdown: "Escolha o ano",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hoje, ${label}`;
			return label;
		},
		labelNav: "Barra de navegação",
		labelWeekNumberHeader: "Número da semana",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ro.js
/** Romanian locale extended with DayPicker-specific translations. */
var ro = {
	...ro$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Astăzi, ${label}`;
			if (modifiers.selected) label = `${label}, selectat`;
			return label;
		},
		labelMonthDropdown: "Alege luna",
		labelNext: "Mergi la luna următoare",
		labelPrevious: "Mergi la luna anterioară",
		labelWeekNumber: (weekNumber) => `Săptămâna ${weekNumber}`,
		labelYearDropdown: "Alege anul",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Astăzi, ${label}`;
			return label;
		},
		labelNav: "Bară de navigare",
		labelWeekNumberHeader: "Numărul săptămânii",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ru.js
/** Russian locale extended with DayPicker-specific translations. */
var ru = {
	...ru$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Сегодня, ${label}`;
			if (modifiers.selected) label = `${label}, выбрано`;
			return label;
		},
		labelMonthDropdown: "Выберите месяц",
		labelNext: "Перейти к следующему месяцу",
		labelPrevious: "Перейти к предыдущему месяцу",
		labelWeekNumber: (weekNumber) => `Неделя ${weekNumber}`,
		labelYearDropdown: "Выберите год",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Сегодня, ${label}`;
			return label;
		},
		labelNav: "Панель навигации",
		labelWeekNumberHeader: "Номер недели",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/se.js
/** Northern Sami locale extended with DayPicker-specific translations. */
var se = {
	...se$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Odne, ${label}`;
			if (modifiers.selected) label = `${label}, válljejuvvon`;
			return label;
		},
		labelMonthDropdown: "Vállje mánnu",
		labelNext: "Mana boahtte mánu",
		labelPrevious: "Mana ovddit mánu",
		labelWeekNumber: (weekNumber) => `Vahkku ${weekNumber}`,
		labelYearDropdown: "Vállje jahki",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Odne, ${label}`;
			return label;
		},
		labelNav: "Navigasuvnnabár",
		labelWeekNumberHeader: "Vahkku lohku",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/sk.js
/** Slovak locale extended with DayPicker-specific translations. */
var sk = {
	...sk$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Dnes, ${label}`;
			if (modifiers.selected) label = `${label}, vybraté`;
			return label;
		},
		labelMonthDropdown: "Vyberte mesiac",
		labelNext: "Prejsť na ďalší mesiac",
		labelPrevious: "Prejsť na predchádzajúci mesiac",
		labelWeekNumber: (weekNumber) => `Týždeň ${weekNumber}`,
		labelYearDropdown: "Vyberte rok",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Dnes, ${label}`;
			return label;
		},
		labelNav: "Navigačný panel",
		labelWeekNumberHeader: "Číslo týždňa",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/sl.js
/** Slovene locale extended with DayPicker-specific translations. */
var sl = {
	...sl$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Danes, ${label}`;
			if (modifiers.selected) label = `${label}, izbrano`;
			return label;
		},
		labelMonthDropdown: "Izberite mesec",
		labelNext: "Pojdi na naslednji mesec",
		labelPrevious: "Pojdi na prejšnji mesec",
		labelWeekNumber: (weekNumber) => `Teden ${weekNumber}`,
		labelYearDropdown: "Izberite leto",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Danes, ${label}`;
			return label;
		},
		labelNav: "Navigacijska vrstica",
		labelWeekNumberHeader: "Številka tedna",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/sq.js
/** Albanian locale extended with DayPicker-specific translations. */
var sq = {
	...sq$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Sot, ${label}`;
			if (modifiers.selected) label = `${label}, zgjedhur`;
			return label;
		},
		labelMonthDropdown: "Zgjidhni muajin",
		labelNext: "Shko te muaji tjetër",
		labelPrevious: "Shko te muaji i mëparshëm",
		labelWeekNumber: (weekNumber) => `Java ${weekNumber}`,
		labelYearDropdown: "Zgjidhni vitin",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Sot, ${label}`;
			return label;
		},
		labelNav: "Shiriti i navigimit",
		labelWeekNumberHeader: "Numri i javës",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/sr.js
/** Serbian (Cyrillic) locale extended with DayPicker-specific translations. */
var sr = {
	...sr$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Данас, ${label}`;
			if (modifiers.selected) label = `${label}, изабрано`;
			return label;
		},
		labelMonthDropdown: "Изаберите месец",
		labelNext: "Идите на следећи месец",
		labelPrevious: "Идите на претходни месец",
		labelWeekNumber: (weekNumber) => `Недеља ${weekNumber}`,
		labelYearDropdown: "Изаберите годину",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Данас, ${label}`;
			return label;
		},
		labelNav: "Навигациона трака",
		labelWeekNumberHeader: "Број недеље",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/sr-Latn.js
/** Serbian (Latin) locale extended with DayPicker-specific translations. */
var srLatn = {
	...srLatn$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Danas, ${label}`;
			if (modifiers.selected) label = `${label}, izabrano`;
			return label;
		},
		labelMonthDropdown: "Izaberite mesec",
		labelNext: "Idite na sledeći mesec",
		labelPrevious: "Idite na prethodni mesec",
		labelWeekNumber: (weekNumber) => `Nedelja ${weekNumber}`,
		labelYearDropdown: "Izaberite godinu",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Danas, ${label}`;
			return label;
		},
		labelNav: "Navigaciona traka",
		labelWeekNumberHeader: "Broj nedelje",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/sv.js
/** Swedish locale extended with DayPicker-specific translations. */
var sv = {
	...sv$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Idag, ${label}`;
			if (modifiers.selected) label = `${label}, vald`;
			return label;
		},
		labelMonthDropdown: "Välj månad",
		labelNext: "Gå till nästa månad",
		labelPrevious: "Gå till föregående månad",
		labelWeekNumber: (weekNumber) => `Vecka ${weekNumber}`,
		labelYearDropdown: "Välj år",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Idag, ${label}`;
			return label;
		},
		labelNav: "Navigationsfält",
		labelWeekNumberHeader: "Veckonummer",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ta.js
/** Tamil locale extended with DayPicker-specific translations. */
var ta = {
	...ta$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `இன்று, ${label}`;
			if (modifiers.selected) label = `${label}, தேர்ந்தெடுக்கப்பட்டது`;
			return label;
		},
		labelMonthDropdown: "மாதத்தை தேர்வு செய்யவும்",
		labelNext: "அடுத்த மாதத்துக்கு செல்லவும்",
		labelPrevious: "முந்தைய மாதத்துக்கு செல்லவும்",
		labelWeekNumber: (weekNumber) => `வாரம் ${weekNumber}`,
		labelYearDropdown: "ஆண்டை தேர்வு செய்யவும்",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `இன்று, ${label}`;
			return label;
		},
		labelNav: "வழிசெலுத்தல் பட்டை",
		labelWeekNumberHeader: "வார எண்",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/te.js
/** Telugu locale extended with DayPicker-specific translations. */
var te = {
	...te$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `ఈ రోజు, ${label}`;
			if (modifiers.selected) label = `${label}, ఎంచుకోబడింది`;
			return label;
		},
		labelMonthDropdown: "నెలను ఎంచుకోండి",
		labelNext: "తదుపరి నెలకు వెళ్లండి",
		labelPrevious: "మునుపటి నెలకు వెళ్లండి",
		labelWeekNumber: (weekNumber) => `వారం ${weekNumber}`,
		labelYearDropdown: "సంవత్సరాన్ని ఎంచుకోండి",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `ఈ రోజు, ${label}`;
			return label;
		},
		labelNav: "నావిగేషన్ పట్టీ",
		labelWeekNumberHeader: "వారం సంఖ్య",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/th.js
/** Thai locale extended with DayPicker-specific translations. */
var th = {
	...th$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `วันนี้, ${label}`;
			if (modifiers.selected) label = `${label}, เลือกแล้ว`;
			return label;
		},
		labelMonthDropdown: "เลือกเดือน",
		labelNext: "ไปเดือนถัดไป",
		labelPrevious: "ไปเดือนก่อนหน้า",
		labelWeekNumber: (weekNumber) => `สัปดาห์ ${weekNumber}`,
		labelYearDropdown: "เลือกปี",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `วันนี้, ${label}`;
			return label;
		},
		labelNav: "แถบนำทาง",
		labelWeekNumberHeader: "หมายเลขสัปดาห์",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/tr.js
/** Turkish locale extended with DayPicker-specific translations. */
var tr = {
	...tr$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Bugün, ${label}`;
			if (modifiers.selected) label = `${label}, seçili`;
			return label;
		},
		labelMonthDropdown: "Ayı seçin",
		labelNext: "Sonraki aya git",
		labelPrevious: "Önceki aya git",
		labelWeekNumber: (weekNumber) => `Hafta ${weekNumber}`,
		labelYearDropdown: "Yılı seçin",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Bugün, ${label}`;
			return label;
		},
		labelNav: "Gezinme çubuğu",
		labelWeekNumberHeader: "Hafta numarası",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/ug.js
/** Uyghur locale extended with DayPicker-specific translations. */
var ug = {
	...ug$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `بۈگۈن، ${label}`;
			if (modifiers.selected) label = `${label}، تاللانغان`;
			return label;
		},
		labelMonthDropdown: "ئاي تاللاڭ",
		labelNext: "كېيىنكى ئايغا يۆتكەڭ",
		labelPrevious: "ئالدىنقى ئايغا يۆتكەڭ",
		labelWeekNumber: (weekNumber) => `ھەپتە ${weekNumber}`,
		labelYearDropdown: "يىل تاللاڭ",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `بۈگۈن، ${label}`;
			return label;
		},
		labelNav: "يولباشچى بالداق",
		labelWeekNumberHeader: "ھەپتە نومۇرى",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/uk.js
/** Ukrainian locale extended with DayPicker-specific translations. */
var uk = {
	...uk$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Сьогодні, ${label}`;
			if (modifiers.selected) label = `${label}, вибрано`;
			return label;
		},
		labelMonthDropdown: "Виберіть місяць",
		labelNext: "Перейти до наступного місяця",
		labelPrevious: "Перейти до попереднього місяця",
		labelWeekNumber: (weekNumber) => `Тиждень ${weekNumber}`,
		labelYearDropdown: "Виберіть рік",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Сьогодні, ${label}`;
			return label;
		},
		labelNav: "Панель навігації",
		labelWeekNumberHeader: "Номер тижня",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/uz.js
/** Uzbek (Latin) locale extended with DayPicker-specific translations. */
var uz = {
	...uz$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Bugun, ${label}`;
			if (modifiers.selected) label = `${label}, tanlangan`;
			return label;
		},
		labelMonthDropdown: "Oyni tanlang",
		labelNext: "Keyingi oyga o'ting",
		labelPrevious: "Oldingi oyga o'ting",
		labelWeekNumber: (weekNumber) => `Hafta ${weekNumber}`,
		labelYearDropdown: "Yilni tanlang",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Bugun, ${label}`;
			return label;
		},
		labelNav: "Navigatsiya paneli",
		labelWeekNumberHeader: "Hafta raqami",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/uz-Cyrl.js
/** Uzbek (Cyrillic) locale extended with DayPicker-specific translations. */
var uzCyrl = {
	...uzCyrl$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Бугун, ${label}`;
			if (modifiers.selected) label = `${label}, танланган`;
			return label;
		},
		labelMonthDropdown: "Ойни танланг",
		labelNext: "Кейинги ойга ўтинг",
		labelPrevious: "Олдинги ойга ўтинг",
		labelWeekNumber: (weekNumber) => `Ҳафта ${weekNumber}`,
		labelYearDropdown: "Йилни танланг",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Бугун, ${label}`;
			return label;
		},
		labelNav: "Навигация панели",
		labelWeekNumberHeader: "Ҳафта рақами",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/vi.js
/** Vietnamese locale extended with DayPicker-specific translations. */
var vi = {
	...vi$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `Hôm nay, ${label}`;
			if (modifiers.selected) label = `${label}, đã chọn`;
			return label;
		},
		labelMonthDropdown: "Chọn tháng",
		labelNext: "Đến tháng tiếp theo",
		labelPrevious: "Đến tháng trước",
		labelWeekNumber: (weekNumber) => `Tuần ${weekNumber}`,
		labelYearDropdown: "Chọn năm",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `Hôm nay, ${label}`;
			return label;
		},
		labelNav: "Thanh điều hướng",
		labelWeekNumberHeader: "Số tuần",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/zh-CN.js
/** Chinese (Simplified) locale extended with DayPicker-specific translations. */
var zhCN = {
	...zhCN$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `今天，${label}`;
			if (modifiers.selected) label = `${label}，已选择`;
			return label;
		},
		labelMonthDropdown: "选择月份",
		labelNext: "前往下个月",
		labelPrevious: "前往上个月",
		labelWeekNumber: (weekNumber) => `第 ${weekNumber} 周`,
		labelYearDropdown: "选择年份",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `今天，${label}`;
			return label;
		},
		labelNav: "导航栏",
		labelWeekNumberHeader: "周数",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/zh-HK.js
/**
* Chinese (Traditional, Hong Kong) locale extended with DayPicker-specific
* translations.
*/
var zhHK = {
	...zhHK$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `今日，${label}`;
			if (modifiers.selected) label = `${label}，已選擇`;
			return label;
		},
		labelMonthDropdown: "選擇月份",
		labelNext: "前往下個月",
		labelPrevious: "前往上個月",
		labelWeekNumber: (weekNumber) => `第 ${weekNumber} 週`,
		labelYearDropdown: "選擇年份",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `今日，${label}`;
			return label;
		},
		labelNav: "導覽列",
		labelWeekNumberHeader: "週數",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/zh-TW.js
/**
* Chinese (Traditional, Taiwan) locale extended with DayPicker-specific
* translations.
*/
var zhTW = {
	...zhTW$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers.today) label = `今天，${label}`;
			if (modifiers.selected) label = `${label}，已選取`;
			return label;
		},
		labelMonthDropdown: "選擇月份",
		labelNext: "前往下個月",
		labelPrevious: "前往上個月",
		labelWeekNumber: (weekNumber) => `第 ${weekNumber} 週`,
		labelYearDropdown: "選擇年份",
		labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
		labelGridcell: (date, modifiers, options, dateLib) => {
			let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
			if (modifiers?.today) label = `今天，${label}`;
			return label;
		},
		labelNav: "導覽列",
		labelWeekNumberHeader: "週數",
		labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
	}
};
//#endregion
export { af, ar, arDZ, arEG, arMA, arSA, arTN, az, be, beTarask, bg, bn, bs, ca, ckb, cs, cy, da, de, deAT, el, enAU, enCA, enGB, enIE, enIN, enNZ, enUS, enZA, eo, es, et, eu, faIR, fi, fr, frCA, frCH, fy, gd, gl, gu, he, hi, hr, ht, hu, hy, id, is, it, itCH, ja, jaHira, ka, kk, km, kn, ko, lb, lt, lv, mk, mn, ms, mt, nb, nl, nlBE, nn, oc, pl, pt, ptBR, ro, ru, se, sk, sl, sq, sr, srLatn, sv, ta, te, th, tr, ug, uk, uz, uzCyrl, vi, zhCN, zhHK, zhTW };

//# sourceMappingURL=react-day-picker_locale.js.map