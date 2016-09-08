var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', ['$scope',function ($scope) {

    $scope.list_arr = [];
    $scope.list_arr.push({name:'', count:''});

    $scope.list_arr_final = [];

    $scope.generate = function() {

        $scope.list_arr_final = [];

        for (i in $scope.list_arr) {
            if ($scope.list_arr.hasOwnProperty(i)) {
                if (
                    $scope.list_arr[i].name != '' &&
                    $scope.list_arr[i].name != null &&
                    $scope.list_arr[i].count != '' &&
                    $scope.list_arr[i].count != null
                ) {
                    $scope.list_arr_final.push($scope.list_arr[i])
                }
            }

        }
    };

    $scope.clear = function() {
        if(confirm("Are you sure you want to clear this entire table?")==true) {
            $scope.list_arr = [{name:'', count:''}];
        }
    };

    $scope.insert = function() {
        $scope.list_arr.push({name: '', count: ''});
    };

    $scope.delete = function(index) {
        if(confirm("Are you sure you want to delete this entry?")==true) {
            $scope.list_arr.splice(index,1);
        }
    };

    $scope.catchEnterKeyOnName = function(event, index) {
        if (event.keyCode == 13) {
            var we_name = document.getElementById('id_name_' + index);
            if (we_name.value != '' && we_name.value != null) {
                var we_count = document.getElementById('id_count_' + index);
                we_count.focus();
            }
        }
    };

    $scope.catchEnterKeyOnCount = function(event, index) {
        if (event.keyCode == 13) {
            var list_arr_length = $scope.list_arr.length;

            if (
                index == list_arr_length - 1 &&
                $scope.list_arr[list_arr_length -1].name != '' &&
                $scope.list_arr[list_arr_length -1].count != ''
            ) {
                $scope.insert();
            }
        }

        var we = document.getElementById('id_count_' + index);

        if (!isNumeric(we.value)) {
            we.value = null;
        }
    };


    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

}]);

myApp.directive('customAutofocus', function() {
    return{
        restrict: 'A',

        link: function(scope, element, attrs){
            scope.$watch(function(){
                return scope.$eval(attrs.customAutofocus);
            },function (newValue){
                if (newValue === true){
                    element[0].focus();//use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
                }
            });
        }
    };
});
