<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Table
 *
 * @author Sandae
 */
class Table {
    private $rows;
    private $headers;
    private $footers;

    public function  __construct(Array $rows = array()) {
        $this->rows    = $rows;
        $this->headers = array();
        $this->footers = array();
    }

    public function addRow(Array $row) {
        $this->rows[] = $rows;
    }

    public function setHeader(Array $columns) {
        $this->headers = $columns;
    }

    public function setFooter(Array $footers) {
        $this->footers = $footers;
    }

    public function  __toString() {
        $table = "<table>" . PHP_EOL;
        
        if ($this->headers) {
            $table .= "<thead>";
            foreach ($this->headers as $cell) {
                $table .= PHP_EOL . "<th>" . $cell . "</th>";
            }
            $table .= "</thead>";
        }

        if ($this->footers) {
            $table .= "<tfoot>";
            foreach ($this->footers as $cell) {
                $table .= PHP_EOL . "<td>" . $cell . "</td>";
            }
            $table .= "</tfoot>";
        }

        $table .= "<tbody>";
        foreach ($this->rows as $row) {
            $table .= "<tr>";
            foreach ($row as $cell) {
                $table .= PHP_EOL . "<td>" . $cell . "</td>";
            }
            $table .= "</tr>";
        }
        $table .="</tbody>";

        $table .= "</table>";

        return $table;
    }
}
?>
