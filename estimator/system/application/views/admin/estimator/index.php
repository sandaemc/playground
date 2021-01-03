<div class="column" id="col1">    
    <table id="example" class="display" width="100%">
        <thead>
            <tr>                
                <th>Name</th>
                <th></th>                
            </tr>
        </thead>
        <tbody>            
            <?php foreach ($collection as $estimator) { ?>
            <tr>                
                <td>
                    <a href="<?php echo site_url("$EDIT_LINK/{$estimator->id}")?>">
                        <?php echo $estimator->getName();?>
                    </a>
                </td>
                <td>
                    <a href="<?php echo site_url("$DELETE_LINK/{$estimator->id}")?>"
                       onclick="return confirm('Are you sure you want to delete this record?');">
                        DELETE
                    </a>
                </td>
            </tr>
            <?php } ?>
        </tbody>
        <tfoot>
            <tr>                
                <th></th>
                <th></th>                
            </tr>
        </tfoot>
    </table>
    <br />
</div>