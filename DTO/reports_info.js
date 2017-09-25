module.exports = {
	DTO : (id, rId, cId, qId, ans) => { 
		return {
			ID 	 		: id,
			ReportID	: rId,
			CategoryID  : cId,
			QuestionID	: qId,
			Answer 		: ans
		};
	}
/* exports ends */
};            
