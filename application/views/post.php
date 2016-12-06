<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>发布拼车信息 - 固安拼车</title>
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
    <?php echo validation_errors(); ?>
    <?php echo form_open('post'); ?>
    <?php date_default_timezone_set("PRC"); ?>
        <table class="postform">
            <tr>
                <td>路线：</td>
                <td>从 <select class="select" name="start_local">
                    <option value="">请选择</option>
                    <option value="天宫院地铁站" <?php echo  set_select('start_local', '天宫院地铁站'); ?>>天宫院地铁站</option>
                    <option value="生物医药基地" <?php echo  set_select('start_local', '生物医药基地'); ?>>生物医药基地</option>
                    <option value="大卫城" <?php echo  set_select('start_local', '大卫城'); ?>>大卫城</option>
                    <option value="英国宫" <?php echo  set_select('start_local', '英国宫'); ?>>英国宫</option>
                    <option value="孔雀城" <?php echo  set_select('start_local', '孔雀城'); ?>>孔雀城</option>
                    <option value="空港新城" <?php echo  set_select('start_local', '空港新城'); ?>>空港新城</option>
                    <option value="太阳公园" <?php echo  set_select('start_local', '太阳公园'); ?>>太阳公园</option>
                    <option value="天顺家园" <?php echo  set_select('start_local', '天顺家园'); ?>>天顺家园</option>
                    <option value="绿宸万华城" <?php echo  set_select('start_local', '绿宸万华城'); ?>>绿宸万华城</option>
                    <option value="固安" <?php echo  set_select('start_local', '固安'); ?>>固安</option>
                </select> 到 <select class="select" name="end_local">
                    <option value="">请选择</option>
                    <option value="天宫院地铁站" <?php echo  set_select('end_local', '天宫院地铁站'); ?>>天宫院地铁站</option>
                    <option value="生物医药基地" <?php echo  set_select('end_local', '生物医药基地'); ?>>生物医药基地</option>
                    <option value="大卫城" <?php echo  set_select('end_local', '大卫城'); ?>>大卫城</option>
                    <option value="英国宫" <?php echo  set_select('end_local', '英国宫'); ?>>英国宫</option>
                    <option value="孔雀城" <?php echo  set_select('end_local', '孔雀城'); ?>>孔雀城</option>
                    <option value="空港新城" <?php echo  set_select('end_local', '空港新城'); ?>>空港新城</option>
                    <option value="太阳公园" <?php echo  set_select('end_local', '太阳公园'); ?>>太阳公园</option>
                    <option value="天顺家园" <?php echo  set_select('end_local', '天顺家园'); ?>>天顺家园</option>
                    <option value="绿宸万华城" <?php echo  set_select('end_local', '绿宸万华城'); ?>>绿宸万华城</option>
                    <option value="固安" <?php echo  set_select('end_local', '固安'); ?>>固安</option>
                </select></td>
            </tr>
            <tr>
                <td>出发：</td>
                <td><select class="select" name="go_date">
                    <option value="<?php echo date('Y-m-d'); ?>" <?php echo  set_select('go_date', date('Y-m-d')); ?>>今天</option>
                    <option value="<?php echo date("Y-m-d",strtotime("+1 day")); ?>" <?php echo  set_select('go_date', date("Y-m-d",strtotime("+1 day"))); ?>>明天</option>
                    <option value="1" <?php echo  set_select('go_date', '1'); ?>>工作日</option>
                    <option value="2" <?php echo  set_select('go_date', '2'); ?>>每天</option>
                </select> <select class="select" name="go_time">
                    <option value="x" <?php echo  set_select('go_time', 'x'); ?>>自行填写</option>
                    <option value="05:00" <?php echo  set_select('go_time', '05:00'); ?>>05:00</option>
                    <option value="06:00" <?php echo  set_select('go_time', '06:00'); ?>>06:00</option>
                    <option value="07:00" <?php echo  set_select('go_time', '07:00'); ?>>07:00</option>
                    <option value="08:00" <?php echo  set_select('go_time', '08:00'); ?>>08:00</option>
                    <option value="09:00" <?php echo  set_select('go_time', '09:00'); ?>>09:00</option>
                    <option value="10:00" <?php echo  set_select('go_time', '10:00'); ?>>10:00</option>
                    <option value="11:00" <?php echo  set_select('go_time', '11:00'); ?>>11:00</option>
                    <option value="12:00" <?php echo  set_select('go_time', '12:00'); ?>>12:00</option>
                    <option value="13:00" <?php echo  set_select('go_time', '13:00'); ?>>13:00</option>
                    <option value="14:00" <?php echo  set_select('go_time', '14:00'); ?>>14:00</option>
                    <option value="15:00" <?php echo  set_select('go_time', '15:00'); ?>>15:00</option>
                    <option value="16:00" <?php echo  set_select('go_time', '16:00'); ?>>16:00</option>
                    <option value="17:00" <?php echo  set_select('go_time', '17:00'); ?>>17:00</option>
                    <option value="18:00" <?php echo  set_select('go_time', '18:00'); ?>>18:00</option>
                    <option value="19:00" <?php echo  set_select('go_time', '19:00'); ?>>19:00</option>
                    <option value="20:00" <?php echo  set_select('go_time', '20:00'); ?>>20:00</option>
                    <option value="21:00" <?php echo  set_select('go_time', '21:00'); ?>>21:00</option>
                    <option value="22:00" <?php echo  set_select('go_time', '22:00'); ?>>22:00</option>
                    <option value="23:00" <?php echo  set_select('go_time', '23:00'); ?>>23:00</option>
                </select> <input type="input" class="input" size="8" maxlength="10" placeholder="00:00" name="go_time_customize" value="<?php echo set_value('go_time_customize'); ?>"></td>
            </tr>
            <tr>
                <td>高速：</td>
                <td><label class="highway"><input type="radio" name="highway" value="1" <?php echo  set_radio('highway', '1'); ?> /> 是</label><label class="highway"><input type="radio" checked="checked" name="highway" value="0" <?php echo  set_radio('highway', '0'); ?> /> 否</label>
            </td>
            </tr>
            <tr>
                <td>电话：</td>
                <td><input class="input" type="tel" maxlength="13" name="contact" value="<?php echo set_value('contact'); ?>"></td>
            </tr>
            <tr>
                <td>备注：</td>
                <td><textarea class="input" name="remark" maxlength="200" placeholder="可不填"><?php echo set_value('remark'); ?></textarea></td>
            </tr>
            <tr>
                <td></td>
                <td><button class="btn" type="submit">提交</button></td>
            </tr>
        </table>
    </form>
</div>
<script src="<?php echo $base_url; ?>static/zepto.min.js"></script>
<script>
;(function($){
    $('select[name="go_time"]').change(function() {
        if ($(this).val() == 'x') {
            $('input[name="go_time_customize"]').removeClass('hide');
        } else {
            $('input[name="go_time_customize"]').addClass('hide');
        }
    });
})(Zepto)
</script>
</body>
</html>