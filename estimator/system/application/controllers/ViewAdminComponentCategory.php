<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ViewAdminCategory
 *
 * @author Sandae
 */
class ViewAdminComponentCategory extends MY_Controller {
    const TITLE = 'Component Categories';

    function ViewAdminComponentCategory() {
        parent::MY_Controller();

        $this->_model = 'ComponentCategory';

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewAdminComponentCategory/add'))
        );
    }

    function index() {
        $collection = ComponentCategory::getComponentCategories();
        $this->setData(array('collection' => $collection));
        parent::index();
    }    

    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted category');
        parent::delete();
    }

    function save() {
        $category = new ComponentCategory();
        if ($this->param('id'))
            $category->get_by_id($this->param('id'));

        if (!$this->param('id') && ComponentCategory::categoryExists($this->param('name'))) {
            $this->setError('Name already exists');
            return $this->add();
        }

        $category->name = $this->param('name');                
        $category->save();

        Log::createLog($this->getLoggedUser(), 'Created/Modified category');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>
