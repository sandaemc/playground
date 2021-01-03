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
class ViewAdminProjectItem extends MY_Controller {
    const TITLE = 'Project Items';

    function ViewAdminProjectItem() {
        parent::MY_Controller();

        $this->_model = 'ProjectItem';

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewAdminProjectItem/add'))
        );
    }

    function index() {
        $collection = ProjectItem::getProjectItems();
        $this->setData(array('collection' => $collection));
        parent::index();
    }

    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted item');
        parent::delete();
    }

    function save() {
        $item = new ProjectItem();
        if ($this->param('id'))
            $item->get_by_id($this->param('id'));

        if (!$this->param('id') && ProjectItem::projectItemExists($this->param('name'))) {
            $this->setError('Name already exists');
            return $this->add();
        }

        $item->name = $this->param('name');
        $item->description = $this->param('description');
        $item->measurement = $this->param('measurement');
        $item->save();

        Log::createLog($this->getLoggedUser(), 'Created/Modified item');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>
