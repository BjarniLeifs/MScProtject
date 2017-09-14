'use strict';

/**
 * @ngdoc function
 * @name ramesApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the ramesApp
 */
angular.module('ramesApp')
  .controller('ContactCtrl', function ($scope, $http) {
    $scope.reportID = 1;

    var baseUrl = "http://localhost:3001";

    var reporttypeID = 1;

    if (window.location.href.substr(-2) !== '?r') {
      window.location = window.location.href + '?r';
    }

    // -------------------- http requests --------------------
    $http.get(baseUrl + "/api/ramescategory/ordered/sequenceNumber")
      .then(function (response) {
        $scope.categories = response.data;
      });

    $http.get(baseUrl + "/api/ramesquestion")
      .then(function (response) {
        $scope.questions = response.data;
      });

    $http.get(baseUrl + "/api/ramesinfo")
      .then(function (response) {
        $scope.ramesinfo = response.data;
      });


    function isJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    $http.get(baseUrl + "/api/reportsinfo/report/" + $scope.reportID)
      .then(function (response) {
        $scope.reportInfo = response.data;

        angular.forEach($scope.reportInfo, function (data) {
          if ($.isNumeric(data.Answer)) {
            data.Answer = parseInt(data.Answer);
          }
          else if (isJson(data.Answer)) {
            data.Answer = JSON.parse(data.Answer);
            var keys = Object.keys(data.Answer);
          }
        });
        console.log(JSON.stringify($scope.reportInfo));
      });

    $http.get(baseUrl + "/api/reports/" + $scope.reportID)
      .then(function (response) {
        $scope.reportName = response.data;
      });

    $http.get(baseUrl + "/api/questiondropdownchoices/")
      .then(function (response) {
        $scope.dropdownChoices = response.data;
      });

    $http.get(baseUrl + "/api/questioncheckboxchoices/")
      .then(function (response) {
        $scope.checkboxChoices = response.data;
      });

    $http.get(baseUrl + "/api/questionradiochoices/")
      .then(function (response) {
        $scope.radioChoices = response.data;
      });


    $(document).ready (function(){
        $("#success-alert").hide();
        $("#succ").click(function showAlert() { 
            $("#success-alert").alert();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
            });
        });
    });

    // -------------------- functions --------------------
    $scope.reportInfo = {
      "ReportID": $scope.reportID
    };

    $scope.resetValue = function (questionID) {
      angular.forEach($scope.reportInfo, function (value) {
        if (value.QuestionID == questionID) {
          value.Answer['Text'][Object.keys(value.Answer['Text'])] = '';
          value.Answer['Textbox'][Object.keys(value.Answer['Textbox'])] = '';
        }
      });
    };

    $scope.updateInfo = function (reportInfo, reportName) {
      $http.put(baseUrl + "/api/reports", reportName)
        .then(function (response) {

          var length = Object.keys(reportInfo).length;

          try {
            for (var i = 0; i < length; i++) {
                console.log(reportInfo[i]);
                var match = /\r|\n/.exec(reportInfo[i].Answer);
              if (typeof (reportInfo[i]) == 'object') {
                if(match) {
                  var answer = {
                    "ID": reportInfo[i].ID,
                    "ReportID": $scope.reportID,
                    "QuestionID": reportInfo[i].QuestionID,
                    "Answer": reportInfo[i].Answer
                  }
                } else {
                  var answer = {
                    "ID": reportInfo[i].ID,
                    "ReportID": $scope.reportID,
                    "QuestionID": reportInfo[i].QuestionID,
                    "Answer": JSON.stringify(reportInfo[i].Answer)
                  }
                }
              } else {
                var answer = {
                  "ID": reportInfo[i].ID,
                  "ReportID": $scope.reportID,
                  "QuestionID": reportInfo[i].QuestionID,
                  "Answer": reportInfo[i].Answer
                }
              };

              $http.put(baseUrl + "/api/reportsInfo", answer);

            };
          } catch (e) {

          }



        });
    };


    // PDF maker 

    var getLayout = function () {
            return {
                hLineWidth: function () {
                    // up
                    return 0.1;
                },
                vLineWidth: function () {
                    // down
                    return 0.1;
                },
                hLineColor: function () {
                    return 'gray';
                },
                vLineColor: function () {
                    return 'gray';
                }
            };
        };

        var getTable = function () {
            var reportBody = [];

            angular.forEach($scope.categories, function(category) {
                reportBody.push([{ text: category.category, style: 'categoryBold' }, ""]);

                angular.forEach($scope.ramesinfo, function(info) {
                    if(info.CategoryID == category.ID) {
                        var answers = "";
                        angular.forEach($scope.questions, function(question) {
                            if(question.RamesInfoID == info.ID) {
                                angular.forEach($scope.reportInfo, function(answer) {
                                    if(answer.QuestionID == question.ID) {
                                      if(answer.Answer != "" && answer.Answer != '0') {
                                        if(typeof(answer.Answer) == 'object') {
                                            answers += question.Question + "\n";
                                            angular.forEach(answer.Answer, function(ans) {
                                                if(question.Type == 'conditionalyesnotext') {
                                                    if(ans == "") {
                                                        answers += "";
                                                    } else if(ans == "y") {
                                                        answers += "Yes. ";
                                                    } else if(ans == "n") {
                                                        answers += "No. ";
                                                    } else {
                                                        angular.forEach(ans, function(an) {
                                                            if(an == "") {
                                                                answers += "";
                                                            } else {
                                                                answers += an + "\n";
                                                            }
                                                        });
                                                    }
                                                }
                                                else if(typeof(ans) == 'object') {
                                                    angular.forEach(ans, function(an) {
                                                      if(an == "") {
                                                        answers += "";
                                                      } else {
                                                        answers += an + "\n";
                                                      }
                                                    });
                                                } else {
                                                    answers += ans + "\n";
                                                }
                                            });
                                        } else {
                                            if(question.Type == 'yesno' && answer.Answer == 'y') {
                                                answers += question.Question + " Yes \n";
                                            } else if(question.Type == 'yesno' && answer.Answer == 'n') {
                                                answers += question.Question + " No \n";
                                            } else {
                                                answers += question.Question + " " + answer.Answer + "\n";
                                            }
                                        }
                                      }
                                    }
                                });
                            }
                        });
                        reportBody.push([info.Name, answers]);
                    }
                });
            });
            var rName = $scope.reportName[0]['Name'];
            return [
                { text: rName, fontSize: 20, bold: false, alignment: 'center', style: ['lineSpacing', 'headingColor'] },
                // Line beneath name of report
                // Name of report
                { text: '', style: ['doublelineSpacing'] },
                {
                    table: {
                        widths: ['auto', 'auto'],
                        headerRows: 1,
                        body: reportBody
                    }, layout: getLayout()
                }

            ];
        };

        $scope.downloadPDF = function (reportInfo, reportName) {
            $scope.updateInfo(reportInfo, reportName);
            var docDefinition = {
                pageMargins: [72, 80, 40, 60],
                pageSize: 'A4',
                header: function () {
                    return {
                        columns: [
                            {},
                            {}
                        ]
                    }
                },

                footer: function (currentPage, pageCount) {
                    return {
                        stack: [{ canvas: [{}] },                        
                        { text: '', margin: [0, 0, 0, 5] },
                        {
                            columns: [
                                {},
                                {}                                
                            ]
                        }]

                    };
                },
                content: [
                    { stack: getTable() }
                ],
                styles: {
                    'lineSpacing': {
                        margin: [0, 0, 0, 6]
                    },
                    'doublelineSpacing': {
                        margin: [0, 0, 0, 12]
                    },
                    'headingColor':
                    {
                        color: '#000000'
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: '#000000'
                    },
                    categoryBold: {
                        bold: true
                    }
                }
            }

            var date = new Date();
            date = moment(date).format('DD_MMM_YYYY_HH_mm_ss');
            pdfMake.createPdf(docDefinition).download($scope.reportName[0].Name + "_" + date + '.pdf');

        };


        $scope.previewPDF = function (reportInfo, reportName) {
          $scope.updateInfo(reportInfo, reportName);
            var docDefinition = {
                pageMargins: [72, 80, 40, 60],
                layout: 'headerLineOnly',
                pageSize: 'A4',
                header: function () {

                    return {
                        columns: [
                            {},
                            {}
                        ]
                    }
                },

                footer: function (currentPage, pageCount) {
                    return {
                        stack: [{ canvas: [{}] },
                        { text: '', margin: [0, 0, 0, 5] },
                        {
                            columns: [
                                {}
                            ]
                        }]

                    };
                },
                content: [
                    { stack: getTable() }
                ],
                styles: {
                    'lineSpacing': {
                        margin: [0, 0, 0, 6]
                    },
                    'doublelineSpacing': {
                        margin: [0, 0, 0, 12]
                    },
                    'headingColor':
                    {
                        color: '#000000'
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: '#669999'
                    },
                    categoryBold: {
                        bold: true
                    }
                }
            }

            pdfMake.createPdf(docDefinition).open();
        };

    
  });
