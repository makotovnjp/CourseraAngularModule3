/**
 * Created by Nguyen Cong Thanh on 2016/11/09.
 */
(function () {
'use strict';
    angular.module("NarrowItDownApp",[])
        .controller('NarrowItDownController',NarrowItDownController)
        .service('MenuSearchService',MenuSearchService)
        .directive('foundItems',foundItemsDirective)
    ;

    function foundItemsDirective() {
      var ddo = {
        // templateUrl: 'FoundItemList.html',
        // scope:{
        //   items: '=foundItems'
        // }
      };

      return ddo;
    }

    NarrowItDownController.$inject = ['$scope','MenuSearchService'];
    function NarrowItDownController($scope,MenuSearchService) {
      var narCtrl = this;
      $scope.searchterm = "Soup";

      narCtrl.found = MenuSearchService.getMatchedMenuItems($scope.searchterm);

      
      console.log(narCtrl.found);

    }

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url:"https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];

                for (var item of result.data.menu_items) {
                  if( item.name.indexOf(searchTerm) != -1) {
                      foundItems.push(item);
                  }
                }

                return foundItems;
            }).catch(function (error) {
                console.log("Error Ocurred");
            });
        }
    }

})();
