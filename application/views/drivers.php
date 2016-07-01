<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>固安拼车</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <link rel="stylesheet" href="static/iconfont.css">
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
    <div class="topline"></div>
    <div class="func">
        <a href="http://uedethan.com/gapc/"><i class="iconfont icon-shuaxin"></i>刷新</a>
        <a href="http://uedethan.com/gapc/index.php/post"><i class="iconfont icon-xiao64"></i>发布</a>
    </div>
    <ul class="list">
    <?php date_default_timezone_set("PRC"); ?>
    <?php foreach($driver as $list):?>
        <li>
            <div class="list-contact"><a href="tel:<?=$list['contact']?>"><i class="iconfont icon-dianhua"></i></a></div>
            <div class="list-bd">
                <div class="list-start"><?=$list['start_local']?></div>
                <div class="list-arrow"><i class="iconfont icon-youjiantou"></i></div>
                <div class="list-end"><?=$list['end_local']?></div>
            </div>
            <div class="list-meta">
                <span><i class="iconfont icon-rili"></i><?php
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
                        echo '<span><i class="iconfont icon-gaosu"></i>走高速</span>';
                    else:
                        echo '<span class="nothighway"><i class="iconfont icon-gaosu"></i>不走高速</span>';
                    endif;
                ?>
            </div>
            <?php if ($list['remark']):
                echo '<div class="list-remark">'.$list['remark'].'</div>';
                endif;
             ?>
        </li>
    <?php endforeach?>
    </ul>
</body>
</html>