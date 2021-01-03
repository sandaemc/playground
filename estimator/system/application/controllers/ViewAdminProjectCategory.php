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
class ViewAdminProjectCategory extends MY_Controller {
    const TITLE = 'Project Categories';

    function ViewAdminProjectCategory() {
        parent::MY_Controller();

        $this->_model = 'ProjectCategory';

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewAdminProjectCategory/add'))
        );
    }

    function index() {
        $collection = ProjectCategory::getProjectCategories();
        $this->setData(array('collection' => $collection));
        parent::index();
    }

    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted project category');
        parent::delete();
    }

    function save() {
        $category = new ProjectCategory();
        if ($this->param('id'))
            $category->get_by_id($this->param('id'));

        if (!$this->param('id') && ProjectCategory::categoryExists($this->param('name'))) {
            $this->setError('Name already exists');
            return $this->add();
        }

        $category->name = $this->param('name');                
        $category->save();

        Log::createLog($this->getLoggedUser(), 'Created/Modified project category');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>
