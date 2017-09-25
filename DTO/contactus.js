
module.exports = {
	DTO : (id, name, email, subject, msg, seen, ans) => { 
		return {
				ID 	 : id,
	  			Name : name,
	  			Email: email,
	  			Subject: subject,
	  			Message: msg,
	  			Seen : seen,
	  			Answered : ans
		};
	}
/* exports ends */
};