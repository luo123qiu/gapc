<?php
class Driver_model extends CI_Model {

  public function __construct()
  {
    //连接数据库
    $this->load->database();
  }

  public function get(){
     //查询数据库
     date_default_timezone_set("PRC");
     $d = date('Y-m-d');
     $week = date('w');
     if ($week!=6 && $week!=0): //每工作日
      $query=$this->db->query('select * from drivers where go_date>="'.$d.'" OR everyday=1 OR everyday =2 ORDER BY id DESC');
     else: //每天
      $query=$this->db->query('select * from drivers where go_date>="'.$d.'" OR everyday=2 ORDER BY id DESC');
     endif;
     //以数组形式返回查询结果
     return $query->result_array();
  }
}