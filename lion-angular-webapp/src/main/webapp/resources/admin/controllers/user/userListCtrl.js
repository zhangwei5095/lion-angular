/**
 * Created by wash on 16/3/28.
 */
var DBApp = angular.module('DBApp');

DBApp.controller("userListCtrl", ['$scope', '$modal', 'dbUtils', userListCtrl]);

function userListCtrl($scope, $modal, dbUtils) {
    //!!formGridOptions-START!!
    var formGridOptions = {
        form: {
            settings: {
                cols: 2
            },
            fields: [
                {name: "realnameZh", label: "用户名称", type: "text", required: true, placeholder: "用户名称", readonly: true, labelCols: "3"}
            ]
        },
        grid: {
            settings: {
                transCode: "system.user.list",
                autoLoad: true,
                page: {pageSize: 10},
                showCheckBox: true
            },
            header: [
                {name: "用户名称(英文)", width: "18%", field: "realnameEn"},
                {name: "用户名称(中文)", width: "12%", field: "realnameZh"},
                {name: "用户ID", width: "12%", field: "employeeCode"},
                {name: "描述", width: "12%", field: "description"},
                {name: "可编辑", width: "10%", field: "editable"},
                {name: "创建时间", width: "18%", field: "createdDate"},
                {name: "更新时间", width: "18%", field: "updatedDate"},
                
            ],
            rowOperation: {show: false}
        }
    }
    var formGridEvents = {
            grid: {
                fieldEvents: {

                },
                operationEvents: [{
                    name: "新增", class: "btn-success", icon: "tianjia", click: function () {
                        //quit();
                    }
                },{
                    name: "编辑", class: "btn-info", icon: "luru", click: function () {
                        //quit();
                    }
                },{
                    name: "删除", class: "btn-danger", icon: "shanchu", click: function () {
//                        quit();
                    }
                }]
            }
        };

        $scope.lionFormGrid = {options: formGridOptions, events: formGridEvents};

        //机构树选择后的回调事件
//        $scope.dbOrgTree = {settings: {noCache: true, showDivision: true, showDepartment: true}};
//        $scope.dbOrgTree.onOrgSelected = function (item) {
//            $scope.lionFormGrid.setFormDataField("organizationName", item['orgNamePath']);
//            $scope.lionFormGrid.setFormDataField("organizationId", item['orgId']);
//            $scope.lionFormGrid.setFormDataField("departmentId", item['departId']);
//        };
//
//
//        /**
//         * 删除操作
//         */
//        function quit() {
//            var selectRows = $scope.lionFormGrid.getAllSelectRows();
//            if (selectRows.length === 0) {
//                return;
//            }
//            var ids = dbUtils.getFieldArray(selectRows, "id");
//            dbUtils.confirm("确定要对所选项目属性进行<span style='color: red'>删除</span>操作?", function () {
//                dbUtils.post('partyRoleQuit', {'ids': ids}, function (data) {
//                    if (data) {
//                        dbUtils.error(data + "以上用户不能删除，请先迁移其所辖的代理机构！")
//                    } else {
//                        dbUtils.success("用户删除成功！!");
//                    }
//                    $scope.lionFormGrid.reLoadData();
//                }, function (error) {
//                    dbUtils.error("用户删除处理异常!" + error);
//                });
//            });
//        }
//    /**
//     * 查看审核记录
//     * @param currentRecord
//     */
//    function auditStatusHistory(currentRecord) {
//        $modal.open({
//            animation: true,
//            templateUrl: 'views/roles.json/partNoAuditHistoryView.html',
//            controller: 'partNoAuditHistoryCtrl',
//            size: "lg",
//            backdrop: "static",
//            resolve: {
//                source: function () {
//                    return currentRecord;
//                }
//            }
//        });
//    }
}