<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>使用须知 - 固安拼车</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <link rel="stylesheet" href="<?php echo $base_url; ?>static/iconfont.css">
    <link rel="stylesheet" href="<?php echo $base_url; ?>static/style.css">
</head>
<body>
<ul class="menu">
    <li class="<?php if ($cur == 'driver') {echo 'active';} ?>"><a href="<?php echo $base_url; ?>">拼车</a></li>
    <li class="<?php if ($cur == 'post') {echo 'active';} ?>"><a href="<?php echo $base_url; ?>index.php/post">发布</a></li>
    <li class="<?php if ($cur == 'about') {echo 'active';} ?>"><a href="<?php echo $base_url; ?>index.php/about">须知</a></li>
</ul>
<div class="bd">
    <ol class="ol">
        <li>此公众号是为了方便居住在固安，就业在北京的上班族而建立。</li>
        <li>拼车线路我们将会不定时进行更新，也欢迎您提出合理化建议。</li>
        <li>此公众号内发布的拼车信息均由网友自行发布，我们不为其真实性负责，出现任何后果由您自己承担。</li>
        <li>原则上我们建议固安至4号线各地铁站拼车价格为10元，超出此价格疑为黑车，建议您不要乘坐。</li>
        <li>乘车时，请您自觉系好安全带，哪怕您坐在后排。</li>
        <li>拒绝黑车，从我做起。</li>
    </ol>
</div>
<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c72b5e11ce6a7e2de1e25a5d9be7f5f1";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
</body>
</html>