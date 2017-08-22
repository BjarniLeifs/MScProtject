module.exports = {
	DTO : (id, rId, qId, ans) => { 
		return {
			ID 	 		: id,
			ReportID	: rId
			QuestionID	: qId,
			Answer 		: ans
		};
	}
/* exports ends */
};