<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProjectItemBuild
 *
 * @author Sandae
 */
class ProjectBuild extends DataMapper {
    var $table = 'project_builds';

    var $has_many = array('projectcomponent');

    function __construct() {
        parent::DataMapper();
    }

    function getItem() {
        $item = new ProjectItem();
        $item->get_by_id($this->project_item_id);
        return $item;
    }

    function getProject() {
        $project = new Project();
        $project->get_by_id($this->project_id);
        return $project;
    }

    function getTotalMaterialCost() {
        $cost = 0;
        foreach ($this->getProjectComponents(Component::MATERIAL) as $component)
            $cost += $component->getSubTotal();

        return round($cost, 2);
    }

    function getTotalEquipmentCost() {
        $cost = 0;
        foreach ($this->getProjectComponents(Component::EQUIPMENT) as $component)
            $cost += $component->getSubTotal();

        return round($cost, 2);
    }

    function getTotalLaborCost() {
        $cost = 0;
        foreach ($this->getProjectComponents(Component::LABOR) as $component)
            $cost += $component->getSubTotal();

        return round($cost, 2);
    }

    function getProjectComponents($type = null) {        
        $comp = new ProjectComponent();
        $comp->where(array('project_build_id' => $this->id));

        if (is_null($type))
            return $comp->get()->all;

        $pcs = array();
        foreach ($comp->get()->all as $pc) {
            if ($pc->getComponent()->type == $type) {
                array_push($pcs, $pc);
            }
        }

        return $pcs;
    }

    function getIndirectCost() {
        return round(($this->getOCM() + $this->getContractorsProfit() + $this->getVAT()), 2);
    }

    function getOCM() {
        return round($this->getDirectCost() * 0.10, 2);
    }

    function getContractorsProfit() {
        return round($this->getDirectCost() * 0.11, 2);
    }

    function getVAT() {
        return round(($this->getDirectCost() + $this->getOCM() + $this->getContractorsProfit()) * 0.12, 2);
    }

    function getTotalCost() {
        return round($this->getDirectCost() + $this->getIndirectCost(), 2);
    }

    function getUnitCost() {
        if ($this->getDirectCost() <= 0) {
            return 0;
        }
        
        return round($this->getTotalCost() / $this->quantity, 2);
    }

    function getTotalMarkUpValue() {
        return round($this->getDirectCost() * 0.21, 2);
    }

    function getTotalPercentage() {
        if ($this->getDirectCost() <= 0)
            return 0;
        
        return round(($this->getDirectCost() / $this->getProject()->getTotalDirectCost()) * 100, 2);
    }

    function getDirectUnitCost() {
        if ($this->getDirectCost() <= 0) {
            return 0;
        }
        
        return round($this->getDirectCost() / $this->quantity, 2);
    }

    function getDirectCost($type = null) {
        $cost = 0;

        if (is_null($type)) {
            foreach ($this->getProjectComponents() as $pj)
                $cost += $pj->getSubTotal();            
        }
        else {
            foreach ($this->getProjectComponents($type) as $pj)
                $cost += $pj->getSubTotal();            
        }                

        return round($cost, 2);
    }


}
?>
