var yunakQuizApp = angular.module('yunakQuiz.personalCabinet', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/personalCabinet', {
    templateUrl: 'modules/personalCabinet/quizesList.html',
    controller: 'PersonalCabinetCtrl'
  })
  .when('/admin/personalCabinet/profile', {
    templateUrl: 'modules/personalCabinet/profile.html',
    controller: 'PersonalCabinetProfileCtrl'
  })
  .when('/admin/personalCabinet/:state', {
    templateUrl: 'modules/personalCabinet/quizesList.html',
    controller: 'PersonalCabinetCtrl'
  })   
}])

 .constant('paginationConfig', {
            boundaryLinks: true,
            directionLinks: true,
            maxSize : 10,
            rotate: false,
            firstText: '≪',
            previousText: '<',
            nextText: '>',
            lastText: '≫'
        })

.controller('PersonalCabinetCtrl', ['$scope','QuizData', '$routeParams','$http','$location', function($scope, QuizData, $routeParams, $http, $location) {
  
  $scope.totalItems = 100;
  $scope.currentPage = 1;
  $scope.itemsPerPage= 10;

  $scope.tab = $routeParams.state || "published";
  $scope.search={};
  $scope.quizUrl = '#/assessments/';

  // $scope.getAll = function(){
  //   QuizData.getAll($scope.tab).success(function(data) {
  //       $scope.quizes = data;
  //   });
  // };

  $scope.pageChanged = function() {
    QuizData.getAll($scope.tab, $scope.currentPage).success(function(data, status, headers, config) {
        $scope.quizzes = data;
        $scope.totalItems = headers('Pagination-Total-Items');
    });
  };

  $scope.quizSearch = function(){
    QuizData.getSearch($scope.tab,$scope.search).success(function(data) {
        console.log(data);
        $scope.quizzes = data;
    });
  };

  $scope.deleteQuiz= function(quizId){
    QuizData.delete(quizId).success(function(data) {
      $scope.pageChanged();
  });
  };

  
  $scope.pageChanged();
}])

.controller('PersonalCabinetProfileCtrl', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http) {

  $scope.tab = 'profile';

}]);
