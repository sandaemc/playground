<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Item
 *
 * @author Sandae
 */
class Component extends DataMapper {
    const MATERIAL  = 'Material';
    const LABOR     = 'Labor';
    const EQUIPMENT = 'Equipment';

    var $has_many = array('projectcomponent');

    function __construct() {
        parent::DataMapper();
    }

    static function getMaterials() {
        $component = new Component();
        $component->where('type', self::MATERIAL);
        return $component->get()->all;
    }

    static function getAll() {
        $component = new Component();
        return $component->get()->all;
    }

    public static function getEquipments() {
        $component = new Component();
        $component->where('type', self::EQUIPMENT);
        return $component->get()->all;
    }

    static function getLabors() {
        $component = new Component();
        $component->where('type', self::LABOR);
        return $component->get()->all;
    }

    static function componentExists($name) {
        $component = new Component();
        $component->get_by_name($name);
        return ($component->exists());
    }
}
?>
