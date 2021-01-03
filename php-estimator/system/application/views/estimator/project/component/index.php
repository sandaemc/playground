<div class="column" id="col1">    
    <table id="example" class="display" width="100%">
        <thead>
            <tr>                
                <th>Name</th>
                <th>Quantity</th>
                <th># of Days</th>
                <th></th>
            </tr>
        </thead>
        <tbody>            
            <?php foreach ($collection as $comp) { ?>
            <tr>                
                <td>
                    <a href="<?php echo site_url("$EDIT_LINK/{$comp->id}")?>">
                        <?php echo $comp->getComponent()->name;?>
                    </a>
                </td>
                <td>
                    <?php echo $comp->quantity;?>
                </td>
                <td>
                    <?=$comp->no_of_days;?>
                </td>
                <td>                    
                    <a href="<?php echo site_url("$DELETE_LINK/{$comp->id}")?>"
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
                <th></th>
                <th></th>
            </tr>
        </tfoot>
    </table>
    <br />
</div>