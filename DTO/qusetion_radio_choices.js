module.exports = {
	DTO : (id, qId, cho, tBox) => { 
		return {
		  ID  		 : id,
		  QuestionID : qId,
		  Choice  	 : cho,
		  Textbox	 : tBox
		};
	}
/* exports ends */
};