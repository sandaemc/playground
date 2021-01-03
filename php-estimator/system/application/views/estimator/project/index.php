<div class="column" id="col1">    
    <table id="example" class="display" width="100%">
        <thead>
            <tr>                
                <th>Name</th>
                <th></th>                
            </tr>
        </thead>
        <tbody>            
            <?php foreach ($LOGGED_USER->project->get()->all as $project) { ?>
            <tr>                
                <td>
                    <a href="<?php echo site_url("ViewEstimatorProject/edit/{$project->id}")?>">
                        <?php echo $project->name;?>
                    </a>
                </td>
                <td>
                    <a href="<?php echo site_url("ViewEstimatorProjectBuild/index/{$project->id}");?>">
                        View Build
                    </a>
                    |
                    <a href="<?php echo site_url("ViewEstimatorProject/summaryreport/{$project->id}")?>">
                        View Summary Report
                    </a>
                    |
                    <a href="<?php echo site_url("ViewEstimatorProject/programreport/{$project->id}")?>">
                        View Individual Program of Work Report
                    </a>
                    |
                    <a href="<?php echo site_url("ViewEstimatorProject/delete/{$project->id}")?>"
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
            </tr>
        </tfoot>
    </table>
    <br />
</div>