<?php if ($LOGGED_USER == null) { ?>
<div>
    <form method="post" action="<?=site_url('ViewMain/login');?>" id="data_form">
        Username: <?=txt('username', NULL, 'required');?>&nbsp;
        Password: <?=pass('password', 'required');?>&nbsp;
        <?=cmd('login', 'LOGIN');?>
    </form>
</div>
<?php } ?>