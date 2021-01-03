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
class Item extends DataMapper {
    function __construct() {
        parent::DataMapper();
    }    

    static function itemExists($name) {
        $item = new Item();
        $item->get_by_name($name);
        return ($item->exists());
    }
}
?>
