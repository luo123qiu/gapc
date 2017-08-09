<?php
/**
 * Created by PhpStorm.
 * User: ethan.luo
 * Date: 2017/7/28
 * Time: 11:39
 */
//防止非法访问
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once(APPPATH.'/libraries/REST_Controller.php');

class Lists extends REST_Controller {

    public function __construct()
    {
        parent::__construct();

        //加载数据模型
        $this->load->model('driver_model');

    }

    public function index_get() {
        header("Access-Control-Allow-Origin: * ");
        $curpage = $this->router->class;
        $data = array(
            'driver' => $this->driver_model->get(),
            'base_url' => $this->config->item('base_url'),
            'cur' => $curpage
        );
        $this->response($data);
    }
    public function index_post() {

    }
}