module.exports = {
	DTO : (id, qId, cho, con, tBox) => { 
		return {
		  ID  		 : id,
		  QuestionID : qId,
		  Choice  	 : cho,
		  Cond 		 : con,
		  Textbox	 : tBox
		};
	}
/* exports ends */
};