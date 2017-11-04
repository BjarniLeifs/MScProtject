module.exports = {
	DTO : (id, uId, name, rTypeId, ctime, utime, fin) => { 
		return {
			ID 	 		 : id,
			UserID 		 : uId,
			Name 		 : name,
			ReportTypeID : rTypeId,
			CreatedAt    : ctime,
		  	LastUpdate   : utime, 
		  	Finished	 : fin
		};
	}
/* exports ends */
};