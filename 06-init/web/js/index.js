// 首页JavaScript文件
var currentActiveLabel = null; // 用于存储当前激活的标签

// 默认显示“数据录入”的界面
window.onload = function() {
    showContent('content1');

    const iframe = document.getElementById('content4');
    if (!iframe) {
        console.error('Cannot find iframe element!');
        return;
    }

    iframe.onload = function() {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const micButtons = iframeDoc.querySelectorAll('.Btn.Btn--lg.IconBtn[type="button"][data-icon="mic"][data-tooltip="语音输入"][aria-label="语音输入"]');
        if (micButtons) {
            micButtons.forEach(button => {
                button.id = 'start-btn';
            });
        }

        const userInputTextareas = iframeDoc.querySelectorAll('.Input.Input--outline.Composer-input[type="text"][placeholder="输入您的问题"][rows="1"][enterkeyhint="send"]');
        if (userInputTextareas) {
            userInputTextareas.forEach(input => {
                input.name = 'voice';
                input.id = 'voice-txt';
            });
        }
    };
};

// 添加事件监听器
var labels = document.querySelectorAll('.sidebar label');
labels.forEach(function(label) {
    label.addEventListener('click', function() {
        var target = this.getAttribute('data-target');
        showContent(target);
    });
});

//点击标签后内容的切换
function showContent(id) {
    // 隐藏所有内容
    var contents = document.querySelectorAll('.content > div[id^="content"]');
    contents.forEach(function(content) {
        content.style.display = 'none';
    });

    // 取消所有标签的选中状态
    var labels = document.querySelectorAll('.sidebar label');
    labels.forEach(function(label) {
        label.classList.remove('active');
    });

    // 显示选定内容
    var selectedContent = document.getElementById(id);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }

    // 设置选中标签的样式
    var selectedLabel = document.querySelector('.sidebar label[data-target="' + id + '"]');
    if (selectedLabel) {
      selectedLabel.classList.add('active');
    }

}

//登录注册弹窗的切换
function toggleLoginWindow() {
    var loginWindow = document.getElementById('loginWindow');
    loginWindow.style.display = (loginWindow.style.display === 'block') ? 'none' : 'block';
}
function toggleRegisterWindow() {
    var registerWindow = document.getElementById('registerWindow');
    registerWindow.style.display = (registerWindow.style.display === 'block') ? 'none' : 'block';
}

//登录功能实现
async function login(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('请输入用户名和密码');
        return;
    }

    const response = await fetch('/web/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
    });

    const result = await response.json();

    // Handle the result as needed
    if (response.ok) {
        // 登录成功，隐藏登录按钮并显示用户信息
        hideLoginButton();
        showUserInfo(username); // 显示用户信息

        // Successful login
        alert("登录成功！");
        console.log(result.success);
    } else {
        // Display error message to the user
        alert(result.error);
    }
}

// 隐藏登录按钮
function hideLoginButton() {
    const loginInfo = document.querySelector('.login-info');
    loginInfo.style.display = 'none';
}

// 显示用户信息
function showUserInfo(username) {
    const userInfoContainer = document.getElementById('user-info-container');
    const usernameElement = document.getElementById('username');

    // 设置用户名
    usernameElement.textContent = username;

    // 显示用户信息容器
    userInfoContainer.style.display = 'flex'; // 使用 Flex 布局
}

// 退出登录操作
function logout() {
    // 这里添加退出登录的逻辑，例如清除用户信息并显示登录按钮
    // 清除用户信息
    const userInfoContainer = document.getElementById('user-info-container');
    // 隐藏用户信息显示容器
    userInfoContainer.style.display = 'none';
    // 显示登录按钮
    const loginInfo = document.querySelector('.login-info');
    loginInfo.style.display = 'block';
}

//注册功能
async function register(event) {
    event.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (!username || !password || !confirmPassword) {
        alert('请输入所有必填字段');
        return;
    }

    if (password !== confirmPassword) {
        alert('密码和确认密码不一致');
        return;
    }

    const response = await fetch('/web/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
    });

    const result = await response.json();

    // Handle the result as needed
    if (response.ok) {
        // Successful login
        alert("注册成功！");
        console.log(result.success);
    } else {
        // Display error message to the user
        alert(result.error);
    }
}
