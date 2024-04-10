
function sendInitializationMessage(){
    const chatMessagesElement = document.getElementById('chat-messages');
    const botMessageElement = document.createElement('div');
    const botMessageContent = document.createElement('div');
//    const botAvatar = document.createElement('div');

    botMessageElement.className = 'bot-message';
    botMessageContent.textContent = '请问我能为你做什么？';
//    botAvatar.className = 'avatar bot';
//    botAvatar.style.backgroundImage = 'url("./imgs/bot-avatar.png")';

//    botMessageElement.appendChild(botAvatar);
    botMessageElement.appendChild(botMessageContent);

    chatMessagesElement.appendChild(botMessageElement);
}

document.getElementById('send-button').addEventListener('click', sendMessage);

async function sendMessage() {
    const inputElement = document.getElementById('message-input');
    const questionMessage = inputElement.value.trim();

    if (questionMessage !== '') {
        const chatMessagesElement = document.getElementById('chat-messages');
        const userMessageElement = document.createElement('div');
        const userMessageContent = document.createElement('div');
//        const userAvatar = document.createElement('div');
        const userMessageTime = document.createElement('div');


//        userAvatar.className = 'avatar user';
//        userAvatar.style.backgroundImage = 'url("./imgs/user-avatar.png")';
        userMessageTime.className = 'message-time';
        userMessageTime.textContent = getCurrentTime()
        userMessageElement.textContent = questionMessage;
        userMessageElement.className = 'user-message';

//        userMessageElement.appendChild(userAvatar);
        userMessageElement.appendChild(userMessageContent);
        userMessageElement.appendChild(userMessageTime);

        chatMessagesElement.appendChild(userMessageElement);

        try {
            const response = await fetch('http://localhost:80/get_answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: questionMessage })
            });

            if (response.ok) {
                const data = await response.json();
                const botMessageElement = document.createElement('div');
                const botMessageContent = document.createElement('div');
//                const botAvatar = document.createElement('div');
                const botMessageTime = document.createElement('div');

                botMessageElement.className = 'bot-message';
                botMessageContent.textContent = data.text;
//                botAvatar.className = 'avatar bot';
//                botAvatar.style.backgroundImage = 'url("./imgs/bot-avatar.png")';
                //botMessageTime.className = 'message-time';
                //botMessageTime.textContent = getCurrentTime();

//                botMessageElement.appendChild(botAvatar);
                botMessageElement.appendChild(botMessageContent);
                //botMessageElement.appendChild(botMessageTime);

                chatMessagesElement.appendChild(botMessageElement);
            } else {
                throw new Error('调用服务端接口出错');
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessageElement = document.createElement('div');
            errorMessageElement.textContent = 'Bot: 不好意思，服务端接口出错了';
            errorMessageElement.className = 'bot-message';
            chatMessagesElement.appendChild(errorMessageElement);
        }

        inputElement.value = ''; // 清空用户输入框
    }
}

document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        //阻止回车键的默认行为，即不让页面刷新或者表单提交
        event.preventDefault();
        sendMessage();
    }
});

function getCurrentTime() {
    const now = new Date();
    const timeString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    return timeString;
}

window.onload = function () {
    sendInitializationMessage()

    const voiceTxt = document.querySelector('#voice-txt');
    const startBtn = document.querySelector('#start-btn');
    const fixedBox = document.querySelector('#fixed-box');
    const fixedTxt = document.querySelector('#fixed-txt');
    const closeBtn = document.querySelector('#close-btn');
    let times = null;

    // 实例化迅飞语音听写（流式版）WebAPI
    const voice = new Voice({

        // 服务接口认证信息 注：apiKey 和 apiSecret 的长度都差不多，请要填错哦，！
        appId: '5ec244d5',
        apiSecret: '37912e3e3f205e2a6201ec290452470a',
        apiKey: '78b6c006f1f3df5e24d315e3dff09212',
        // 注：要获取以上3个参数，请到迅飞开放平台：https://www.xfyun.cn/services/voicedictation 【注：这是我的迅飞语音听写（流式版）每天服务量500（也就是调500次），如果你需求里大请购买服务量：https://www.xfyun.cn/services/voicedictation?target=price】

        onWillStatusChange: function (oldStatus, newStatus) {
            //可以在这里进行页面中一些交互逻辑处理：注：倒计时（语音听写只有60s）,录音的动画，按钮交互等！
            fixedBox.style.display = 'block';
        },
        onTextChange: function (text) {
            //监听识别结果的变化
            voiceTxt.value = text;
            fixedTxt.innerText = text;

            // 3秒钟内没有说话，就自动关闭
            if (text) {
                clearTimeout(times);
                times = setTimeout(() => {
                    this.stop(); // voice.stop();
                    fixedBox.style.display = 'none';
                }, 3000);
            };
        }
    });

    // 开始识别
    startBtn['onclick'] = function () {
        voice.start();
    };

    // 关闭识别
    closeBtn['onclick'] = function () {
        voice.stop();
        fixedBox.style.display = 'none';
    };
};