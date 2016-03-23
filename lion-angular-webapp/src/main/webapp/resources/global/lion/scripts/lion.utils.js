/**
 * Created by wanglijun on 16/3/20.
 * lion angular utils 工具类
 */

var lion_utils = angular.module("lionUtils", ["ngResource"]);

lion_utils.factory("lionUtils", ["$http",
    function ($http) {
        function fetch(transCode, data, successfn, errorfn) {
            //successfn = successfn || $.noop;
            //errorfn = errorfn || $.noop;

            var params = {
                requestBody: JSON.stringify(data),
                transCode: transCode
            };

            $http.post("http://localhost:8080/admin/api.do")
                .success(function (data) {
                    successfn.call(this, data, arg);
                });
        }

        return {
            fetch: function (transCode, data, successfn, errorfn) {
                fetch(transCode, data, successfn, errorfn);
            }
        }
    }]);
