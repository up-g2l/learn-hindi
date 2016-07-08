"use strict";
	var myApp = angular.module('myApp',[]);	

//Filters
	myApp.filter('safeHTML',function($sce){
	    return function(input){
	        return $sce.trustAsHtml(input);
	    }
	});

	myApp.filter('range', function() {
	  return function(input, total) {
	    total = parseInt(total);

	    for (var i=325; i<total; i++) {
	    	var str = '&#2'+i+';'
	      input.push(str);
	    }

	    return input;
	  };
	});

//Controllers

		/* myApp.constant('HINDI_ALPHABETS', function($http){
			 
			var aksExm = null;
			$http.get('includes/hindiAkshar.json').then(function(res){
				this.aksExm =  res.data; console.log(res.data);
			},function(res){alert("Some Error");}
			);

			return aksExm;
		}); */

	myApp.controller('myCtrl', ['$scope','$sce', 'HINDI_ALPHABETS',function($scope,$sce, HINDI_ALPHABETS){
		//$scope.imgShow = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
		$scope.imageShow = false;
		$scope.isShuffled = false;
		$scope.currAks = "&#2325;"
		//$scope.aksConsonants = HINDI_ALPHABETS.aksConsonants;
		$scope.aksConsonants = angular.copy(HINDI_ALPHABETS.aksConsonants);	
		$scope.aksVowels = angular.copy(HINDI_ALPHABETS.aksVowels);
		$scope.matraPattern = HINDI_ALPHABETS.matraPattern;
		$scope.matra = HINDI_ALPHABETS.matra;
		$scope.matras = HINDI_ALPHABETS.matras;
		$scope.modalImg="";	
		$scope.withMatra = function(aksUtf,index){ 
				   	//$scope.matra = $scope.matraPattern.replace(new RegExp("QUEUQ", 'g'),aksUtf);
				   	//$scope.matras = 
				   	/*angular.forEach($scope.matras, function(value, key){
				   		$scope.matras[key] = aksUtf + value;
				   	});*/
				   	$scope.currAks = aksUtf;
				   	$scope.modalImg = $scope.aksConsonants[index].exm;
		        }
			

		$scope.toggleShuffle = function(){
			if(!$scope.isShuffled) {  
				$scope.aksConsonants = shuffle($scope.aksConsonants); 
				$scope.aksVowels = shuffle($scope.aksVowels);
			  	$scope.isShuffled = true; 
			}else{    
				$scope.aksConsonants = angular.copy(HINDI_ALPHABETS.aksConsonants);		
				$scope.aksVowels = angular.copy(HINDI_ALPHABETS.aksVowels);			   	
				$scope.isShuffled = false;
			   }

		}

		$scope.toggleAllImg = function(){
			$scope.imageShow = ! $scope.imageShow;
			alert($scope.imageShow);
		}

		function shuffle (sourceArray) { //Fisher-Yates-Durstenfeld shuffle		
			
			    for (var i = 0; i < sourceArray.length - 1; i++) {
			        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

			        var temp = sourceArray[j];
			        sourceArray[j] = sourceArray[i];
			        sourceArray[i] = temp;
			    }			
		    return sourceArray;
		}		
		
	}]);




	myApp.controller('tileCtrl',function($scope){
		$scope.imgShow = true; 
	});

	myApp.controller('modalCtrl',function($scope){
		$scope.akshar = $scope.$parent.akshar;
	});

//Directives

	myApp.directive('hindiWordTile',function(){
		return{
			restrict: 'E',			
			scope:{akshar:"=", imgdex:"=", action:"&"},
			templateUrl : 'templates/WordTile.html',
			controller: 'tileCtrl',
			link:function(scope, element, attribute){				
				scope.showMatraModal = function(){ 
					scope.$parent.withMatra(scope.akshar.utf8Code, scope.imgdex);
				}
			}			
		};
	});

		myApp.directive('hindiVowelTile',function(){
		return{
			restrict: 'E',
			controller: 'tileCtrl',
			scope:{akshar:"=", imgdex:"=", action:"&"},
			templateUrl : 'templates/HindiVowelTile.html',			
		};
	});

    myApp.directive('appModal',function(){
		return{
			restrict: 'E',
			templateUrl : 'templates/matraModal.html'
		};
	});


