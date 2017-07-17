
/*
	You do only need to adjust year month or min. 
	for 1 hour = 60 min
	for 1 day = 60 min * 24
	for 2 days = 60 min * 24 * 2
	and so on 
*/
module.exports = {
	dateAndTimeNow: () => {
		let date = new Date();
	    return date;
	},
	dateAddYear: (year) => {
		let date = new Date();
		let addYear = new Date (date);
		addYear.setFullYear(date.getFullYear() + year);

		return addYear;
	},
	dateAddMonth: (month) => {
		let date = new Date();
		let addMonth = new Date (date);
		addMonth.setMonth(date.getMonth() + month);

		return addMonth;
	},
	dateAddMin: (min) => {
		let date = new Date();
		let addMin = new Date (date);
		addMin.setMinutes(date.getMinutes() + min);

		return addMin;
	}
/* exports ends */
};


