import {
    urls,
    urls2
} from "./config";

import axios from "axios";

axios.defaults.headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=utf-8"
};
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = urls;

export default {
    get(url, param) {
        return axios({
            method: "GET",
            url,
            params: param
        }).then(res => {
            return res;
        });
    },
    get_urls2(url, param) {
        return axios({
            method: "GET",
            url,
            baseURL: urls2,
            params: param
        }).then(res => {
            return res;
        });
    },
    post(url, data, config) {
        return axios({
            method: "POST",
            url,
            data: data,
            config: config
        }).then(res => {
            return res;
        });
    },
    post_urls2(url, data, config) {
        return axios({
            method: "POST",
            url,
            baseURL: urls2,
            data: data,
            config: config
        }).then(res => {
            return res;
        });
    },
    put(url, data) {
        return axios({
            method: "PUT",
            url,
            data
        }).then(res => {
            return res;
        });
    },
    delete(url) {
        return axios({
            method: "DELETE",
            url
        }).then(res => {
            return res;
        });
    }
};