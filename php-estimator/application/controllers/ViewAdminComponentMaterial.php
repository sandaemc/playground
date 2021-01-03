<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ViewAdminItem
 *
 * @author Sandae
 */
class ViewAdminComponentMaterial extends MY_Controller {
    const TITLE = 'Component Materials';
    
    function ViewAdminComponentMaterial() {
        parent::MY_Controller();

        $this->_model = 'Component';

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewAdminComponentMaterial/add'))
        );
    }

    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted Material');
        parent::delete();
    }

    function add() {
        $category_lookup = ComponentCategory::getComponentCategoryNames();
        $this->setData(array('category_lookup' => $category_lookup));
        parent::add();
    }

    function index() {
        $collection = Component::getMaterials();
        $this->setData(array('collection' => $collection));
        parent::index();
    }

    function save() {
        $item = new Component();
        if ($this->param('id'))
            $item->get_by_id($this->param('id'));

        if (!$this->param('id') && Component::componentExists($this->param('name'))) {
            $this->setError('Name already exists');
            return $this->add();
        }

        $item->name = $this->param('name');
        $item->rate = $this->param('rate');
        $item->type = 'Material';
        $item->category = $this->param('category');
        $item->measurment = strtoupper($this->param('measurement'));
        $item->save();

        Log::createLog($this->getLoggedUser(), 'Created/Modified Material');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>
