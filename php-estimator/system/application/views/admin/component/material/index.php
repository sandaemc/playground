<div class="column" id="col1">    
    <table id="example" class="display" width="100%">
        <thead>
            <tr>
                <th>Name</th>
                <th>RATE</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($collection as $item) { ?>
            <tr>
                <td>
                    <a href="<?php echo site_url("$EDIT_LINK/{$item->id}")?>">
                        <?php echo $item->name;?>
                    </a>
                </td>
                <td>
                    <?php echo $item->rate;?>
                </td>
                <td>
                    <a href="<?php echo site_url("$DELETE_LINK/{$item->id}")?>"
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
            </tr>
        </tfoot>
    </table>
    <br />
    <br />
</div>