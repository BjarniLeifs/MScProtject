module.exports = {
	AdminDTO : (id, rTok, tokExp, name, email, username, isadmin, ismod, hash) => { 
		return {
			ID 			 : id,
			ResetToken 	 : rTok,
			TokenExpired : tokExp,
			Name 		 : name,
			Email 		 : email,
			Username 	 : username,
			IsAdmin	 	 : isadmin,
			IsModerator  : ismod,
			Hash 		 : hash
		};
	},
	DTO : (id, name, email, username) => { 
		return {
			ID 			 : id,
			Name 		 : name,
			Email 		 : email,
			Username 	 : username
		};
	},
	RightsDTO : (id, name, email, username, isadmin, ismod) => { 
		return {
			ID 			 : id,
			Name 		 : name,
			Email 		 : email,
			Username 	 : username,
			IsAdmin	 	 : isadmin,
			IsModerator  : ismod
		};
	}
/* exports ends */
};
