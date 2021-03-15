let urls, urls2, urlsWebSocketBot, urlsWebSocketIoCustome;

/* 各个环境url参数具体值 */
//cms后端接口地址
urls = window.BASE_URL_CONFIG.urls + "/cms/";
urls2 = window.BASE_URL_CONFIG.urls + "/api/";

//mrs WebSocket机器人地址
urlsWebSocketBot = window.BASE_URL_CONFIG.urlsWebSocketBot + "/";

urlsWebSocketIoCustome = window.BASE_URL_CONFIG.urlsWebSocketIoCustome; // WebSocketIo转人工地址

export { urls, urls2, urlsWebSocketBot, urlsWebSocketIoCustome };
