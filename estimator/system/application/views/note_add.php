<?php
    echo
        form_open(site_url('/viewnote/save'), array('id' => 'data_form')),
        new Table(array(
            array(
                form_label('Note:'),
                form_textarea(array(
                    'name' => 'my_note',
                    'cols' => 100,
                    'rows' => 20
                ))
            )
        ));
?>
