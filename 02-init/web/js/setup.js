//import React, { useEffect, useRef } from 'react';
//import MyTabs from './component/tabs'

const canRecord = true; // 写个判断逻辑

var bot = new ChatSDK({
  config: {

    navbar: {
      logo: '',
      title: '智能问答服务',
    },
    // 头像白名单
    avatarWhiteList: ['knowledge', 'recommend'],
    // 机器人信息
    robot: {
      avatar:'https://img-bsy.txrpic.com/preview/Element/00/00/89/11/E-891182-2418FE26A.png?imageMogr2/quality/90/thumbnail/320x%3E',
    },
    // 用户头像
    user: {
      avatar: 'https://img.zcool.cn/community/016a2e5f110b9fa801215aa097202c.png@1280w_1l_2o_100sh.png',
    },
    // 首屏消息
    messages: [
      {
        type: 'system',
        content: {
          text: '智能助理进入对话，为您服务',
        },
      },
      {
        type: 'text',
        content: {
          text: '智能助理为您提供服务，请问有什么可以帮您？',
        },
      },
      {
        type: 'card',
        content: {
          code: 'switch-location',
        },
      },

      {
        type: 'card',
        content: {
          code: 'knowledge',
          data: {
            text: '内容（支持富文本）'
          }
        },
        meta: {
          evaluable: true // 是否展示点赞点踩按钮
        }
      },
    ],
    // 快捷短语
    quickReplies: [
      { name: '推荐一些适合我的课程' },
      { name: '热门课程' },
      { name: '主流编程语言介绍' },
      { name: '该系统适用人群' },
      { name: '特色功能' },
      { name: '账户安全问题' },
      { name: '忘记密码' },
      { name: '专业就业方向' },
      { name: '热门就业方向' },
      { name: '未来职业规划' },
    ],
    // 输入框占位符
    placeholder: '输入您的问题',
    // 侧边栏
//    sidebar: [
//      {
//        title: '公告',
//        code: 'richtext',
//        data: {
//          text:
//            '<p>这里是富文本内容，支持<a href="https://chatui.io/sdk/getting-started">链接</a>，可展示图片<img src="https://gw.alicdn.com/tfs/TB17TaySSzqK1RjSZFHXXb3CpXa-80-80.svg" /></p>',
//        },
//      },
//      {
//        title: '推荐',
//        code: 'sidebar-suggestion',
//        data: [
//          {
//            label: '课程推荐',
//            list: [
//              '课程1',
//              '课程1',
//              '课程1',
//              '课程1',
//              '课程1',
//              '课程1',
//              '课程1',
//            ],
//          },
//          {
//            label: '专业热点',
//            list: [
//              '事件1',
//              '事件1',
//              '事件1',
//              '事件1',
//              '事件1',
//              '事件1',
//              '事件1',
//            ],
//          },
//        ],
//      },
//      {
//        title: '工具',
//        code: 'sidebar-tool',
//        title: '常用工具',
//        data: [
//          {
//            name: '工具1',
//            icon: '',
//            url:
//              '',
//          },
//        ],
//      },
//      {
//        type: 'card',
//        content: {
//          code: 'slot',
//          data: {
//            hideShortcuts: true,
//            list: [
//              {
//                title: '卡片1'
//              },
//            ]
//          }
//        }
//      }
//    ],

    //历史信息显示
    // （可选）配置按钮文案
    loadMoreText: '点击加载更多',
    // （可选）进入页面时，是否自动触发加载历史消息操作
    autoLoadMore: true,

    //点赞点踩&反馈
    feedback: {
          // 点赞后出的文本
          textOfGood: '感谢您的评价，我们会继续努力的哦！',
          // 点踩后出的文本
          textOfBad: '',
          // 点踩后是否显示反馈表单
          needFeedback: true,
          // 不满意原因列表
          options: [
            {
              // 选项值
              value: '我没有得到我想要的答案',
              // 选项显示文本，当与 value 相同时可省略
              label: '我没有得到我想要的答案',
            },
            {
              value: '界面太难用了',
            },
            {
              value: '我不认可这个规则',
            },
          ],
          // 原因是否必选
          isReasonRequired: true,
          // 提交反馈后出的文本
          textAfterSubmit: '',
        },

    // 当支持语音时默认用语音输入
    inputType: canRecord ? 'voice' : 'text',

    //加号扩展
    toolbar: [
      {
        type: 'speech',
        icon: 'mic',
        title: '语音输入'
      }
//      {
//        type: 'Icon', // 类型
//        icon: 'plus-circle', // 图标（svg），与下面的 img 二选一即可
//        img: '', // 图片（img），推荐用 56x56 的图，会覆盖 icon
//        title: '其他', // 名称
//      },
//      {
//        type: 'image',
//        icon: 'image',
//        title: '相册',
//      },

    ],
  },

  requests: {
    baseUrl: '',
    send(msg) {}, // 发送接口
    autoComplete(data) {}, // 联想输入接口
    evaluate(data) {}, // 点赞点踩接口
    feedback(data) {}, // 反馈接口


    /**
     *
     * 问答接口
     * @param {object} msg - 消息
     * @param {string} msg.type - 消息类型
     * @param {string} msg.content - 消息内容
     * @return {object}
     */
    send: function (msg) {
      const data = msg.content;

      // 发送文本消息时
      if (msg.type === 'text') {
        return {
          url: '//api.server.com/ask',
          data: {
            q: data.text,
          },
        };
      }
      // ... 其它消息类型的处理
    },

    //历史信息显示
    // 配置接口
    history: function () {
      return {
        url: '/api/history',
      };
    },

    /**
     *
     * 点赞点踩接口（可选）
     * @param {string} data.msgId - 消息ID
     * @param {string} data.type - 点赞: good, 点踩: bad
     * @return {object}
     */
    evaluate(data) {
      return {
        url: '/api/evaluate',
        data: {
          messageId: data.msgId,
          evaluateType: data.type,
        },
      };
    },

    /**
     *
     * 反馈（可选）
     * @param {string} data.msgId - message id
     * @param {string} data.category - 原因
     * @param {string} data.text - 其他原因
     * @return {object}
     */
    feedback(data) {
      return {
        url: '/api/feedback',
        data: {
          messageId: data.msgId,
          category: data.category,
          text: data.text,
        },
      };
    },

    //联想输入
    //请求接口配置
    autoComplete(data) {
      return {
        url: '/xiaomi/associate.do',
        data: {
          q: data.text,
        },
      };
    },

  },

  handlers: {
    track(data) {}, // 埋点
    parseResponse(res, requestType) {}, // 消息数据后处理函数
    onToolbarClick(item, ctx) {}, // 点击加号扩展中的按钮

    /**
     *
     * 解析请求返回的数据
     * @param {object} res - 请求返回的数据
     * @param {object} requestType - 请求类型
     * @return {array}
     */
    parseResponse: function (res, requestType) {
      // 根据 requestType 处理数据
      if (requestType === 'send' && res.Messages) {
        // 用 isv 消息解析器处理数据
        return isvParser({ data: res });
      }

      // 不需要处理的数据直接返回
      return res;
    },

    //加号扩展
    onToolbarClick: function (item, ctx) {
      // item 即为上面 toolbar 中被点击的那一项，可通过 item.type 区分
      // ctx 为上下文，可用 ctx.appendMessage 渲染消息等

      //如果选择语音输入
      if (item.type === 'speech') {
        // 这里改成 App 提供的 bridge 方法
        nativeInvoke('speech', (text) => {
          if (text) {
            // 通过 setText 更新输入框内容
            bot.appRef.current.setText(text);
          }
        });
      }

//      // 如果点的是“相册”
//      if (item.type === 'image') {
//        ctx.util.chooseImage({
//          // multiple: true, // 是否可多选
//          success(e) {
//            if (e.files) { // 如果有 h5 上传的图
//              const file = e.files[0];
//              // 先展示图片
//              ctx.appendMessage({
//                type: 'image',
//                content: {
//                  picUrl: URL.createObjectURL(file)
//                },
//                position: 'right'
//              });
//
//              // 发起请求，具体自行实现，这里以 OCR 识别后返回文本为例
//              requestOcr({ file }).then(res => {
//                ctx.postMessage({
//                  type: 'text',
//                  content: {
//                    text: res.text
//                  },
//                  quiet: true // 不展示
//                });
//              });
//
//            } else if (e.images) { // 如果有 app 上传的图
//              // ..与上面类似
//            }
//          },
//        });
//      }

    },

    //联想输入
    //后端返回数据处理
    parseResponse(res, requestType) {
      if (requestType === 'autoComplete') {
        return {
          list: res.AssociateList.slice(0, 8).map((t) => ({ title: t.Title })),
          keyword: res.Utterance,
        };
      }
      return res;
    },

  },
//  //如果 App 提供 bridge 来传图，增加此配置
//  bridge: {
//    openWindow(url) {}, // 打开新窗口
//    popWindow() {}, // 关闭页面
//    takePhoto(opts) {}, // 选择图片
//    previewImage(data) {}, // 预览大图
//
//    takePhoto(opts) {
//      // 调用 app 的传图，这里假定调用 nativeInvoke('takePhoto')
//      nativeInvoke('takePhoto', (res) => {
//        // 成功后返回图片给 onToolbarClick 使用
//        opts.success({
//          images: res
//        });
//      });
//    }
//  },

//  components: {
//    'sidebar-suggestion' : MyTabs
//  },

  // 语音输入配置
  makeRecorder({ ctx }) {
    return {
      canRecord,
      onStart() {
        // 开始录音
        nativeInvoke('startVoiceRecognition');
      },
      onEnd() {
        // 停止录音
        nativeInvoke('stopVoiceRecognition', (text) => {
          // 识别到文本
          ctx.postMessage({
            type: 'text',
            content: { text },
          });
        });
      },
      onCancel() {
        // 录音
        nativeInvoke('cancelVoiceRecognition');
      },
    };
  },

  // 长连接配置
  makeSocket({ ctx }) {},


});

bot.run();

//export default () => {
//  const wrapper = useRef();
//
//  useEffect(() => {
//    const bot = new window.ChatSDK({
//      root: wrapper.current,
//      config: { /* ... */ },
//      requests: { /* ... */ },
//      handlers: { /* ... */ },
//    });
//
//    bot.run();
//  }, []);
//
//  // 注意 wrapper 的高度
//  return <div style={{ height: '100%' }} ref={wrapper} />;
//}