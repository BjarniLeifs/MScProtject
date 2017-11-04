module.exports = {
	DTO : (id, cId, quest, qNr, type, lId) => { 
		return {
			ID 	 	   	: id,
			CategoryID 	: cId,
			Question 	: quest,
			QuestionNr	: qNr,
			Type		: type,
			LanguageID  : lId,
		};
	}
/* exports ends */
};