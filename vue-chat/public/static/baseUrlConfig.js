/*
 * @LastEditTime: 2019-11-27 11:40:04
 * @Description:
 * @Date: 2019-11-22 10:41:25
 * @Author: @虾哔哔
 */
const httpStr = "http://";
const wsStr = "ws://";
const baseUrlBot = "192.168.179.215"; //内网测试环境215

// const httpStr = "https://";
// const wsStr = "wss://";
// const baseUrlBot = "aidev2.yuntongxun.com"; //外网测试环境

/* 以下无需修改 */

window.BASE_URL_CONFIG = {
  urls: httpStr + baseUrlBot, // cms后端接口地址
  urlsWebSocketBot: wsStr + baseUrlBot, //WebSocket机器人地址
  urlsWebSocketIoCustome: httpStr + "192.168.179.178:9081/" //WebSocketIo转人工地址
};
