<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MyPHPExcel
 *
 * @author Sandae
 */
class MyPHPExcel {        
    private $_exl;
    private $_sheet;

    private $_last_range;

    public function __constructWithColumnWidth(Array $dimensions) {
        $this->_init();

        foreach ($dimensions as $k => $v) {
            $this->_sheet->getColumnDimension($k)->setWidth($v);
        }
    }

    public function __construct() {
        $this->_init();
    }

    private function _init() {
        $this->_exl = new PHPExcel();
        $this->_sheet = $this->_exl->getActiveSheet();        
    }

    public function makePortrait() {
        $this->_sheet->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
    }

    public function makeLandscape() {
        $this->_sheet->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
    }

    public function setWidth($col, $width = 30) {
        $this->_sheet->getColumnDimension($col)->setWidth($width);
    }

    public function setHeight($row, $height = 20) {
        $this->_sheet->getRowDimension($row)->setRowHeight($height);
    }

    public function makeShortPaper() {
        $this->_sheet->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
    }

    public function makeLongPaper() {
        $this->_sheet->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_LEGAL);
    }

    public function setWrapText($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getAlignment()->setWrapText(true);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function setFontSize($cell_range = null, $int = 8) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getFont()->setSize($int);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function alignCenter($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function alignLeft($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function alignRight($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function alignMiddle($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function alignTop($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_TOP);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function alignBottom($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_BOTTOM);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function mergeCells($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->mergeCells($cell_range);
        $this->_last_range = $cell_range;
        return $this;
    }    

    /**
     * @deprecated
     * @param <type> $cell_range
     * @param <type> $value
     * @return MyPHPExcel
     */
    public function setCellValue($cell_range = null, $value = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->setCellValue($cell_range, $value);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function setValue($value, $cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->setCellValue($cell_range, $value);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function setFontBold($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getFont()->setBold(true);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function setFontUnderline($cell_range = null) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getFont()->setUnderline(true);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function borderBottom($cell_range = null, $style = PHPExcel_Style_Border::BORDER_THIN) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getBorders()->getBottom()->setBorderStyle($style);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function borderTop($cell_range = null, $style = PHPExcel_Style_Border::BORDER_THIN) {
        $cell_range = $this->_assignRange($cell_range);
        
        $this->_sheet->getStyle($cell_range)->getBorders()->getTop()->setBorderStyle($style);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function borderLeft($cell_range = null, $style = PHPExcel_Style_Border::BORDER_THIN) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getBorders()->getLeft()->setBorderStyle($style);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function borderRight($cell_range = null, $style = PHPExcel_Style_Border::BORDER_THIN) {
        $cell_range = $this->_assignRange($cell_range);

        $this->_sheet->getStyle($cell_range)->getBorders()->getRight()->setBorderStyle($style);
        $this->_last_range = $cell_range;
        return $this;
    }

    public function borders($cell_range = null, $style = PHPExcel_Style_Border::BORDER_THIN) {
        $cell_range = $this->_assignRange($cell_range);
        
        $this->_sheet->getStyle($cell_range)->getBorders()->getAllBorders()->setBorderStyle($style);
        $this->_last_range = $cell_range;
        return $this;
    }

    private function _assignRange($cell_range = null) {
        if (is_null($cell_range))
            $cell_range = $this->_last_range;
        return $cell_range;
    }
    
    public function save($file_name) {
        $writer = new PHPExcel_Writer_Excel5($this->_exl);
        $writer->save($file_name);
    }
}
?>
