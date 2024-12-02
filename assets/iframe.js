// 左按钮点击事件
document.querySelector('.leftBtn').addEventListener('click', () => {
    document.querySelector('.IframeMenu').scrollLeft -= totalWidth();  // 向左滚动一定距离，可根据需要调整
});

// 右按钮点击事件
document.querySelector('.rightBtn').addEventListener('click', () => {
    document.querySelector('.IframeMenu').scrollLeft += totalWidth();  // 向右滚动一定距离，可根据需要调整
});
function totalWidth() {
    const iframeMenu = document.getElementsByClassName('IframeMenu')[0];
    let totalWidth = 0;
    for (let link of iframeMenu.getElementsByTagName('a')) {
        const linkRect = link.getBoundingClientRect();
        const menuRect = iframeMenu.getBoundingClientRect();
        if (linkRect.left >= menuRect.left && linkRect.right <= menuRect.right && linkRect.top >= menuRect.top && linkRect.bottom <= menuRect.bottom)
            totalWidth += link.offsetWidth;
    }
    return totalWidth;
}
//Nav点击事件
document.querySelectorAll('Nav ul li a').forEach(NavA => NavA.addEventListener('click', e => {
    IframeRun.ClickNavA(NavA);
}));
document.querySelector('.IframeMenu').addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {//Iframe菜单点击事件
        let ToNavLink = document.querySelector(`Nav a[data-id="`+e.target.dataset.id+`"]`);
        IframeRun.ClickIframeA(e.target);
    }
    console.log(e.target.tagName)
    if (e.target.tagName === 'SPAN') {//Iframe菜单关闭点击事件
        e.stopPropagation();
        IframeRun.DeleteIframeMenu(e.target);
    }
});
var IframeRun = {
    //菜单被点击
    ClickNavA:function (that) {
        //判断是否是二级菜单
        if (!that.dataset.url || that.dataset.url==null || that.dataset.url=="#") {//不带链接的菜单
            //关闭所有ul父级菜单
            document.querySelectorAll('.MultiMenu ul').forEach(subMenu => subMenu.setAttribute('class', 'hide'));
            //显示当前link的ul菜单
            that.nextElementSibling.setAttribute('class', 'show');
            that.setAttribute('class', 'elect');
        } else//带链接的菜单
            this.ClickNavAUrl(that);
    },
    ClickNavAUrl:function (that) {
        this.DeleteAllLinkedClass(that)//删除所有链接的class
        that.setAttribute('class', 'elect');//当前链接加上class
        this.ActivateIframeMenu(that);//激活或添加Iframe菜单
        this.ActivateIframe(that);//激活或添加Iframe窗口
    },
    //删除所有链接的class
    DeleteAllLinkedClass:function (that){
        document.querySelectorAll('Nav a').forEach(subMenu => {
            subMenu.classList.remove('elect')
        });
        //如果有上级菜单
        if (that.parentNode.parentNode.parentNode.className=='MultiMenu') {
            that.parentNode.parentNode.previousElementSibling.setAttribute('class', 'elect');
        }
    },
    //激活或添加Iframe菜单
    ActivateIframeMenu: function (that) {
        // 先将所有的 IframeMenu a 元素的 'elect' 类移除
        document.querySelectorAll('.IframeMenu a').forEach(subMenu => {
            subMenu.classList.remove('elect');
        });

        let found = false;
        for (let IframeMenuA of document.querySelectorAll('.IframeMenu a')) {
            if (IframeMenuA.getAttribute('data-id') == that.getAttribute('data-id')) { // 已经有这个 IFrame 菜单
                IframeMenuA.setAttribute('class', 'elect');
                found = true;
            }
        }
        // 如果没有找到对应的菜单链接，则添加并激活
        if (!found && that.getAttribute('data-url')) {
            document.querySelector('.IframeMenu').insertAdjacentHTML('beforeend', '<a href="javascript:;" class="elect" data-id="' + that.getAttribute('data-id') + '">' + that.textContent + '&nbsp;&nbsp;<span>&times;</span></a>');
        }
        document.getElementsByClassName('IframeMenu')[0].scrollLeft = document.getElementsByClassName('IframeMenu')[0].scrollWidth;
    },
    //激活或添加Iframe窗口
    ActivateIframe:function (that){
        let found = false;
        for (let Iframe of document.querySelectorAll('.Iframe Iframe')) {
            if (Iframe.getAttribute('data-id') == that.getAttribute('data-id')){//已经有这个IFrame菜单
                Iframe.setAttribute('class', 'show');
                found = true;
            }else {
                Iframe.setAttribute('class', 'hide');
            }
        }
        //如果没有找到对应的菜单链接，则添加IFRAME窗口并激活
        if(!found && that.getAttribute('data-url'))
            document.querySelector('.Iframe').insertAdjacentHTML('beforeend', '<iframe class="show" data-id="'+that.getAttribute('data-id')+'" src="'+that.getAttribute('data-url')+'" frameBorder="0"></iframe>');

    },
    //Iframe菜单被点击
    ClickIframeA:function (that){
        // 先将所有的 IframeMenu 链接的 elect 类删除
        document.querySelectorAll('.IframeMenu a').forEach(link => link.classList.remove('elect'));
        // 给当前点击的链接添加 elect 类
        that.setAttribute('class', 'elect');
        //console.log()
        //转换为Nav下的链接，走下Nav链接的点击事件
        let ToNavLink = document.querySelector(`Nav a[data-id="`+that.getAttribute('data-id')+`"]`);
        this.ClickNavAUrl(ToNavLink);
        //找到对应的ul并操作
        let ToNavUl = ToNavLink.parentNode.parentNode
        document.querySelectorAll('.MultiMenu ul').forEach(subMenu => {
            subMenu.setAttribute('class', 'hide');
        });
        //显示当前link的ul菜单
        ToNavUl.setAttribute('class', 'elect');
    },
    DeleteIframeMenu:function (that){
        let ID = that.parentNode.getAttribute('data-id');//公共ID，data-id
        let ToIframe = document.querySelector('.Iframe iframe[data-id="'+ID+'"]')//对应的Iframe窗口
        if (that.parentNode.getAttribute('class')=='elect')
            this.ClickIframeA(that.parentNode.previousElementSibling);
        that.parentNode.parentNode.removeChild(that.parentNode);//删除当前Iframe链接
        ToIframe.parentNode.removeChild(ToIframe);//删除对应的Iframe窗口
    }
}
