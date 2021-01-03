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
class ViewAdminComponentEquipment extends MY_Controller {
    const TITLE = 'Component Equipments';
    
    function ViewAdminComponentEquipment() {
        parent::MY_Controller();

        $this->_model = 'Component';

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewAdminComponentEquipment/add'))
        );
    }

    function add() {
        $category_lookup = ComponentCategory::getComponentCategoryNames();
        $this->setData(array('category_lookup' => $category_lookup));
        parent::add();
    }

    function index() {
        $collection = Component::getEquipments();        
        $this->setData(array('collection' => $collection));
        parent::index();
    }

    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted Equipment');
        parent::delete();        
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
        $item->type = 'Equipment';
        $item->category = $this->param('category');
        $item->save();

        Log::createLog($this->getLoggedUser(), 'Created/Modified Equipment');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>
