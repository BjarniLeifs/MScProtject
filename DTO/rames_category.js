module.exports = {
	DTO : (id, cat, inf, lId, sNumb) => { 
		return {
			ID 			   : id,
			Category 	   : cat,
			Info 		   : inf,
			LanguageID	   : lId,
			SequenceNumber : sNumb
		};
	}
/* exports ends */
};