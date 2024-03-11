// 表单页JavaScript文件

/**
 * 查询DOM节点
 * @param{string} 查询语法，例如："#id"".className"
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector
 * @returns
 */
function $(selector){
    return document.querySelector(selector);
}

/**
 * 实现图片预览
 */
 function handlePreview(){
    const uploadEl = $('#upload');//图片上传input
    const previewEl = $('#preview');//图片预览
    uploadEl.addEventListener('change',function(){
        console.log('选择文件',uploadEl.files[0]);
        //测试代码
        //previewEl.src = './data/pic/pic-1/png';

        const reader=new FileReader();
        //监听load事件
        reader.addEventListener('load',function(){
            console.log('显示图片');
            previewEl.src=reader.result;//图片base64
        });
        // 读取文件。读取完成后会触发load事件
        // @see https://developer.mozilla.org/zh_CN/docs/Web/API/FileReader/readAsDataURL
        reader.readAsDataURL(uploadEl.files[0]);
    });
 }
 handlePreview();

 //图片上传
 async function uploadFile(){
    //1.处理输入数据
    const name = $("#name").value.trim();
    const author = $("#author").value.trim();
    const desc = $('#desc').value.trim();
    const fileObj = $("#upload").files[0];//js 获取文件对象
    if(!fileObj){
        alert('请选择图片');
        return;
    }
    if(!name){
        alert('请输入名称');
        return;
    }
    if(!author){
        alert('请输入拍摄者');
        return;
    }
    if(!desc){
        alert('请输入描述信息');
        return;
    }

    //2.构建FormData
    const form = new FormData();//FormData对象
    form.append("file",fileObj);//文件对象
    form.append("name",name);
    form.append("author",author);
    form.append("desc",desc);

    //console.log('表单内容',...form);

    //3.提交FormData
    console.log('开始上传',{fileObj,name,author,desc});
    try{
        const response = await fetch('/pic/upload',{
            method:'POST',
            body:form
        });
        console.log('状态码',response.status);

        const result = await response.json();
        if(result.success){
            alert("上传成功！");
            window.location.href = 'index.html';
            return;
        }
    }catch(e){
        console.error('上传失败',e);
    }
    alert("上传失败！");
 }