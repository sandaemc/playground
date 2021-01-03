<?php    
    echo
        form_open(site_url($SAVE_LINK), array('id' => 'data_form')),
        new Table(array(
            array(
                NULL,
                form_hidden('id', $model->id)
            ),
            array(
                form_label("Item No.:"),
                txt('name', $model->name, 'required')),
            array(
                form_label("Unit:"),
                txt('measurement', $model->measurement, 'required')),            
            array(
                form_label('Description:'),
                area('description', $model->description)),
            array(
                '',
                btn('save', 'SAVE', 'submit')))),
        form_close();
?>