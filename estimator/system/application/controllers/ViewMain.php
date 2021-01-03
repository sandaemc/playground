<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ViewMain
 *
 * @author Sandae
 */
class ViewMain extends MY_Controller {
    function __construct() {
        parent::MY_Controller();
    }

    function edit() { throw new Exception('Not implemented.'); }
    function delete() { throw new Exception('Not implemented.'); }
    function add() { throw new Exception('Not implemented.'); }
    function  _relationSave($relation_objects) { throw new Exception('Not implemented'); }

    //POST:
    function login() {
        if ($this->input->post('username') && $this->input->post('password')) {            
            $user = new User();
            $user->where(array(
                'username' => $this->input->post('username'),
                'password' => $this->input->post('password')
            ));

            $user->get();
            if ($user->exists()) {
                Log::createLog($user, 'Logged-in');

                $this->setLoggedUser($user);                                
                return redirect('ViewDashBoard');
            }            
        }

        $this->setError('Login failed. Invalid password or username');
        return $this->index();
    }

    //GET:
    function logout() {
        Log::createLog($this->getLoggedUser(), 'Logged-out');
        $this->session->sess_destroy();
        $this->setStatus('You have been successfully logged-out.');
        return redirect('ViewMain');
    }
}
?>
