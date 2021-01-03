<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ReportDetailedEstimate
 *
 * @author Sandae
 */
class ReportDetailedEstimate {
    public static function create(ProjectBuild $build) {
        $ex = new MyPHPExcel();

        $ex->makePortrait();
        $ex->makeShortPaper();

        $row = 3;

        $ex->setFontSize("A$row:I50", 8);

        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", "DETAILED ESTIMATE");
        $ex->alignCenter("A$row");

        $row++;
        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", $build->getProject()->description);
        $ex->alignCenter("A$row");

        $row++;
        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", $build->getProject()->location);
        $ex->alignCenter("A$row");

        $row++;
        $ex->mergeCells("A$row:D$row");
        $ex->setCellValue("A$row", $build->getItem()->name . ' - ' . $build->getItem()->description);

        $row++;
        $ex->mergeCells("A$row:D$row");
        $ex->setCellValue("A$row", "Quantity = " . $build->quantity . ' ' . $build->getItem()->measurement);

        $row++;
        $ex->mergeCells("A$row:G$row");
        $ex->setCellValue("A$row", "A. Materials delivered to site- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        $ex->setCellValue("I$row", "P " . $build->getTotalMaterialCost())->alignRight();

        foreach ($build->getProjectComponents(Component::MATERIAL) as $project_component) {
            $row++;
            $ex->mergeCells("B$row:D$row");
            
            $ex->setCellValue("B$row", $project_component->getComponent()->name);
            $ex->setCellValue("F$row", $project_component->quantity . ' ' . $project_component->getComponent()->measurement);
            $ex->setCellValue("G$row", "@ P " . $project_component->getComponent()->rate)->alignRight();
            $ex->setCellValue("H$row", "P " . $project_component->getSubTotal())->alignRight();
        }

        $row++;
        $ex->borderTop("H$row");
        $ex->setCellValue("H$row", "P " . $build->getTotalMaterialCost())->alignRight();

        $row++;
        $row++;
        $ex->mergeCells("A$row:G$row");
        $ex->setCellValue("A$row", "B. Equipment to site- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        $ex->setCellValue("I$row", "P " . $build->getTotalEquipmentCost())->alignRight();

        foreach ($build->getProjectComponents(Component::EQUIPMENT) as $project_component) {
            $row++;
            $ex->mergeCells("B$row:D$row");

            $ex->setCellValue("B$row", $project_component->getComponent()->name);
            $ex->setCellValue("E$row", $project_component->quantity)->alignCenter();
            $ex->setCellValue("F$row", $project_component->no_of_days . ' Days');
            $ex->setCellValue("G$row", "@ P " . $project_component->getComponent()->rate)->alignRight();
            $ex->setCellValue("H$row", "P " . $project_component->getSubTotal())->alignRight();
        }

        $row++;
        $ex->borderTop("H$row");
        $ex->setCellValue("H$row", "P " . $build->getTotalEquipmentCost())->alignRight();

        $row++;
        $row++;
        $ex->mergeCells("A$row:G$row");
        $ex->setCellValue("A$row", "C. Labor Cost- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        $ex->setCellValue("I$row", "P " . $build->getTotalLaborCost())->alignRight();

        foreach ($build->getProjectComponents(Component::LABOR) as $project_component) {            
            $row++;
            $ex->mergeCells("B$row:D$row");

            $ex->setCellValue("B$row", $project_component->getComponent()->name);
            $ex->setCellValue("E$row", $project_component->quantity)->alignCenter();
            $ex->setCellValue("F$row", $project_component->no_of_days . ' Days');
            $ex->setCellValue("G$row", "@ P " . $project_component->getComponent()->rate)->alignRight();
            $ex->setCellValue("H$row", "P " . $project_component->getSubTotal())->alignRight();
        }

        $row++;
        $ex->borderTop("H$row");
        $ex->setCellValue("H$row", "P " . $build->getTotalLaborCost())->alignRight();

        $row++;
        $row++;
        $ex->mergeCells("F$row:H$row");
        $ex->setCellValue("F$row", "DIRECT COST- - - - - - - - - - - - - - - - ");
        $ex->setCellValue("I$row", "P " . $build->getDirectCost())->alignRight();

        $row++;
        $ex->mergeCells("F$row:H$row");
        $ex->setCellValue("F$row", "INDIRECT COST- - - - - - - - - - - - - - - ");
        $ex->setCellValue("I$row", "P " . $build->getIndirectCost())->alignRight();

        $row++;
        $ex->mergeCells("F$row:G$row");
        $ex->setCellValue("F$row", "OCM- - - - - - - - -");
        $ex->setCellValue("H$row", "P " . $build->getOCM())->alignRight();

        $row++;
        $ex->mergeCells("F$row:G$row");
        $ex->setCellValue("F$row", "Contractor's Profit- - - - -");
        $ex->setCellValue("H$row", $build->getContractorsProfit())->alignRight();
        
        $row++;
        $ex->mergeCells("F$row:G$row");
        $ex->setCellValue("F$row", "VAT- - - - - - - - -");
        $ex->setCellValue("H$row", $build->getVAT())->alignRight();

        $row++;
        $ex->mergeCells("F$row:G$row");
        $ex->setCellValue("F$row", "Mobilization- - - - - - - - -");
        $ex->setCellValue("H$row", "");

        $row++;
        $ex->borderTop("H$row");
        $ex->setCellValue("H$row", "P " . $build->getIndirectCost())->alignRight();

        $row++;
        $ex->mergeCells("F$row:H$row");
        $ex->setCellValue("F$row", "TOTAL COST- - - - - - - - - - - - - - - ");
        $ex->setCellValue("I$row", "P " . $build->getTotalCost())->alignRight();

        $row++;
        $ex->mergeCells("F$row:G$row");
        $ex->setCellValue("F$row", "Unit Cost = ");
        $ex->setCellValue("H$row", "P " . $build->getTotalCost())->alignRight();
        $ex->borderBottom("H$row");

        $row++;
        $ex->setCellValue("H$row", $build->quantity);

        $row++;
        $ex->setCellValue("H$row", "P " . $build->getUnitCost())->alignRight();

        $filename = "detailed_estimate.xls";

        $ex->save($filename);

        return $filename;
    }    
}
?>
