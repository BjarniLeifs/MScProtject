module.exports = {
	DTO : (id, uId, name, rTypeId, ctime, utime) => { 
		return {
			ID 	 		 : id,
			UserID 		 : uId,
			Name 		 : name,
			ReportTypeID : rTypeId,
			CreatedAt    : ctime,
		  	LastUpdate   : utime 
		};
	}
/* exports ends */
};