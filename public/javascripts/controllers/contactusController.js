'use strict';


app.controller('ContractUsCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 
	function ($scope, $state, $stateParams, $location, $timeout) {
		/* Header of contact us site.*/
		$scope.Title = {
			ContactUs: "Contact us",
		 	ContactUsSmall: "Feel free to contact us"
		 };
		/* Our office part, information on name address and so forth.*/
		
		$scope.Company = {
			Title: "Our office",
			Name: "Reykjavik University.",
			Department: "School of Computer Science",
			Address: "Menntavegur 1, 101 Reykjavík, Iceland",
			Phone: {
				Name: "Tel:",
				Number: "+354-5996200"
			},
			Contact: {
				Name: "Dr. Marta Kristín Lárusdóttir",
				Email: "marta@ru.is",
			},
		};

		$scope.ContactForm = {
			Name: {
				Name: "Name",
				Explanation: "Enter name",
			},
			Email: {
				Email: "Email Address",
				Explanation: "Enter email",
			},
			Subject: {
				Subject: "Subject",
				Choose: {
					Opt1: "Choose One:",
					Opt2: "General Service",
					Opt3: "Suggestions",
					Opt4: "Product Support",
				},
			},
			Message: {
				Message: "Message",
				Explanation: "Message",
			},
			Buttom: "Send Message",
		};

	}
]);
