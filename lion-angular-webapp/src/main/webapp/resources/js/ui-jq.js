'use strict';

/*
* @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
*/

angular.module('ui.jq',['ui.load']).
	value('uiJqConfig',{}).
	directive('uiJq',['uiJqConfig','JQ_CONFIG','uiLoad','$timeout',function (uiJqConfig, JQ_CONFIG, uiLoad, $timeout){
		return {
			restrict:'A',
			compile:function (tElm,tAttrs){
				if(!angular.isFunction(tElm[tAttrs.uiJq]) && !JQ_CONFIG[tAttrs.uiJq]){
					throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
				}
				var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

				return function (scope,elm,attrs){
					function getOptions(){
						var linkOptions = [];

						if(attrs.uiOptions){
							linkOptions = scope.$eval('['+ attrs.uiOptions +']');
							if(angular.isObject(options) && angular.isObject(linkOptions[0])){
								linkOptions[0] = angular.extend({},options,linkOptions[0]);
							}
						}else if(options){
							linkOptions = [options];
						}
						return linkOptions;
					}

					if(attrs.ngModel && elm.is('select,input,textarea')){
						elm.bind('change',function(){
							elm.trigger('input');
						});
					}

					function callPlugin(){
						//console.log(attrs.uiMethod);
						$timeout(function(){
							if(attrs.uiMethod){
								var obj = attrs.uiJq;
								var om = attrs.uiMethod;
								obj[om].apply(obj,getOptions());
							}else{
								elm[attrs.uiJq].apply(elm,getOptions());
							}
						},0,false);
					}

					function refresh(){
						if(attrs.uiRefresh){
							scope.$watch(attrs.uiRefresh,function(){
								callPlugin();
							});
						}
					}

					if(JQ_CONFIG[attrs.uiJq]){
						uiLoad.load(JQ_CONFIG[attrs.uiJq]).then(function(){
							callPlugin();
							refresh();
						}).catch(function(){

						});
					}else{
						callPlugin();
						refresh();
					}

				}
			}
		}
	}]);

















