module.exports = {
	AdminDTO : (id, rTok, tokExp, name, email, username, hash) => { 
		return {
			ID 			 : id,
			ResetToken 	 : rTok,
			TokenExpired : tokExp,
			Name 		 : name,
			Email 		 : email,
			Username 	 : username,
			Hash 		 : hash
		};
	},
	DTO : (id, name, email, username) => { 
		return {
			ID 			 : id,
			Name 		 : name,
			Email 		 : email,
			Username 	 : username,
		};
	}
/* exports ends */
};

