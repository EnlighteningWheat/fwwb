document.addEventListener('DOMContentLoaded', function() {
    const clearBtn = document.getElementById('clean-button');
    const submitBtn = document.getElementById('search-button');
    const refreshBtn = document.getElementById('refresh-button');

    clearBtn.addEventListener('click', function() {
        document.getElementById('searchInput').value = '';
    });

    submitBtn.addEventListener('click', function() {
        const inputValue = document.getElementById('searchInput').value;
        // 在这里执行提交操作
        console.log('提交内容:', inputValue);
    });

    refreshBtn.addEventListener('click', function() {
        // 在这里执行刷新操作
        console.log('刷新推荐内容');
    });

    // 动态生成推荐内容（示例）
    const contentContainer = document.querySelector('.content');
    for (let i = 0; i < 6; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = '<div class="ancient-poetry"><p class="ancient-poetry-title">标题</p><p class="ancient-poetry-author"><img src="imgs/author-img.png"><span>作者 （朝代）</span></p><p>古诗内容<br>古诗内容</p></div><div class="button-container"><button class="collectBtn"><img src="imgs/collect.png"/></button><button class="likeBtn"><img src="imgs/like.png"/></button></div>';
//        <div class="item">
//            <div class="ancient-poetry">
//                <p class="ancient-poetry-title">夜雨寄北</p>
//                <p class="ancient-poetry-author">
//                    <img src="imgs/author-img.png" alt="李商隐">
//                    <span>李商隐 （唐代）</span>
//                </p>
//                <p>君问归期未有期，巴山夜雨涨秋池。<br>
//                    何当共剪西窗烛，却话巴山夜雨时。</p>
//            </div>
//            <div class="button-container">
//                <button class="collectBtn"><img src="imgs/collect.png"/></button>
//                <button class="likeBtn"><img src="imgs/like.png"/></button>
//            </div>
//        </div>
        contentContainer.appendChild(item);
    }
});