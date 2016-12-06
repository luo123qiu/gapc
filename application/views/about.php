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
    <li class="<?php if ($cur == 'driver') {echo 'active';} ?>"><a href="/">拼车</a></li>
    <li class="<?php if ($cur == 'post') {echo 'active';} ?>"><a href="/post">发布</a></li>
    <li class="<?php if ($cur == 'about') {echo 'active';} ?>"><a href="/about">须知</a></li>
</ul>
<div class="bd"></div>
</body>
</html>