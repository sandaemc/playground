<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Log
 *
 * @author Sandae
 */
class Log extends DataMapper {
    function __construct() {
        parent::DataMapper();
    }

    public static function getLogs()
    {
        $log = new Log();
        $log->order_by('log_datetime', 'desc');
        return $log->get()->all;
    }

    public function getUser() {
        $user = new User();
        $user->get_by_id($this->{'user_id'});
        return $user;
    }

    public static function createLog(User $user, $action) {
        $log = new Log();
        $log->user_id = $user->id;
        $log->activity = $action;
        $log->ip_address = getenv('REMOTE_ADDR');
        $log->save();
    }
}
?>
