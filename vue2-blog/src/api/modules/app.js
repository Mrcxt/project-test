/*
 * @LastEditTime: 2020-04-15 14:41:28
 * @Description:
 * @Date: 2019-12-05 19:46:31
 * @Author: @虾哔哔
 */
import http from "../http";

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