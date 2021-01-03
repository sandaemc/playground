<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ReportProgramReport
 *
 * @author Sandae
 */
class ReportProgramReport {
    public static function create(Project $project) {
        $ex = new MyPHPExcel();

        $ex->makePortrait();
        $ex->makeShortPaper();

        $row = 1;

        $ex->setFontSize("A$row:I100", 8);

        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", "Republic of the Philippines")->alignCenter()->setFontBold();

        $row++;
        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", "Department of Public Works and Highways, R-VIII")->alignCenter()->setFontBold();

        $row++;
        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", "FIRST LEYTE ENGINEERING DISTRICT")->alignCenter()->setFontBold();

        $row++;
        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", "Brgy. Pawing, Palo, Leyte")->alignCenter()->setFontBold();

        $row++;
        $row++;
        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", "INDIVIDUAL PROGRAM OF WORK")->alignCenter()->setFontBold();
        
        $row++;
        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", "(For All Types of Projects)")->alignCenter()->setFontBold();

        //========== PART 1 ==========
        $row++;
        $ex->mergeCells("A$row:E$row")->borderTop()->borderRight();
        $ex->setCellValue("A$row", "NAME/LOCATION OF PROJECTS:")->setFontBold();
        $ex->mergeCells("F$row:I$row")->borderTop();
        $ex->setCellValue("F$row", "APPROPRIATION     : " . $project->getTotalCost());

        $row++;
        $ex->mergeCells("B$row:E$row")->borderRight();
        $ex->setCellValue("B$row", $project->name);
        $ex->mergeCells("F$row:I$row");
        $ex->setCellValue("F$row", "SOURCE OF FUNDS     :");        

        $row++;
        $ex->mergeCells("B$row:E$row")->borderRight();
        $ex->setCellValue("B$row", $project->location);
        $ex->mergeCells("F$row:I$row");
        $ex->setCellValue("F$row", "ISSUED OBLIGATED AUTHORITY     :");        

        $row++;
        $ex->mergeCells("B$row:E$row")->borderRight();
        $ex->setCellValue("B$row", "");
        $ex->mergeCells("F$row:I$row");
        $ex->setCellValue("F$row", "RELEASED     :");        

        $row++;
        $ex->mergeCells("A$row:E$row")->borderTop()->borderRight();
        $ex->setCellValue("A$row", "PROJECT CATEGORY:")->setFontBold();
        $ex->mergeCells("F$row:I$row");
        $ex->setCellValue("F$row", "CALENDAR DAYS TO COMPLETE     :");        

        $row++;
        $ex->mergeCells("B$row:E$row")->borderRight();
        $ex->setCellValue("B$row", $project->category);
        $ex->mergeCells("F$row:I$row");
        $ex->setCellValue("F$row", "DESIRABLE STARTING DATE     : Upon Approval");        

        $row++;
        $ex->mergeCells("B$row:E$row")->borderRight();
        $ex->setCellValue("B$row", "");
        $ex->mergeCells("F$row:H$row");
        $ex->setCellValue("F$row", "");        

        $row++;
        $ex->mergeCells("A$row:I$row")->borderTop();
        $ex->setCellValue("A$row", "PROJECT DESCRIPTION: (See Annex 'A')")->setFontBold();

        $row++;
        $ex->mergeCells("B$row:E$row");
        $ex->setCellValue("B$row", "");
        $ex->mergeCells("F$row:H$row");
        $ex->setCellValue("F$row", "");        

        $row++;
        $ex->mergeCells("B$row:I$row");
        $ex->setCellValue("B$row", $project->description);
        //============================

        $row++;
        $row++;

        //========== PART 2 ==========
        $ex->mergeCells("A$row:D$row")->borderTop()->borderBottom()->setFontBold()->alignCenter();
        $ex->setCellValue("A$row", "MINIMUM EQUIPMENT REQUIREMENT");

        $ex->mergeCells("E$row:I$row")->borderTop()->borderBottom()->setFontBold()->alignCenter();
        $ex->setCellValue("E$row", "TECHNICAL PERSONNEL REQUIRED");

        $row++;
        $ex->setCellValue("A$row", "DESCRIPTION")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("B$row", "NO.")->borderTop()->borderRight()->borderBottom()->alignCenter();

        $ex->setCellValue("C$row", "DESCRIPTION")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("D$row", "NO.")->borderTop()->borderRight()->borderBottom()->alignCenter();

        $ex->setCellValue("E$row", "DESCRIPTION")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("F$row", "NO.")->borderTop()->borderRight()->borderBottom()->alignCenter();

        $ex->setCellValue("G$row", "DESCRIPTION")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("H$row", "NO.")->borderTop()->borderRight()->borderBottom()->alignCenter();

        $equip_row = $row;
        $labor_row = $row;
        foreach ($project->getComponentCount() as $comp) {            
            if ($comp->type == Component::EQUIPMENT) {
                $equip_row++;
                $ex->setCellValue("A$equip_row", $comp->name)->borderRight();
                $ex->setCellValue("B$equip_row", $comp->quantity)->alignCenter()->borderRight();

                if ($labor_row != $equip_row) {
                    $ex->setCellValue("C$equip_row", "")->borderRight();
                    $ex->setCellValue("D$equip_row", "")->borderRight()->alignCenter();
                    $ex->setCellValue("E$equip_row", "")->borderRight();
                    $ex->setCellValue("F$equip_row", "")->borderRight()->alignCenter();
                    $ex->setCellValue("G$equip_row", "")->borderRight();
                    $ex->setCellValue("H$equip_row", "")->borderRight()->alignCenter();
                }
            }
            else if ($comp->type == Component::LABOR) {
                $labor_row++;

                if ($labor_row != $equip_row) {
                    $ex->setCellValue("A$labor_row", "")->borderRight();
                    $ex->setCellValue("B$labor_row", "")->borderRight()->alignCenter();
                    $ex->setCellValue("C$labor_row", "")->borderRight();
                    $ex->setCellValue("D$labor_row", "")->borderRight()->alignCenter();
                    $ex->setCellValue("G$labor_row", "")->borderRight();
                    $ex->setCellValue("H$labor_row", "")->borderRight()->alignCenter();
                }                

                $ex->setCellValue("E$labor_row", $comp->name)->borderRight();
                $ex->setCellValue("F$labor_row", $comp->quantity)->alignCenter()->borderRight();                
            }
        }

        if ($labor_row > $equip_row) {
            $row = $labor_row;
        }
        else {
            $row = $equip_row;
        }        
        //============================

        //========== PART 3 ==========
        $row++;
        $row++;
        $ex->mergeCells("A$row:I$row");
        $ex->setCellValue("A$row", "ESTIMATED COST OF PROPOSED WORK")->alignCenter()->setFontBold();

        $row++;
        $xrow = $row + 1;

        $ex->mergeCells("A$row:A$xrow")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("A$row", 'ITEM NO.')->alignCenter()->setWrapText()->alignMiddle();

        $ex->mergeCells("B$row:C$xrow")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("B$row", 'DESCRIPTION')->alignCenter()->alignMiddle();

        $ex->mergeCells("D$row:D$xrow")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("D$row", '% OF TOTAL')->alignCenter()->setWrapText()->alignMiddle();

        $ex->mergeCells("E$row:E$xrow")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("E$row", 'UNIT')->alignCenter()->alignMiddle();

        $ex->mergeCells("F$row:F$xrow")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("F$row", 'QUANTITY')->alignCenter()->alignMiddle();

        $ex->mergeCells("G$row:H$row")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("G$row", 'DIRECT COST')->alignCenter()->alignMiddle();

        $ex->mergeCells("G$xrow:G$xrow")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("G$xrow", 'TOTAL')->alignCenter()->alignMiddle();

        $ex->mergeCells("H$xrow:H$xrow")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("H$xrow", 'UNIT COST')->alignCenter()->alignMiddle();

        $ex->mergeCells("I$row:I$xrow")->borderTop()->borderBottom();
        $ex->setCellValue("I$row", 'ADJUSTED UNIT COST')->alignCenter()->setWrapText();

        $row++;

        foreach ($project->getProjectBuilds() as $build) {            
            $row++;
            $ex->mergeCells("A$row:A$row")->borderTop()->borderRight()->borderBottom();
            $ex->setCellValue("A$row", $build->getItem()->name)->alignCenter()->setWrapText()->alignMiddle();

            $ex->mergeCells("B$row:C$row")->borderTop()->borderRight()->borderBottom();
            $ex->setCellValue("B$row", $build->getItem()->description)->alignCenter()->alignMiddle();

            $ex->mergeCells("D$row:D$row")->borderTop()->borderRight()->borderBottom();
            $ex->setCellValue("D$row", $build->getTotalPercentage() . '%')->alignCenter()->setWrapText()->alignMiddle();

            $ex->mergeCells("E$row:E$row")->borderTop()->borderRight()->borderBottom();
            $ex->setCellValue("E$row", $build->getItem()->measurement)->alignCenter()->alignMiddle();

            $ex->mergeCells("F$row:F$row")->borderTop()->borderRight()->borderBottom();
            $ex->setCellValue("F$row", $build->quantity)->alignCenter()->alignMiddle();            

            $ex->mergeCells("G$row:G$row")->borderTop()->borderRight()->borderBottom();
            $ex->setCellValue("G$row", $build->getDirectCost())->alignCenter()->alignMiddle();

            $ex->mergeCells("H$row:H$row")->borderTop()->borderRight()->borderBottom();
            $ex->setCellValue("H$row", $build->getDirectUnitCost())->alignCenter()->alignMiddle();

            $ex->mergeCells("I$row:I$row")->borderTop()->borderBottom();
            $ex->setCellValue("I$row", $build->getUnitCost())->alignCenter()->setWrapText();
        }

        $row++;
        $ex->mergeCells("A$row:A$row")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("A$row", "")->alignCenter()->setWrapText()->alignMiddle();

        $ex->mergeCells("B$row:C$row")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("B$row", "")->alignCenter()->alignMiddle();

        $ex->mergeCells("D$row:D$row")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("D$row", '100.00%')->alignCenter()->setWrapText()->alignMiddle()->setFontBold();

        $ex->mergeCells("E$row:E$row")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("E$row", "")->alignCenter()->alignMiddle();

        $ex->mergeCells("F$row:F$row")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("F$row", "")->alignCenter()->alignMiddle();

        $ex->mergeCells("G$row:G$row")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("G$row", "P " . $project->getTotalDirectCost())->alignCenter()->alignMiddle()->setFontBold();

        $ex->mergeCells("H$row:H$row")->borderTop()->borderRight()->borderBottom();
        $ex->setCellValue("H$row", "")->alignCenter()->alignMiddle();

        $ex->mergeCells("I$row:I$row")->borderTop()->borderBottom();
        $ex->setCellValue("I$row", "")->alignCenter()->setWrapText();        
        //============================

        //PAGE 2

        $row = 51;

        $ex->mergeCells("A$row:E$row")->borderTop()->borderBottom()->setFontBold()->alignCenter();
        $ex->setCellValue("A$row", "BREAKDOWN OF ESTIMATED EXPENDITURES");

        $ex->mergeCells("F$row:G$row")->borderTop()->borderBottom()->borderRight()->borderLeft()->setFontBold()->alignCenter();
        $ex->setCellValue("F$row", "% OF TOTAL");

        $ex->mergeCells("H$row:I$row")->borderTop()->borderBottom()->setFontBold()->alignCenter();
        $ex->setCellValue("H$row", "AMOUNT");

        $row++;

        $data = array(            
            "I. - A. DIRECT COST" => array(
                "1. Materials" => array($project->getTotalMaterialsCost(true), $project->getTotalMaterialsCost()),
                "2. Labor (Including fringe benefits)" => array($project->getTotalLaborsCost(true), $project->getTotalLaborsCost()),
                "3. Equipment Expenses, Fuel, Oil, & Etc." => array($project->getTotalEquipmentsCost(true), $project->getTotalEquipmentsCost()),
                "SUB-TOTAL" => array($project->getTotalComponentsCost(true), $project->getTotalComponentsCost())
            ),
            "B. INDIRECT COST" => array(
                "1. Overhead, Contengencies and Miscellaneous" => array($project->getIndirectCostOverhead(true), $project->getIndirectCostOverhead()),
                "2. Profit" => array($project->getIndirectCostProfit(true), $project->getIndirectCostProfit()),
                "3. VAT" => array($project->getIndirectCostVAT(true), $project->getIndirectCostVAT()),
                "4. Mobilization/Demobilization" => array(null, null),
                "SUB-TOTAL" => array($project->getIndirectCostTotal(true), $project->getIndirectCostTotal()),
                "" => array(null, null),
                "SUB-TOTAL (Contract Cost)" => array($project->getTotalBreakDown(true), $project->getTotalBreakDown())
            ),
            "II - ESTIMATED GOVERNMENT EXPENDITURES" => array(
                '1. Engineering and Administrative Overhead' => array(null, null),
                '   (3.5% of Total Cost)' => array(null, null),
                '2. RRW Acquisition' => array(null, null),
                '3. Price Escalation' => array(null, null),
                '4. Physical Contengencies' => array(null, null),
                '5. Advertisement' => array(null, null),
                'SUB-TOTAL' => array(null, null)
            ),
            'III - CONTENGENCIES/RESERVES' => array(
                '1. Physical Contengencies' => array(null, null),
                '   (Up to 5% of the estimated contract cost)' => array(null, null),
                '2. Price Escalation' => array(null, null),
                '   (Up to 12% of the estimated contract cost)' => array(null, null),
                '3. Budgetary Reserver' => array(null, null)
            )
        );

        foreach ($data as $k => $v) {                        
            $ex->mergeCells("A$row:E$row")->setFontBold();
            $ex->setCellValue("A$row", $k);

            $ex->mergeCells("F$row:G$row")->borderLeft()->borderRight();
            
            foreach ($v as $cat => $data) {
                $row++;
                
                if ($cat == "SUB-TOTAL") {
                    $ex->mergeCells("C$row:E$row")->setFontBold();
                    $ex->setCellValue("C$row", $cat);
                    
                    $ex->mergeCells("F$row:G$row")->setFontBold()->borderLeft()->borderRight();
                    $ex->setCellValue("F$row", $data[0]);

                    $ex->mergeCells("H$row:I$row")->setFontBold()->borderTop();
                    $ex->setCellValue("H$row", $data[1]);
                }
                else {
                    $ex->mergeCells("B$row:E$row");
                    $ex->setCellValue("B$row", $cat);
                    
                    $ex->mergeCells("F$row:G$row")->borderLeft()->borderRight();
                    $ex->setCellValue("F$row", $data[0]);

                    $ex->mergeCells("H$row:I$row");
                    $ex->setCellValue("H$row", $data[1]);
                }                
            }

            $row++;
            $ex->mergeCells("F$row:G$row")->borderLeft()->borderRight();
            $row++;            
        }

        $ex->mergeCells("A$row:E$row")->borderTop()->setFontBold()->alignCenter();
        $ex->setCellValue("A$row", "TOTAL ESTIMATED COST");

        $ex->mergeCells("F$row:G$row")->borderTop()->borderRight()->borderLeft()->setFontBold()->alignCenter();
        $ex->setCellValue("F$row", $project->getTotalBreakDown(true));

        $ex->mergeCells("H$row:I$row")->borderTop()->setFontBold()->alignCenter();
        $ex->setCellValue("H$row", $project->getTotalBreakDown());

        $row++;

        $ex->mergeCells("A$row:E$row")->borderTop()->borderBottom()->setFontBold()->alignCenter();
        $ex->setCellValue("A$row", "SAY");

        $ex->mergeCells("F$row:G$row")->borderTop()->borderBottom()->borderRight()->borderLeft()->setFontBold()->alignCenter();
        $ex->setCellValue("F$row", null);

        $ex->mergeCells("H$row:I$row")->borderTop()->borderBottom()->setFontBold()->alignCenter();
        $ex->setCellValue("H$row", $project->getTotalBreakDown());


        $filename = "program_report.xls";

        $ex->save($filename);        

        return $filename;
    }
}
?>
