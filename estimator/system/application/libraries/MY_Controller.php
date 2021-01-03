<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SmaaKPage
 *
 * @author Sandae
 */
abstract class MY_Controller extends Controller {
    protected $_pages = array();
    protected $_data = array();

    protected $_model = NULL;    
    protected $SUBNAV = array();

    protected $_logged_in_user = NULL;

    protected $_model_id;
    
    function  MY_Controller() {
        parent::Controller();

        if (!$this->getLoggedUser() && get_class($this) != 'ViewMain') {
            return redirect('ViewMain');
        }
    }

    //########## RECURRING LOGIC ###############
    function index() {
        $this->display('index.php')->render();
    }

    private function getModelInstance() {
        if ($this->_model) {
            $model = new ReflectionClass($this->_model);
            $model = $model->newInstance();
            
            if ($this->uri->segment(3)) {
                $model->get_by_id($this->uri->segment(3));
            }
            else if ($this->_model_id) {
                $model->get_by_id($this->_model_id);
            }

            return $model;
        }        

        throw new ErrorException('Model not set');   
    }

    function add() {
        $this->setData(array('model' => $this->getModelInstance()));
        $this->display('add.php')->render();
    }

    function edit() {
        $this->setData(array('model' => $this->getModelInstance()));
        $this->display('add.php')->render();
    }

    function delete() {
        if ($this->_model) {
            $cls = new ReflectionClass($this->_model);
            $model = $cls->newInstance();
            $model->get_by_id($this->uri->segment(3));
            if ($model->exists())
                $model->delete();
            
            $this->setStatus('Record has been deleted');
            return $this->index();
        }

        throw new Exception('No $_model has been set');
    }

    protected function _relationSave($relation_objects) {
        if ($this->_model) {
            $cls = new ReflectionClass($this->_model);
            $model = $cls->newInstance();
            
            if (!is_numeric($this->param('id')))
                throw new Exception('Invalid ID');

            $model->get_by_id($this->param('id'));
            
            foreach ($relation_objects as $object) {
                if ($this->param("assigne_{$object->id}")) {
                    $model->save($object);
                }
                else {
                    $model->delete($object);
                }
            }
        }
    }
    //############# END OF RECURRING LOGIC #################
    
    //utils
    function getLoggedUser() {
        $user = new User();
        $user->where('id', $this->session->userdata('user_id'));
        $user->get();
        if ($user->exists())
            return $user;
        return null;
    }
    
    function setLoggedUser(User $user) {                
        $this->session->set_userdata(array('user_id' => $user->id));
    }

    function param($name) {
        if ($this->input->post($name))
            return trim($this->input->post($name));

        if ($this->input->get($name))
            return trim($this->input->get($name));

        if (isset($_SESSION[$name]))
            return trim($_SESSION[$name]);

        return NULL;
    }
     /**
     * Clear $_POST
     * @return MY_Controller
     */
    function clearPosts() {
        $_POST = array();
        return $this;
    }

    /**
     * Clear $_GET
     * @return MY_Controller
     */
    function clearGets() {
        $_GET = array();
        return $this;
    }

    /**
     * Display status
     * @param array|string $messages
     */
    function setStatus($value) {
        $_POST['MSG'] = $value;
    }

    function setError($value) {
        $_POST['ERROR_MSG'] = $value;
    }

    //RENDERING
    function setData(Array $data = array()) {
        $this->_data = array_merge($this->_data, $data);
        return $this;
    }

    private function _findTemplate($template_name) {
        $words = array();
        $x = -1;
        
        foreach (preg_split('//', get_class($this)) as $char) {
            if (!trim($char))
                continue;
            
            if (preg_match('/[A-Z]/', $char))
                $words[++$x] = "";            

            $words[$x] .= $char;
        }        

        $prefix = array_shift($words); //skip it

        $relative_path = "";
        foreach ($words as $word) {
            $relative_path .= '/'.strtolower($word);
        }
        $relative_path .= '/'.$template_name;

        $absolute_path = APPPATH.'views'.$relative_path;
        
        if (file_exists($absolute_path)) {
            return $relative_path;
        }
        else {
            return $template_name;
        }     
    }
    
    function display($template_name) {        
        $this->_pages[] = $this->_findTemplate($template_name);
        return $this;
    }

    private function _attachRawData() {        
        $this->setData(array(
            'SUBNAV'        => $this->SUBNAV,
            'LOGGED_USER'   => $this->getLoggedUser(),
            'EDIT_LINK'     => get_class($this) . '/edit',
            'DELETE_LINK'   => get_class($this) . '/delete',
            'SAVE_LINK'     => get_class($this) . '/save'
        ));
    }

    private function _attachHeader() {
        $this->_attachRawData();
        $this->load->view('root_header.php', $this->_data);
    }

    private function _attachFooter() {
        $this->load->view('root_footer.php');
    }

    function render() {
        $this->_attachHeader();        
        foreach ($this->_pages as $page) {            
            $this->load->view($page);
        }
        $this->_attachFooter();
    }

    function downloadXls($filename) {        
        header('Location: ' . x_resource($filename));
        exit(0);
//        header("Expires: Mon, 26 Jul 2011 05:00:00 GMT");
//        header("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
//        header('Content-type: application/vnd.ms-excel');
//        header("Content-Disposition: attachment; filename={$filename}");
//        header('Pragma: public');
//        exit(0);
    }
}
?>
