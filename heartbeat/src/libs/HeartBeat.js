export default class HeartBeat extends EventTarget {

    constructor(config = {}) {
        super()
        if (Object.prototype.toString.call(config) !== "[object Object]") {
            throw new Error("参数必须为对象！");
        }

        const defaultConfig = {
            url: null,
            pingMsg: 'ping',
            timeout: 5 * 1000, //心跳检测间隔 ms
            severTimeout: 3 * 1000, //服务器超时时间，也就是websocket关闭重启时间 ms
            reconnectTimeout: 3 * 1000, //websocket重连时间间隔 ms
        };

        this.ws = null
        this.lockReconnect = false //连接状态标识
        this.timeoutObj = null
        this.serverTimeoutObj = null

        const __config = Object.assign({}, defaultConfig, config);
        console.log(__config);
        Object.entries(__config).forEach(([key, val]) => (this[key] = val));

        this.initEventHandle()

        this.initWebSocket();
        return this;
    }

    //websocket初始化
    initWebSocket() {
        try {
            this.createWebSocket();
        } catch (e) {
            this.reconnect();
        }
    }

    initEventHandle() {
        this.onopen = event => {}
        this.onmessage = event => {}
        this.onerror = event => {}
        this.onclose = event => {}
    }

    send(data) {
        console.log('send');
        this.ws.send(data)
    }


    close() {
        console.log('close');
        this.ws.close()
    }

    // websocket实例
    createWebSocket() {
        this.ws = new WebSocket(this.url);
        //
        this.ws.addEventListener("open", (e) => {
            this.onopen(e)
            this.reset();
        });
        this.ws.addEventListener("message", (e) => {
            this.onmessage(e)
            this.reset();
        });
        this.ws.addEventListener("error", (e) => {
            this.onerror(e)
            this.reconnect();
        });
        this.ws.addEventListener("close", (e) => {
            this.onclose(e)
            this.reconnect();
        });
    }

    /* 心跳检测 */
    start() {
        this.timeoutObj = setTimeout(() => {
            // send内容不可更改！！！发送内容与后端商定
            if (this.ws.readyState === 1) {
                this.ws.send(
                    JSON.stringify({
                        heartbeat: "ping",
                    })
                );
            }
            this.serverTimeoutObj = setTimeout(() => {
                this.ws.close();
            }, this.severTimeout);
        }, this.timeout);
    }

    reset() {
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.start();
    }

    /* 计数，避免websocket重复连接 */
    reconnect() {
        if (this.lockReconnect) {
            return;
        }
        this.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        setTimeout(() => {
            this.initWebSocket();
            this.lockReconnect = false;
        }, this.reconnectTimeout);
    }
}