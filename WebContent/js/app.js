angular.module('progressBarApp', [])
.controller('progressBarController',['$http','$scope',function progressBarController($http,$scope){
	var pBars=this;
	pBars.init= function(){
		pBars.progressBars = {};
		pBars.progressBarsColor = [];
		pBars.selectedBar = 0;
	}
	$http.get('http://pb-api.herokuapp.com/bars').success(function(data){
		pBars.progressBars=data;
		angular.forEach(pBars.progressBars.bars, function(objValue,index) {
			pBars.progressBarsColor[index]="light-blue";
		});
	});
	pBars.setBarsValue=function(btnValue){
		angular.forEach(pBars.progressBars.bars, function(objValue,index) {
			if(pBars.selectedBar == index){
				var tempValue=pBars.progressBars.bars[index]+(btnValue);
				if(tempValue > pBars.progressBars.limit){
					pBars.progressBars.bars[index]=pBars.progressBars.limit;
				}else if(tempValue < 0){
					pBars.progressBars.bars[index]= 0;
				}else{
					if(tempValue > 100){
						pBars.progressBarsColor[index]="red";
					}else{
						pBars.progressBarsColor[index]="light-blue";
					}
					pBars.progressBars.bars[index]=tempValue;
				}
			}
		});
	};
	
}]);
