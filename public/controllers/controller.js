var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    var show = [];
    // Function to refresh the page, called after operations.
    var refresh = function () {
        $http.get('/jobs').success(function (response) {
            console.log("I got the data I requested");
            $scope.jobs = response;
            $scope.job = "";
        });
    };

    // Preliminary loading of page
    refresh();

    // Function to add a Job to the queue
    $scope.addJob = function () {
        console.log($scope.job);
        $http.post('/jobs', $scope.job);
            refresh();

    };

    // Function to remove complected job data from the server
    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/jobs/' + id);
            refresh();

    };

}]);