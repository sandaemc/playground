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
                form_label("Measurement:"),
                txt('measurement', $model->measurement, 'required')
            ),
            array(
                form_label("Rate:"),
                txt('rate', $model->rate, 'required')),
            array(
                form_label('Category:'),
                select('category', ComponentCategory::getComponentCategories(), 'name', 'name', $model->category)
            ),
            array(
                '',
                btn('save', 'SAVE', 'submit')))),
        form_close();
?>