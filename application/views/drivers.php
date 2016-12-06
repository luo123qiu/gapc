<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>固安拼车</title>
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
<div class="bd">
    <ul class="list">
        <?php date_default_timezone_set("PRC"); ?>
        <?php foreach($driver as $list):?>
        <li>
            <div class="call"><a href="tel:<?=$list['contact']?>"><i class="iconfont icon-dianhua2"></i></a></div>
            <div class="local">
                <span><?=$list['start_local']?></span>
                <span class="arrow"><i class="iconfont icon-zhankaijiantou"></i></span>
                <span><?=$list['end_local']?></span>
            </div>
            <div class="meta">
                <span class="time"><i class="iconfont icon-clock"></i><?php
                    if ($list['everyday'] == 1):
                        echo '工作日';
                    elseif ($list['everyday'] == 2):
                        echo '每天';
                    else:
                        if ($list['go_date'] == date('Y-m-d')):
                            echo '今天';
                        elseif ($list['go_date'] == date("Y-m-d",strtotime("+1 day"))):
                            echo '明天';
                        else:
                            echo $list['go_date'];
                        endif;
                    endif;
                    echo ' '.$list['go_time'];
                    ?></span>
                <?php
                if ($list['highway']):
                    echo '<span class="tag active">走高速</span>';
                else:
                    echo '<span class="tag">不走高速</span>';
                endif;
                ?>
            </div>
            <?php if ($list['remark']):
                echo '<div class="remark">'.$list['remark'].'</div>';
            endif;
            ?>
        </li>
        <?php endforeach; ?>
    </ul>
</div>
</body>
</html>