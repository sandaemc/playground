<div class="column" id="col1">    
    <table id="example" class="display" width="100%">
        <thead>
            <tr>                
                <th>Name</th>
                <th>Quantity</th>                
                <th></th>
            </tr>
        </thead>
        <tbody>            
            <?php foreach ($collection as $build) { ?>
            <tr>                
                <td>
                    <a href="<?php echo site_url("$EDIT_LINK/{$build->id}")?>">
                        <?php echo $build->getItem()->name;?> /
                        <?php echo $build->getItem()->description;?>
                    </a>
                </td>
                <td>
                    <?php echo $build->quantity;?>
                </td>                
                <td>
                    <a href="<?php echo site_url("ViewEstimatorProjectComponent/index/{$build->id}")?>">
                        View Components
                    </a>
                    |
                    <a href="<?php echo site_url("ViewEstimatorProjectBuild/detailedreport/{$build->id}")?>">
                        View Detailed Estimate Report
                    </a>
                    |
                    <a href="<?php echo site_url("$DELETE_LINK/{$build->id}")?>"
                       onclick="return confirm('Are you sure you want to delete this record?');">
                        Delete
                    </a>
                    
                </td>
            </tr>
            <?php } ?>
        </tbody>
        <tfoot>
            <tr>                
                <th></th>
                <th></th>
                <th></th>                        
            </tr>
        </tfoot>
    </table>
    <br />
</div>