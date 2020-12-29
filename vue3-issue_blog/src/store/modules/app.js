import request from "@/api/modules/app";

export default {
    namespaced: false,
    state: () => ({}),
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