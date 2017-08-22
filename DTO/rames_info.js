
module.exports = {
	DTO : (id, name, info, qexp, l_Id, c_id) => { 	
		return {
			ID 					: id,
	  		Name 				: name,
	  		Info 				: info,
	  		QuestionExplanation : qexp,
	  		LanguageID 			: l_Id,
			CategoryID 			: c_id
		};
	}
/* exports ends */
};