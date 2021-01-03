<?php    
    echo
        form_open(site_url($SAVE_LINK), array('id' => 'data_form')),
        new Table(array(
            array(
                form_hidden('project_id', $project_id),
                form_hidden('id', $model->id)
            ),
            array(
                form_label("Item:"),
                select('project_item_id', ProjectItem::getProjectItems(), 'id', 'name', $model->project_item_id)),
            array(
                form_label("Quantity:"),
                txt('quantity', $model->quantity, 'required')),
            array(
                form_label("Note: (optional)"),
                txt('note', $model->note)),
            array(
                '',
                btn('save', 'SAVE', 'submit')))),
        form_close();
?>