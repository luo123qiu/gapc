<?php
class Post_model extends CI_Model{
    public function __construct()
    {
        //连接数据库
        $this->load->database();
    }
    public function query($sl, $el, $gd, $gt, $ct) {
        $query=$this->db->query('select * from drivers WHERE start_local="'.$sl.'" AND end_local="'.$el.'" AND go_date="'.$gd.'" AND go_time="'.$gt.'" AND contact="'.$ct.'"');
        return $query->num_rows();
    }
    public function insert($data){
        $this->db->insert('drivers',$data);
    }
}