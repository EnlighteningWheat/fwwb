// 首页JavaScript文件

// 使顶部导航栏下滑显示，上滑透明
// 添加滚动事件
window.addEventListener('scroll', function() {
    //获取元素
    var nav = document.querySelector("nav");  //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
    // 添加类
    nav.classList.toggle("sticky", window.scrollY > 0 )
});


//步骤一：查询pics节点
/**
 * 查询DOM节点
 * @param{string} 查询语法，例如："#id"".className"
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector
 * @returns
 */
function $(selector){
    return document.querySelect(selector);
}

// //练习代码1
// //console.log($('#pics'));

// //步骤二：向列表中添加一个静态标签
// //HTML和DOM操作
// //练习代码2
// /**
//  * 向页面中追加图片
//  * @param {object} item 图片数据
//  */
// function appendPic(){
//     const html=
//     `<li class="gallary-item">
//         <img src="./data/pic/pic-3.png"></img>
//         <p class="name">波浪</p>
//         <p class="author">by 蚂蚁</p>
//         <p class="desc">木落雁嗷嗷，洞庭波浪高</p>
//     </li>`;

//     $('#pics').innerHTML += html;
// }

// appendPic();

// //步骤三：封装查询方法
// //fetch
// //练习代码3
// /**
//  * 查询图片
//  * @see:https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
//  */
// async function fetchPics(){
//     try{
//             //TODO:正式接口为/pic/list,暂时用/data/data-test.json测试验证
//             const response=await fetch('/pic/list',{
//                 method: "GET"
//             });
//             console.log('返回状态',response.status);
//             const result =await response.json();
//             console.log('返回内容',result);
//     }catch(e){
//         console.error('查询图片发生错误',e);
//         alert('查询图片发生错误');
//     }
// }

// fetchPics();

//添加DOM节点
//封装appendPic方法
/**
  *向页面中追加图片
  *@param {object} item 图片数据
  */
 function appendPic(item){
    const{
        name,
        author,
        desc,
        picPath
    } = item || {}

    const html =
    `<li class="gallary-item">
            <img src="./${picPath}"></img>
            <p class="name">${name}</p>
            <p class="author">by ${author}</p>
            <p class="desc">${desc}</p>
        </li>`;

    $('#pics').innerHTML += html;
 }

 //练习代码4
 async function fetchPics(){
    try{
        //TODO：正式接口为/pc/list,暂时用/data/data-test.json测试检验
        const response =await fetch('/pc/list',{
            method: "GET"
        });
        console.log('返回状态',response.status);
        const result=await response.json();

        result.data.forEach(item => {
            appendPic(item);//图片数据{name,author,desc,picPath}
        })
    }catch(e){
        console.error('查询图片发生错误',e);
        alert('查询图片发生错误');
    }
    fetchPics();
 }