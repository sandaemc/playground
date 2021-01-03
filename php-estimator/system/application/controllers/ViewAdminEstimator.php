<?php
/**
 * Description of AdminUser
 *
 * @author Sandae
 */
class ViewAdminEstimator extends MY_Controller {
    const TITLE = 'Estimator';
    
    function ViewAdminEstimator() {
        parent::MY_Controller();
        
        $this->_model = 'User';

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewAdminEstimator/add'))
        );
    }

    function index() {
        $collection = User::getEstimators();
        $this->setData(array('collection' => $collection));
        parent::index();
    }

    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted estimator');
        parent::delete();
    }

    function save() {
        $user = new User();
        if ($this->param('id'))
            $user->get_by_id($this->param('id'));
        
        if (User::userExists($this->param('username'), $this->param('id'))) {
            $this->setError('User already exists!');
            return $this->edit();
        }

        if(strlen($this->param('password')) < 6) {
            $this->setError('Password should be at least 6 characters');
            return $this->edit();
        }
        else if ($this->param('confirm_password') != $this->param('password')) {
            $this->setError("The 'Confirm Password' value does not match to 'Password' value.");
            return $this->edit();
        }
            
        foreach (User::$EXPOSED_COLS as $col) {
            $user->$col = $this->param($col);
        }

        $user->type = $this->param('type');
        $user->save();

        Log::createLog($this->getLoggedUser(), 'Created/Modified estimator');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>