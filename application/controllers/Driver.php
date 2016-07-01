<?php
//防止非法访问
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Driver extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
            //加载数据模型
        $this->load->model('driver_model');
       
    }

    public function index()
    {
            //根据数据模型获取数据
        $data = array(
            'driver' => $this->driver_model->get(),
            'base_url' => $this->config->item('base_url')
        );
        //加载视图文件
        $this->load->view('drivers',$data);
    }
}
//文件末尾注释
/* End of file nb.php */
/* Location: ./application/controllers/nb.php */