/*
This is an wizard of oz evaluation that I was working on in Tallinn,.... 

*/
module.exports = {

	evaluation : (data) => {
		let dataEven = [];
		let dataOdds = [];
		for (let item in data) {
			if ((item % 2) === 0) 
				dataEven.push(item);
			else 
				dataOdds.push(item);
		}
		let calcEven = even(dataEven);
		let calcOdds = odds(dataOdds);

		return result((calcOdds+calcEven)*2.5);
	},
	odd : (data) => {
		let count = 0;
		for(let item in data) {
			count += item;
		}
		return count;
	},
	even : (data) => {
		let count = 0;
		for(let item in data) {
			count += item;
		}
		return count;
	},
	result: (score) => {

		if (score < 25) {
			return {
					"message" : "Worst Imaginable",
					"scale" : "0 to 25",
					"score" : score			
				};
		} else if (score > 25 && score < 38) {
			return {
					"message" : "Poor",
					"scale" : "25 to 38",
					"score" : score
				};
		} else if (score > 38 && score < 52) {
			return {
					"message" : "Ok",
					"scale" : "38 to 52",
					"score" : score
				};
		} else if (score > 52 && score < 74) {
			return {
					"message" : "Good",
					"scale" : "52 to 74",
					"score" : score
				};
		} else if (score > 74 && score < 85) {
			return {
					"message" : "Excellent",
					"scale" : "74 to 85",
					"score" : score
				};
		} else {
			return {
					"message" : "Best Imagniable",
					"scale" : "85+",
					"score" : score
				};
		}
	},
	instruction : () => {
		return {		
			"Message" : "The scale should be from 1 to 5, where one is strongly disagree and 5 is strongly agree, there are 10 questions that needs to be asked.",
			"question 1" : "I think that I would like to use this system frequently.",
			"question 2" : "I found the system unnecessarily complex.", 
			"question 3" : "I thought the system was easy to use.",
			"question 4" : "I think that I would need the support of a technical person to be able to use this system.",
			"question 5" : "I found the various functions in this system were well integrated.",
			"question 6" : "I thought there was too much inconsistency in this system.",
			"question 7" : "I would imagine that most people would learn to use this system very quickly",
			"question 8" : "I found the system very cumbersome to use",
			"question 9" : "I felt very confident using the system",
			"question 10": "I needed to learn a lot of things before I could get going with this system."
		};
	}

/* exports ends */
};


