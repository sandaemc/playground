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
class ProjectCategory extends DataMapper {
    var $table = "project_categories";
    
    function __construct() {
        parent::DataMapper();
    }

    static function getProjectCategories() {
        $category = new ProjectCategory();
        return $category->get()->all;
    }

    static function getCategoryNames() {
        $names = array();
        foreach (self::getProjectCategories() as $category) {
            $names[] = $category->name;
        }

        return $names;
    }

    static function categoryExists($name) {
        $category = new ProjectCategory();
        $category->get_by_name($name);
        return ($category->exists());
    }
}
?>
