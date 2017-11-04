module.exports = {
	DTO : (id, rId, cId, qId, ans) => { 
		return {
			ID 	 		: id,
			FeedbackReportID	: rId,
			FeedbackQuestionID  : cId,
			CategoryID	: qId,
			Answer 		: ans
		};
	}
/* exports ends */
};            
