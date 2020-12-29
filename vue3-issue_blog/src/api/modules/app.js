import http from "@/api/http";

export default {
    getIssuesList() {
        let url = `/repos/Mrcxt/blog/issues`;
        return http.get(url);
    },
    getIssuesDetails(params) {
        let number = params.number;
        let url = `/repos/Mrcxt/blog/issues/${number}`;
        return http.get(url);
    }
};