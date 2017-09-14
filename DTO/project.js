module.exports = {
	DTO : (id, name, des, uid, ctime, utime) => { 
		return {
		  ID  		  : id,
		  Name	 	  : name,
		  Description : des,
		  UserID 	  : uid,
		  CreatedAt   : ctime,
		  LastUpdate  : utime 
		};
	}
/* exports ends */
};