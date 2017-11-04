'use strict';
app.controller('ViewReportCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory',
				 'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory', 
				 'reportInfoFactory',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, ramesInfoFactory, 
		questionFactory, choicesFactory, categoryFactory, reportInfoFactory) {

				$scope.ramesInfo = ramesInfoFactory.getAll();
				$scope.answers   = reportInfoFactory.getByReportId($stateParams.reportid);
				$scope.questions = questionFactory.getAll(1);
				$scope.category  = categoryFactory.getCategoryOrdSeq(1);
				$scope.dropdown  = choicesFactory.getDrowpdown();
				$scope.checkbox  = choicesFactory.getCheckbox();
				$scope.radio 	 = choicesFactory.getRadio();


		$timeout(
			function() {
				$scope.viewReport = [];
/* Populating viewReport above to build table of information */
				angular.forEach($scope.category, 
					function (cat, cKey) {
/* First we need to make object to push information in to use. here we extract category name*/
						var addMe = {
								Category: cat.Category,
								Info : []					
							};
/* Next we need to look for information on what is each subsection R1, R2..., S1 ...*/
						angular.forEach($scope.ramesInfo,
							function (info, iKey) {
								if(info.CategoryID == cat.ID) {
/* Here we are going to make sure that category and info is in same subsections */
									var text = '';	
									angular.forEach($scope.questions,
										function (que, qKey) {
											if (info.ID == que.RamesInfoID) {
/* Here we are making sure that the information is consisting with rames info */
												angular.forEach($scope.answers,
													function (ans, aKey) {
														if (ans.QuestionID == que.ID) {
/* Here we are building up the information text to give out to the table. */
/* We also need to be sure that the information is not undefined or other things 
by checking what it is and so an after what we get in json object. */
															
															if (ans.Answer.number){
																if (text == '')
																	text += ans.Answer.number;
																else 
																	text += ' ,'+ans.Answer.number;
															}
															else if (ans.Answer.Text) {
																if (ans.Answer.Text.conditionalyesnotext) {
																	if (text == '')
																		text += ans.Answer.Text.conditionalyesnotext;
																	else
																		text += ans.Answer.Text.conditionalyesnotext;
																}
																else {
																	if (text == '')
																		text += ans.Answer.Text;
																	else
																		text += ' ,'+ans.Answer.Text;
																}
																if (ans.Answer.Textbox) {
																	if (ans.Answer.Textbox.conditionalyesnotext) {
																		if (text == '')
																			text += ans.Answer.Textbox.conditionalyesnotext;
																		else
																			text += ans.Answer.Textbox.conditionalyesnotext;
																	}
																	else {
																		if (text == '')
																			text += ans.Answer.Textbox;
																		else
																			text += ', '+ans.Answer.Textbox;
																	}
																}
															}
															else if (ans.Answer.checkbox) {
																if (ans.Answer.checkbox.data) {
																	angular.forEach(ans.Answer.checkbox.data,
																		function(value, key) {
																			if (text == '')
																				text += value;
																			else
																				text += ', '+value;		
																		})
																	if (ans.Answer.checkbox.Text) {
																		if (text == '')
																			text += ans.Answer.checkbox.Text;
																		else
																			text += ', '+ ans.Answer.checkbox.Text;
																	}

																}
															}
															else if (ans.Answer.text) {
																if (text == '')
																	text += ans.Answer.text;
																else
																	text += ', '+ ans.Answer.text;
															}
															else if (ans.Answer.radio) {
																if (text == '')
																	text += ans.Answer.radio;
																else 
																	text += ', '+ ans.Answer.radio;
															}
															else if (ans.Answer.yesno) {
																if (text == '')
																	text += ans.Answer.yesno;
																else 
																	text += ', '+ ans.Answer.yesno;
															}
															else if (ans.Answer.conditionalyesnotext) {
																if( text == '')
																	text += ans.Answer.conditionalyesnotext;
																else
																	text += ', '+ ans.Answer.conditionalyesnotext;
															}
														}
													}
												)

											}
										}
									)
/* Now we have extrated all information we need and built up the string to use it. */
									addMe.Info.push(
									{
										Name : info.Name,
										Value : text
									});
									text = '';
								}				
							}
						)
/* Now we add it to report object and clear all information to ensure it wont get currupted. */
						$scope.viewReport.push(addMe);
						addMe = [];
					}
				)
			}, 150
		);

	}
]);