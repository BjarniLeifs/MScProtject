module.exports = {
	DTO : (id, cId, quest, sugg, qNr, type, lId, RInfId) => { 
		return {
			ID 	 	   	: id,
			CategoryID 	: cId,
			Question 	: quest,
			Suggestion	: sugg,
			QuestionNr	: qNr,
			Type		: type,
			LanguageID  : lId,
			RamesInfoID : RInfId
		};
	}
/* exports ends */
};