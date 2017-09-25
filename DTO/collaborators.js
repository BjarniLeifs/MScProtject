
module.exports = {
	DTO : (id, name, email, deg, year, role, info, img) => { 
		return {
			ID 	 		    : id,
			Name 		    : name,
			Email 		  : email,
			Degree 		  : deg,
			Year 		    : year,
			Role 		    : role,
			Information : info,
			Image 		  : img
		};
	}
/* exports ends */
};
