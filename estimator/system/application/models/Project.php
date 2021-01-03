<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Project
 *
 * @author Sandae
 */
class Project extends DataMapper {
    var $has_one = array('user');
    
    function __construct() {
        parent::DataMapper();
    }

    function getIndirectCostOverhead($as_percentage = false) {
        if ($as_percentage) {
            return ($this->getIndirectCostOverhead() / $this->getTotalCost()) * 100;
        }
        else {
            return ($this->getTotalDirectCost() * 0.10);
        }
        
    }    

    function getIndirectCostProfit($as_percentage = false) {
        if ($as_percentage) {
            return ($this->getIndirectCostProfit() / $this->getTotalCost()) * 100;
        }
        else {
            return ($this->getTotalDirectCost() * 0.11);
        }
    }

    function getIndirectCostVAT($as_percentage = false) {
        if ($as_percentage) {
            return ($this->getIndirectCostVAT() / $this->getTotalCost()) * 100;
        }
        else {
            return ($this->getTotalDirectCost() * 0.12);
        }
    }

    function getIndirectCostTotal($as_percentage = false) {        
        return ($this->getIndirectCostOverhead($as_percentage) +
                $this->getIndirectCostProfit($as_percentage) +
                $this->getIndirectCostVAT($as_percentage));
    }

    function getTotalBreakDown($as_percentage = false) {                        
        return ($this->getIndirectCostTotal($as_percentage) + $this->getTotalComponentsCost($as_percentage));
    }

    function getComponentCount() {
        $sql = "
            SELECT c.name, c.type, COUNT(pc.quantity) as quantity
            FROM projects p
            JOIN project_builds pb ON p.id = pb.project_id
            JOIN project_components pc ON pb.id = pc.project_build_id
            JOIN components c ON pc.component_id = c.id
            WHERE p.id = {$this->id}
            GROUP BY c.name
        ";

        $c = new Component();        
        $query = $c->db->query($sql);        
        
        return $query->result();
    }

    function getTotalEquipmentsCost($as_percentage = false) {
        $amount = 0;

        if ($as_percentage) {
            $amount = ($this->getTotalEquipmentsCost() / $this->getTotalCost()) * 100;
        }
        else {
            foreach ($this->getProjectBuilds() as $build)
                foreach ($build->getProjectComponents(Component::EQUIPMENT) as $comp)
                    $amount += $comp->getSubTotal();
        }
        
        return $amount;
    }

    function getTotalMaterialsCost($as_percentage = false) {
        $amount = 0;

        if ($as_percentage) {
            $amount = ($this->getTotalMaterialsCost() / $this->getTotalCost()) * 100;
        }
        else {
            foreach ($this->getProjectBuilds() as $build)
                foreach ($build->getProjectComponents(Component::MATERIAL) as $comp)
                    $amount += $comp->getSubTotal();
        }        

        return $amount;
    }

    function getTotalLaborsCost($as_percentage = false) {
        $amount = 0;

        if ($as_percentage) {
            $amount = ($this->getTotalLaborsCost() / $this->getTotalCost()) * 100;
        }
        else {
            foreach ($this->getProjectBuilds() as $build)
                foreach ($build->getProjectComponents(Component::LABOR) as $comp)
                    $amount += $comp->getSubTotal();
        }

        return $amount;
    }
    
    function getTotalComponentsCost($as_percentage = false) {
        $amount = 0;

        if ($as_percentage) {
            $amount = (
                    $this->getTotalEquipmentsCost(true) +
                    $this->getTotalMaterialsCost(true) +
                    $this->getTotalLaborsCost(true)
            );
        }
        else {
            foreach ($this->getProjectBuilds() as $build)
                foreach ($build->getProjectComponents() as $comp)
                    $amount += $comp->getSubTotal();
        }        

        return $amount;
    }
    
    function getEquipmentsCount() {
        $my_components = array();

        foreach ($this->getComponentCount() as $component)
            if ($component->type == Component::EQUIPMENT)
                $my_components[] = $component;
        
        return $my_components;
    }

    function getAllPersonnel() {
        $my_components = array();

        foreach ($this->getComponentCount() as $component)
            if ($component->type == Component::LABOR)
                $my_components[] = $component;

        return $my_components;
    }

    function getProjectBuilds() {
        $build = new ProjectBuild();
        return $build->get()->all;
    }

    public static function contractExists($contract_id) {
        $project = new Project();
        $project->get_by_contract_id($contract_id);
        return ($project->exists());
    }

    public function getTotalDirectCost() {
        $cost = 0;
        foreach ($this->getProjectBuilds() as $build)
            $cost += $build->getDirectCost();

        return $cost;
    }

    public function getTotalMarkUpValue() {
        $cost = 0;
        foreach ($this->getProjectBuilds() as $build)
            $cost += $build->getTotalMarkUpValue();

        return $cost;
    }

    public function getTotalVAT() {
        $cost = 0;
        foreach ($this->getProjectBuilds() as $build)
            $cost += $build->getVAT();

        return $cost;
    }

    public function getTotalIndirectCost() {
        $cost = 0;
        foreach ($this->getProjectBuilds() as $build)
            $cost += $build->getIndirectCost();

        return $cost;
    }

    public function getTotalCost() {
        $cost = 0;
        foreach ($this->getProjectBuilds() as $build)
            $cost += $build->getTotalCost();

        return $cost;
    }    
}
?>
