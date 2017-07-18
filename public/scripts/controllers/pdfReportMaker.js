'use strict';

/**
 * @ngdoc function
 * @name ramesApp.controller:pdfReportMaker
 * @description
 * # pdfReportMaker
 * Controller of the ramesApp
 */
angular.module('ramesApp')
  .controller('pdfReportMaker', 
    function ($scope, $rootScope, $http) {

        $scope.reportID = 72;
    
        var baseUrl = "http://localhost:3001";

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

            //console.log(angular.toJson($scope.reportInfo));

            angular.forEach($scope.reportInfo, function (data) {
            if ($.isNumeric(data.Answer)) {
                data.Answer = parseInt(data.Answer);
            }
            else if (isJson(data.Answer)) {
                data.Answer = JSON.parse(data.Answer);
                var keys = Object.keys(data.Answer);
            }
            });
        });

        $http.get(baseUrl + "/api/reports/" + $scope.reportID)
        .then(function (response) {
            $scope.reportName = response.data;
        });

        // ------------------------------------------------------
        
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
            var reportBody = [['Language', 'Database'], ['Intranet', 'Microsoft'], ['Online Jobs', 'Microsoft']];
            var reportBody2 = [];

            angular.forEach($scope.categories, function(category) {
                reportBody2.push([{ text: category.category, style: 'categoryBold' }, ""]);
                // questions where categoryID = category.ID
                // rames info where categoryID = category.ID
                // get answers for the questions with categoryID = category.ID. Append to string and push to array.
                angular.forEach($scope.ramesinfo, function(info) {
                    if(info.CategoryID == category.ID) {
                        var answers = "";
                        angular.forEach($scope.questions, function(question) {
                            if(question.RamesInfoID == info.ID) {
                                angular.forEach($scope.reportInfo, function(answer) {
                                    if(answer.QuestionID == question.ID) {
                                        if(typeof(answer.Answer) == 'object') {
                                            answers += question.Question + "\n";
                                            angular.forEach(answer.Answer, function(an) {
                                                if(typeof(an) == 'object') {
                                                    console.log("object an " + angular.toJson(an));
                                                    angular.forEach(an, function(a) {
                                                        console.log("ansssssssss " + a);
                                                        answers += a + "\n";
                                                    });
                                                    answers += angular.toJson(an) + "\n";
                                                } else {
                                                    answers += an + "\n";
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
                                });
                            }
                        });
                        reportBody2.push([info.Name, answers]);
                    }
                });
            });
            // console.log("reportBody " + reportBody);
            console.log("reportBody2 " + reportBody2);
            var rName = angular.toJson($scope.reportName[0]['Name']);
            return [
                { text: rName, fontSize: 20, bold: false, alignment: 'center', style: ['lineSpacing', 'headingColor'] },
                // Line beneath name of report
                // Name of report
                { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1, lineColor: '#990033', style: ['lineSpacing'] }] },
                { text: '', style: ['doublelineSpacing'] },
                {
                    table: {
                        widths: ['auto', 'auto'],
                        headerRows: 1,
                        // keepWithHeaderRows: 1,
                        body: reportBody2
                        // [
                        //     // ['Project', { text: 'Technology', style: 'tableHeader' }, 'Language', 'Database'],
                        //     // ['Intranet', 'Microsoft', { text: 'Sharepoint', colSpan: 2 }, {}],
                        //     // ['Online Jobs', 'Microsoft', 'Asp.Net', 'SQL Server']
                        //     // ['Language', 'Database'],
                        //     // ['Intranet', 'Microsoft'],
                        //     // ['Online Jobs', 'Microsoft']
                        // ]
                    }, layout: getLayout()
                }

            ];
        };

        $scope.printJson = function () {
            console.log("komst i print json");
            var docDefinition = {
                pageMargins: [72, 80, 40, 60],
                layout: 'headerLineOnly',
                pageSize: 'A4',
                header: function () {

                    return {
                        columns: [
                            {
                                text: 'Csharp',
                                width: 200,
                                margin: [50, 20, 5, 5]
                            },
                            {
                                stack: [
                                    { text: 'Project Details', alignment: 'right', fontSize: 12, margin: [0, 30, 50, 0] }
                                ]
                            }
                        ]
                    }
                },

                footer: function (currentPage, pageCount) {
                    return {
                        stack: [{ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595, y2: 5, lineWidth: 1, lineColor: '#ffff00', style: ['lineSpacing'] }] },
                        { text: '', margin: [0, 0, 0, 5] },
                        {
                            columns: [
                                {},
                                { text: currentPage.toString(), alignment: 'center' },
                                { text: moment(new Date()).format("DD-MMM-YYYY"), alignment: 'right', margin: [0, 0, 20, 0] }
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
                        color: '#999966'
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

            //  pdfMake.createPdf(docDefinition).open();
            var date = new Date();
            date = moment(date).format('DD_MMM_YYYY_HH_mm_ss');
            pdfMake.createPdf(docDefinition).download('PDF_' + date + '.pdf');

        };
    }
);