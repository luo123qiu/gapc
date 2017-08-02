<?php
//防止非法访问
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Post extends CI_Controller {
    public function index()
    {
        $this->load->helper(array('form', 'url'));

        $this->load->library('form_validation');
        $curpage = $this->router->class;
        $this->form_validation->set_rules('start_local', '起点', 'required',
            array('required' => '请选择起点')
        );
        $this->form_validation->set_rules('end_local', '终点', 'required',
            array('required' => '请选择终点')
        );
        $this->form_validation->set_rules('go_time', '出发时间', 'required',
            array('required' => '请选择出发时间')
        );
        $this->form_validation->set_rules('contact', '联系电话', 'required',
            array('required' => '请填写联系方式')
        );
        if ($this->form_validation->run() == FALSE)
        {
            $data = array(
                'base_url' => $this->config->item('base_url'),
                'cur' => $curpage
            );
            $this->load->view('post',$data);
        }
        else
        {
            $sl = $this->input->post('start_local');
            $el = $this->input->post('end_local');
            $gd = $this->input->post('go_date');
            $gt = $this->input->post('go_time');
            $ed = 0;
            $hh = $this->input->post('highway');
            $ct = $this->input->post('contact');
            $rm = $this->input->post('remark');
            $gtc = $this->input->post('go_time_customize');
            if ($gt == 'x'):
                $gotime = $gtc;
            else:
                $gotime = $gt;
            endif;
            if ($gd == 1):
                $ed = 1;
            elseif ($gd == 2):
                $ed = 2;
            endif;
            $data = array(
                'start_local' => $sl,
                'end_local' => $el,
                'go_date' => $gd,
                'go_time' => $gotime,
                'everyday' => $ed,
                'highway' => $hh,
                'contact' => $ct,
                'remark' => $rm
            );
            $d = array(
                'base_url' => $this->config->item('base_url')
            );
            $this->load->model('post_model');
            $exist = $this->post_model->query($sl, $el, $gd, $gotime, $ct);
            if ($exist):
                $this->load->view('formerror', $d);
            else:
                $this->post_model->insert($data);
                $this->load->view('formsuccess', $d);
            endif;
        }
    }
}