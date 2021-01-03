<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ReportSummary
 *
 * @author Sandae
 */
class ReportSummary {
    public static function create(Project $project) {
        $ex = new MyPHPExcel();

        $ex->makeLandscape();
        $ex->makeLongPaper();                

        $row = 3;        

        $ex->setFontSize("A$row:P34", 8);

        $ex->mergeCells("A$row:P$row");
        $ex->setCellValue("A$row", "APPROVED BUDGET FOR THE CONTRACT")
           ->setFontBold()
           ->alignCenter();

        $row++;
        $ex->mergeCells("A$row:P$row");
        $ex->setCellValue("A$row", $project->description);
        $ex->alignCenter("A$row");

        $row++;
        $ex->mergeCells("A$row:P$row");
        $ex->setCellValue("A$row", $project->location);
        $ex->alignCenter("A$row");

        $row++;
        $row++;        

        $xrow = $row + 1;

        $ex->setWidth("A", 10);
        $ex->mergeCells("A$row:A$xrow")->borders();
        $ex->setWrapText("A$row")->borders()->setValue("ITEM NUMBER")->alignCenter();

        $ex->setWidth("B", 40);
        $ex->mergeCells("B$row:B$xrow")->borders();
        $ex->borders("B$row")->setValue("DESCRIPTION")->alignCenter();

        $ex->setWidth("C", 8);
        $ex->mergeCells("C$row:C$xrow")->borders();
        $ex->borders("C$row")->setValue("QUANTITY")->alignCenter();

        $ex->setWidth("D", 8);
        $ex->mergeCells("D$row:D$xrow")->borders();
        $ex->borders("D$row")->setValue("UNIT")->alignCenter();

        $ex->setWidth("E", 10);
        $ex->mergeCells("E$row:E$xrow")->borders();
        $ex->borders("E$row")->setValue("ESTIMATED DIRECT COST")->alignCenter()->setWrapText();

        $ex->setWidth("F", 6);
        $ex->mergeCells("F$row:H$row")->borders()->alignCenter();
        $ex->setCellValue("F$row", "MARK-UPs IN PERCENT");        
        $ex->borders("F$xrow")->setValue("OCM")->alignCenter();

        $ex->setWidth("G", 6);
        $ex->borders("G$xrow")->setValue("PROFIT")->alignCenter();

        $ex->setWidth("H", 6);
        $ex->borders("H$xrow")->setValue("M/D")->alignCenter();

        $ex->mergeCells("I$row:J$row")->borders()->alignCenter();
        $ex->setCellValue("I$row", "TOTAL MARK-UP");

        $ex->setWidth("I", 6);
        $ex->borders("I$xrow")->setValue("%")->alignCenter();

        $ex->setWidth("J", 10);        
        $ex->borders("J$xrow")->setValue("VALUE")->alignCenter();

        $ex->setWidth("K", 10);
        $ex->mergeCells("K$row:K$xrow")->borders();
        $ex->borders("K$row")->setValue("VAT")->alignCenter();

        $ex->setWidth("L", 12);
        $ex->mergeCells("L$row:L$xrow")->borders();
        $ex->borders("L$row")->setValue("TOTAL INDIRECT COST")->alignCenter()->setWrapText();

        $ex->setWidth("M", 10);
        $ex->mergeCells("M$row:M$xrow")->borders();
        $ex->borders("M$row")->setValue("TOTAL COST")->alignCenter();

        $ex->setWidth("N", 10);
        $ex->mergeCells("N$row:N$xrow")->borders();
        $ex->borders("N$row")->setValue("UNIT COST")->alignCenter();

        $row++;
        $row++;

        $ex->setHeight($row, 25);
        
        $ex->setCellValue("A$row", '(1)')->alignCenter()->borders();
        $ex->setCellValue("B$row", '(2)')->alignCenter()->borders();
        $ex->setCellValue("C$row", '(3)')->alignCenter()->borders();
        $ex->setCellValue("D$row", '(4)')->alignCenter()->borders();
        $ex->setCellValue("E$row", '(5)')->alignCenter()->borders();
        $ex->setCellValue("F$row", '(6)')->alignCenter()->borders();
        $ex->setCellValue("G$row", '(7)')->alignCenter()->borders();
        $ex->setCellValue("H$row", '(8)')->alignCenter()->borders();
        $ex->setCellValue("I$row", '(9)')->alignCenter()->borders();
        $ex->setCellValue("J$row", '(10) (5) x (9)')->alignCenter()->setWrapText()->borders();
        $ex->setCellValue("K$row", '(11) 12%[(5) x (10)]')->alignCenter()->setWrapText()->borders();
        $ex->setCellValue("L$row", '(12) (10)+(11)')->alignCenter()->setWrapText()->borders();
        $ex->setCellValue("M$row", '(13) (5)+(12)')->alignCenter()->setWrapText()->borders();
        $ex->setCellValue("N$row", '(14) (13)/(3)')->alignCenter()->setWrapText()->borders();
        

        foreach ($project->getProjectBuilds() as $build) {
            $row++;
            $ex->setCellValue("A$row", $build->getItem()->name)->borders();
            $ex->setCellValue("B$row", $build->getItem()->description)->borders();
            $ex->setCellValue("C$row", $build->quantity)->borders();
            $ex->setCellValue("D$row", $build->getItem()->measurement)->borders();
            $ex->setCellValue("E$row", $build->getDirectCost())->borders();
            $ex->setCellValue("F$row", "10.00%")->borders();
            $ex->setCellValue("G$row", "11.00%")->borders();
            $ex->setCellValue("H$row", "0.0%")->borders();
            $ex->setCellValue("I$row", "21%")->borders();
            $ex->setCellValue("J$row", $build->getTotalMarkUpValue())->borders();
            $ex->setCellValue("K$row", $build->getVAT())->borders();
            $ex->setCellValue("L$row", $build->getIndirectCost())->borders();
            $ex->setCellValue("M$row", $build->getTotalCost())->borders();
            $ex->setCellValue("N$row", $build->getUnitCost())->borders();
        }

        $row++;
        $ex->setCellValue("B$row", "TOTAL")->setFontBold()->alignCenter();
        $ex->setCellValue("E$row", $project->getTotalDirectCost())->setFontBold();
        $ex->setCellValue("J$row", $project->getTotalMarkUpValue())->setFontBold();
        $ex->setCellValue("K$row", $project->getTotalVAT())->setFontBold();
        $ex->setCellValue("L$row", $project->getTotalIndirectCost())->setFontBold();
        $ex->setCellValue("M$row", $project->getTotalCost())->setFontBold();

        $filename = "summary.xls";

        $ex->save($filename);

        return $filename;
    }
}
?>
