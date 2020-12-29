import HeartBeat from './libs/HeartBeat'

// test
const IM = new HeartBeat({
    url: 'ws://123.207.136.134:9010/ajaxchattest'
})

console.log(IM);

IM.addEventListener('onmessage', e => console.log('onmessage'))
IM.onclose = e => console.log('onclose');

setTimeout(() => {
    IM.send('aaa')
}, 1000);

setTimeout(() => {
    IM.close()
}, 3000);