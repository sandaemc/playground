<?php    
    echo
        form_open(site_url($SAVE_LINK), array('id' => 'data_form')),
        new Table(array(
            array(
                NULL,
                form_hidden('id', $model->id)
            ),
            array(
                form_label("Name:"),
                txt('name', $model->name, 'required')),            
            array(
                '',
                btn('save', 'SAVE', 'submit')))),
        form_close();
?>