<div class="column" id="col1">
    <br />
    <table class="display" width="100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>User (IP)</th>
                <th>Activity</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach (Log::getLogs() as $log) { ?>
            <tr>
                <td>
                    <?php echo $log->id;?>
                </td>
                <td>
                    <?php echo $log->getUser()->getName();?> (<?php echo $log->ip_address;?>)
                </td>
                <td>
                    <?php echo $log->activity;?>
                </td>
                <td>
                    <?php echo $log->log_datetime;?>
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