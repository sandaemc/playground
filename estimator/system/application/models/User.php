<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of User
 *
 * @author Sandae
 */
class User extends DataMapper {
    var $has_many = array('project');
    
    public static $EXPOSED_COLS = array(
        'last_name',
        'first_name',
        'username',
        'password'
    );
    
    function __construct() {
        parent::DataMapper();
    }

    static function getById($id) {
        $user = new User();
        $user->get_by_id($id);
        return $user;
    }

    function getName() {
        return $this->{'last_name'}.', '.$this->{'first_name'};
    }
    
    function isAdministrator() {
        return ($this->{'type'} == 'Administrator');
    }

    function isEstimator() {
        return ($this->{'type'} == 'Estimator');
    }    

    public static function userExists($username, $id) {
        $user = new User();        
        return $user->where(array(
            'username' => $username,
            'id !=' => $id
        ))->count() == 1;
    }

    public static function getEstimators()
    {
        $user = new User();        
        return $user->get()->all;
    }
}
?>
