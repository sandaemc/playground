<html>  
    <head>
        <title>
            Estimator
        </title>        
       
       <link type="text/css" href="<?=x_resource('styles/smoothness/jquery.ui.all.css')?>" rel="stylesheet">
        <link type="text/css" href="<?=x_resource('styles/old.css');?>" rel="stylesheet">
        <style type="text/css" title="currentStyle">
            @import "<?=x_resource('styles/demo_page.css') ?> ";
            @import "<?=x_resource('styles/demo_table_jui.css') ?>";
            @import "<?=x_resource('styles/smoothness/jquery-ui-1.8.4.custom.css') ?>";
        </style>
        
        <script type="text/javascript" src="<?=x_resource('js/jquery-1.4.2.js');?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/jquery.validate.min.js');?>"></script>

        <script type="text/javascript" src="<?=x_resource('js/ui/jquery-ui-1.8.1.custom.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.widget.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.accordion.js');?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.autocomplete.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.button.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.core.js');?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.datepicker.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.position.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.dialog.js');?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.draggable.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.droppable.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.mouse.js');?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.position.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.progressbar.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.resizable.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.selectable.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.slider.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.sortable.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.ui.tabs.js')?>"></script>

        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.blind.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.bounce.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.clip.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.core.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.drop.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.explode.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.fold.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.shake.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.pulsate.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.scale.js')?>"></script>
        <script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.slide.js')?>"></script>
	<script type="text/javascript" src="<?=x_resource('js/ui/jquery.effects.transfer.js')?>"></script>

        <script type="text/javascript" src="<?=x_resource('js/tinymce/tiny_mce.js')?>"></script>

        <script type="text/javascript" src="<?=x_resource('js/jquery.dataTables.js')?>"</script>
        <script type="text/javascript" src="<?=x_resource('js/FixedHeader.js')?>"</script>
        <script type="text/javascript" src="<?=x_resource('js/KeyTable.js')?>"</script>
        
        <script type="text/javascript">                      
            $(document).ready(function() {
                $("#data_form").validate();                                

                $('.submit').click(function() {
                    $('#data_form').submit();
                });

                $('#example').dataTable({
                    "bJQueryUI": true,
                    "sPaginationType": "full_numbers"

                });
                $('#example2').dataTable();
                $('#example3').dataTable();
                $('#example4').dataTable();
                $('#example5').dataTable();
                $('#example6').dataTable();

         
                $('#simple1').dataTable({
                    "bLengthChange": false,
                    "bFilter": false,
                    "bSort": false,
                    "bInfo": false,
                    "bAutoWidth": false
                });
            });
        </script>

    
    </head>
    <body>
        <div id="container">          
	  <div id="content">
	    <div id="navigation">                
                <?php
                    $user_type = "";
                    if ($LOGGED_USER) {
                        $user_type = $LOGGED_USER->type;
                    }                    
                ?>
                <ul>                    
                <?php if ($user_type == 'Estimator'): ?>
                    <li><small><?=lnk('PROJECTS', site_url('ViewEstimatorProject'));?></small></li>
                    <li><small><?=lnk('LOGOUT', site_url('ViewMain/logout'));?></small></li>
                <?php elseif ($user_type == 'Administrator'): ?>                    
                    <li><small><?=lnk('ESTIMATORS', site_url('ViewAdminEstimator'));?></small></li>
                    <li><small><?=lnk('CATEGORIES', site_url('ViewAdminProjectCategory'));?></small></li>
                    <li><small><?=lnk('ITEMS', site_url('ViewAdminProjectItem'));?></small></li>
                    <li><small><?=lnk('EQUIPMENTS', site_url('ViewAdminComponentEquipment'));?></small></li>
                    <li><small><?=lnk('LABORS', site_url('ViewAdminComponentLabor'));?></small></li>
                    <li><small><?=lnk('MATERIALS', site_url('ViewAdminComponentMaterial'));?></small></li>
                    <li><small><?=lnk('COMPONENTS', site_url('ViewAdminComponentCategory'));?></small></li>
                    <li><small><?=lnk('LOGS', site_url('ViewAdminLog'));?></small></li>
                    <li><small><?=lnk('LOGOUT', site_url('ViewMain/logout'));?></small></li>
                <?php else: ?>
                    <li><small><?=lnk('LOGIN', site_url('ViewMain'));?></small></li>
                <?php endif; ?>
                </ul>
            </div>
              <?php if ($SUBNAV): ?>
                  <div id="subnav">
                      <ul>
                      <?php foreach ($SUBNAV as $v): ?>
                          <li><?=$v;?> </li>
                      <?php endforeach; ?>
                      </ul>
                  </div>
              <?php endif; ?>              
            
            <?php if (param('ERROR_MSG')): ?>
                <div class="ui-widget">                
                    <div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">
                            <p>
                                <span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
                                <strong>ALERT: </strong><?=param('ERROR_MSG')?>
                            </p>
                    </div>                
                </div>
                <br />
            <?php endif; ?>               
               
            <?php if (param('MSG')): ?>
                <div class="ui-widget">                
                    <div class="ui-state-highlight ui-corner-all" style="padding: 0 .7em;">
                            <p>
                                <span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
                                <strong>STATUS: </strong><?=param('MSG');?>
                            </p>
                    </div>                
                </div>
                <br />
            <?php endif; ?>             
        