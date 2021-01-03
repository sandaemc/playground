<?php    
    echo
        form_open(site_url($SAVE_LINK), array('id' => 'data_form')),
        new Table(array(
            array(
                NULL,
                hidden('id', $model->id)
            ),
            array(
                form_label("Last Name:"),
                txt('last_name', $model->last_name, 'required')),
            array(
                form_label("First Name:"),
                txt('first_name', $model->first_name, 'required')),
            array(
                form_label("Username:"),
                txt('username', $model->username, 'required')),
            array(
                form_label("Password:"),
                pass('password', 'required')),
            array(
                form_label("Confirm Password:"),
                pass('confirm_password', 'required')),
            array(
                form_label('Type: '),
                 dropdown(
                         'type',
                         array(
                             'Administrator' => 'Administrator',
                             'Estimator' => 'Estimator'
                         ), $model->type)
            ),
            array(
                '',
                btn('save', 'SAVE', 'submit')))),
        form_close();
?>