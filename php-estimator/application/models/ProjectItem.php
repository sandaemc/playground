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
class ProjectItem extends DataMapper {
    var $table = 'project_items';
    
    function __construct() {
        parent::DataMapper();
    }

    static function getProjectItems() {
        $item = new ProjectItem();
        return $item->get()->all;
    }    

    static function getProjectItemNames() {
        $names = array();
        foreach (self::getProjectItems() as $project_item) {
            $names[] = $project_item->name;
        }

        return $names;
    }

    static function projectItemExists($name) {
        $project_item = new ProjectItem();
        $project_item->get_by_name($name);
        return ($project_item->exists());
    }
}
?>
