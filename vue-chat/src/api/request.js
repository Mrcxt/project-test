import axios from "./axios";

let get = function(param) {
    let url = "";
    return axios.get(url, param);
};

// 获取机器人知识点所有分类id，baseUrl为mrs
let GetKbCatesIds = function(botId) {
    let url = "get_kb_cates?bot_id=" + botId;
    return axios.get_urls2(url);
};

// 获取输入建议，baseUrl为mrs
let GetInputSuggest = function(params) {
    let url = "input_suggest";
    return axios.post_urls2(url, params);
};

export default {
    get,
    GetKbCatesIds,
    GetInputSuggest
};