<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="keywords" content="keywords">
        <meta name="description" content="description">
        <meta name="author" content="Xaeja.Woo,wx:libing_0507">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,shrink-to-fit=no">
        <meta name="format-detection" content="telephone=no">
        <title>Title</title>
        <link rel="stylesheet" href="Public/Assets/normalize.css/normalize.css">
        <link rel="stylesheet" href="Public/Iframe.css?<?php echo microtime();?>">
    </head>
    <body>
        <Grid>
            <Header>
                <span>Management Platform</span>
            </Header>
            <Nav>
                <ul>
                    <li><a href="javascript:;" class="elect" data-id="0" data-url="./view/c.html"><span>首页</span></a></li>
                    <li class="MultiMenu">
                        <a href="javascript:;" data-id="10"><span>菜单 1</span></a>
                        <ul class="hide">
                            <li><a href="javascript:;" data-id="11" data-url="./view/c1.html"><span>菜单 1-1</span></a></li>
                            <li><a href="javascript:;" data-id="12" data-url="./view/c2.html"><span>菜单 1-2</span></a></li>
                            <li><a href="javascript:;" data-id="13" data-url="./view/c3.html"><span>菜单 1-3</span></a></li>
                            <li><a href="javascript:;" data-id="14" data-url="./view/c4.html"><span>菜单 1-4</span></a></li>
                        </ul>
                    </li>
                    <li class="MultiMenu">
                        <a href="javascript:;" data-id="20"><span>菜单 2</span></a>
                        <ul class="hide">
                            <li><a href="javascript:;" data-id="21" data-url="./view/c5.html"><span>菜单 2-1</span></a></li>
                            <li><a href="javascript:;" data-id="22" data-url="./view/c6.html"><span>菜单 2-2</span></a></li>
                        </ul>
                    </li>

                </ul>

            </Nav>

            <div class="IframeNav">
                <a href="javascript:;" class="rightBtn">&raquo;</a>
                <div class="IframeMenu">
                    <a href="javascript:;" class="elect" data-id="0">首页</a>
                </div>
                <a href="javascript:;" class="leftBtn">&laquo;</a>
            </div>

            <div class="Iframe">
                <iframe class="show" data-id="0" src="./View/c.html" frameborder="0"></iframe>
            </div>

        </Grid>

    </body>

    <script src="Public/Iframe.js?<?php echo microtime();?>"></script>
</html>