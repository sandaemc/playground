<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProjectItemBuildComponent
 *
 * @author Sandae
 */
class ProjectComponent extends DataMapper {
    var $table = 'project_components';
    var $has_one = array('component', 'projectbuild');

    function __construct() {
        parent::DataMapper();
    }

    function getComponent() {
        $comp = new Component();
        $comp->get_by_id($this->component_id);
        return $comp;
    }

    function getSubTotal() {
        $component = $this->getComponent();
        
        if ($component->type == Component::MATERIAL) {
            return $this->getComponent()->rate * $this->quantity;
        }
        else {
            return ($this->no_of_days * $this->getComponent()->rate) * $this->quantity;
        }        
    }
}
?>
