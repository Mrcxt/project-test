/*
 * @LastEditTime: 2020-04-16 16:30:55
 * @Description:
 * @Date: 2019-12-05 16:28:09
 * @Author: @虾哔哔
 */
import request from "@/api/modules/app";

export default {
    namespaced: false,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        getIssuesList(store, params) {
            return request.getIssuesList(params);
        },
        getIssuesDetails(store, params) {
            return request.getIssuesDetails(params);
        }
    }
};