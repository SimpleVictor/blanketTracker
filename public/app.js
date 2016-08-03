(function(){

    angular.module('myApp', [])
        .controller("AppController", function($http){
           var vm = this;
            vm.mylist = [];
            vm.myItsyList = [];

            vm.anotherOne = function(){
                $http.get('/abbylist').then(function(data, error){
                    if(error){
                        console.log(error);
                    }
                    if(data){
                        console.log(data.data);
                        var abbyObject = {
                            abbyDate: Date.now(),
                            abbyMessage: data.data
                        };
                        vm.mylist.push(abbyObject);
                        var elem = document.getElementById('scrollMe');
                        elem.scrollTop = elem.scrollHeight;
                        setTimeout(vm.anotherOne, 100);

                    }
                })
            };

            vm.anotherTwo = function(){
                $http.get('/itsybitsy').then(function(data, error){
                   if(error){
                       console.log(error);
                   };
                   if(data){
                       // vm.myItsyList = data.data;
                       var theDate = {
                           date: Date.now(),
                           data: data.data
                       }
                       vm.myItsyList.push(theDate);
                       var elem = document.getElementById('itsyscrollMe');
                       elem.scrollTop = elem.scrollHeight;
                       setTimeout(vm.anotherTwo, 2000);
                   };
                });
            };


            // vm.anotherOne();
            vm.anotherTwo();
        });

})();
