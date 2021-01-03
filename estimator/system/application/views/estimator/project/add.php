<?php    
    echo
        form_open(site_url('ViewEstimatorProject/save'), array('id' => 'data_form')),
        new Table(array(
            array(
                NULL,
                hidden('id', $model->id)
            ),
            array(
                form_label("Contract ID:"),
                txt('contract_id', $model->contract_id, 'required')),
            array(
                form_label("Name:"),
                txt('name', $model->name, 'required')),
            array(
                form_label("Location:"),
                txt('location', $model->location, 'required')),
            array(
                form_label("Description:"),
                area('description', $model->description, 40, 10, 'required')),
            array(
                form_label('Category:'),
                select('category', ProjectCategory::getProjectCategories(), 'name', 'name', $model->category)),
            array(
                '',
                btn('save', 'SAVE', 'submit')))),
        form_close();
?>