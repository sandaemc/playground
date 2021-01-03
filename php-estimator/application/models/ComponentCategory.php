<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Category
 *
 * @author Sandae
 */
class ComponentCategory extends DataMapper {
    var $table = 'component_categories';

    function __construct() {
        parent::DataMapper();
    }

    static function getComponentCategories() {
        $category = new ComponentCategory();
        return $category->get()->all;
    }

    static function getComponentCategoryNames() {
        $names = array();
        foreach (self::getComponentCategories() as $category) {
            $names[] = $category->name;
        }

        return $names;
    }

    static function categoryExists($name) {
        $category = new ComponentCategory();
        $category->get_by_name($name);
        return ($category->exists());
    }
}
?>
