let testdata = [
  {
    type: "tips",
    msg: "机器人上线了",
  },
  {
    avatar: "http://192.168.179.215/oss/objs/5cda94b0b187e30da62870f9",
    nickname: "对内paas～～～～",
    description: "备注",
    enable_common: 1,
    enable_bottom_common: 0,
    common_language: "您可能关心以下常见问题：",
    common_questions: [
      '"><script>alert`xss`</script>',
      "换行",
      "测试测试测试",
      "xss<img src=”1” onerror=alert(1)>",
      "漏洞<img src=”1” onerror=alert(1)>",
      "q1",
      "这是一张2",
    ],
    enable_emoji: 1,
    satisfied_switch: 1,
    enable_is_useful: 1,
    wrong_text: "暂时只支持文字的回复哦～",
    association_input_switch: 1,
    enable_bottom_flow: 1,
    bottom_flows: [
      {
        a12: "asdf",
      },
      {
        小赵测试1: "小赵测试1",
      },
      {
        "111": "",
      },
      {
        sansna: "",
      },
      {
        aaa: "aaaa",
      },
      {
        撒大声地所多湿哒哒撒大所多所多湿哒哒大撒多湿哒哒所: "",
      },
      {
        槽位节点: "",
      },
      {
        a11: "",
      },
      {
        测试流程dd: "查询天气",
      },
    ],
    enable_bottom_hotqs: 1,
    hot_questions: [],
    log: {
      user_type: 1,
      msg_time: "2019-11-18 11:36:25",
    },
  },
  {
    msg: "吃什么",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:36:43",
    },
  },
  {
    msg: "<p>吃什么</p>",
    log: {
      msg_time: "2019-11-18 11:36:46",
      source: 0,
      similar_language: "我猜您想问：",
      relation_language: "为您找到相关问题：",
      recommend_clicked: 0,
      channel: 1,
      user_type: 1,
      msg_type: 0,
      ori_question: "吃什么",
      distribute_channel_label: "测试窗口",
      sentiment: "neutral",
    },
    prompts: [
      {
        button: "今天吃满汉",
        text: "今天吃满汉",
      },
      {
        button: "吃大蒜",
        text: "吃大蒜",
      },
    ],
    turn_human: false,
    sid: "971ef9c4-4021-46c2-ae5f-70fe09a6998d",
    botid: "501f522a99184b789b8e81d504380860",
    debug: {
      intent: "今天吃什么",
    },
    receiver: "arale-bot-ws-3",
    keywords: [],
    spellcheckflag: false,
    similar_guide_language: "我猜您想问：",
    relation_guide_language: "为您找到相关问题：",
    promptsObj: {
      promptsOriginArr: [
        {
          button: "今天吃满汉",
          text: "今天吃满汉",
        },
        {
          button: "吃大蒜",
          text: "吃大蒜",
        },
      ],
      promptsArr: [
        {
          button: "今天吃满汉",
          text: "今天吃满汉",
        },
        {
          button: "吃大蒜",
          text: "吃大蒜",
        },
      ],
      promptsNum: 1,
      promptsTotal: 1,
    },
  },
  {
    msg: "今天吃满汉",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:36:48",
    },
  },
  {
    msg: "今天吃满汉",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:36:48",
    },
  },
  {
    msg: "今天吃满汉",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:36:48",
    },
  },
  {
    msg: "今天吃满汉",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:36:48",
    },
  },
  {
    msg: "今天吃满汉",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:36:48",
    },
  },
  {
    msg: "今天吃满汉",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:36:48",
    },
  },
  {
    msg: "今天吃满汉",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:36:48",
    },
  },
  {
    msg: "<p>好哒，吃满汉</p>",
    log: {
      msg_time: "2019-11-18 11:36:52",
      source: 0,
      similar_language: "我猜您想问：",
      relation_language: "为您找到相关问题：",
      recommend_clicked: 0,
      channel: 1,
      user_type: 1,
      msg_type: 0,
      ori_question: "今天吃满汉",
      distribute_channel_label: "测试窗口",
      sentiment: "neutral",
    },
    turn_human: false,
    sid: "971ef9c4-4021-46c2-ae5f-70fe09a6998d",
    botid: "501f522a99184b789b8e81d504380860",
    debug: {
      choice: "今天吃满汉",
    },
    receiver: "arale-bot-ws-3",
    keywords: [],
    spellcheckflag: false,
    similar_guide_language: "我猜您想问：",
    relation_guide_language: "为您找到相关问题：",
  },
  {
    msg: "不吃了",
    log: {
      user_type: 0,
      msg_type: 0,
      msg_time: "2019-11-18 11:37:03",
    },
  },
  {
    msg: "<ul>\n<li>1111</li>\n</ul>",
    log: {
      msg_time: "2019-11-18 11:37:06",
      source: 5,
      confidence: 0,
      similar_language: "我猜您想问：",
      relation_language: "为您找到相关问题：",
      recommend_clicked: 0,
      channel: 1,
      user_type: 1,
      msg_type: 0,
      ori_question: "不吃了",
      distribute_channel_label: "测试窗口",
      sentiment: "neutral",
    },
    turn_human: false,
    sid: "971ef9c4-4021-46c2-ae5f-70fe09a6998d",
    botid: "501f522a99184b789b8e81d504380860",
    debug: {},
    receiver: "arale-bot-ws-3",
    keywords: [],
    spellcheckflag: false,
    similar_guide_language: "我猜您想问：",
    relation_guide_language: "为您找到相关问题：",
  },
];

export default testdata;
