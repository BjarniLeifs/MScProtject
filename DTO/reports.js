module.exports = {
	DTO : (id, uId, name, rTypeId) => { 
		return {
			ID 	 		 : id,
			UserID 		 : uId,
			Name 		 : name,
			ReportTypeID : rTypeId
		};
	}
/* exports ends */
};