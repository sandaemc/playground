<form method="post" action="<?php echo site_url($SAVE_LINK); ?>" id="data_form">
    <?php
    echo form_hidden('project_build_id', $project_build_id);
    echo form_hidden('id', $model->id);
    ?>
    <table>
        <tr>
            <td>Component</td>
            <td>
                <select name="component_id">
                    <optgroup label="MATERIALS" >
                    <?php foreach (Component::getMaterials() as $comp) {
                        $selected = ($comp->id == $model->getComponent()->id) ? 'selected="selected"' : null;
                        ?>
                        <option value="<?=$comp->id;?>" <?=$selected;?>>
                            <?=$comp->name;?>
                        </option>
                    <?php } ?>
                    </optgroup>

                    <optgroup label="EQUIPMENTS" >
                    <?php foreach (Component::getEquipments() as $comp) {
                        $selected = ($comp->id == $model->getComponent()->id) ? 'selected="selected"' : null;
                        ?>
                        <option value="<?=$comp->id;?>" <?=$selected;?>>
                            <?=$comp->name;?>
                        </option>
                    <?php } ?>
                    </optgroup>

                    <optgroup label="LABORS" >
                    <?php foreach (Component::getLabors() as $comp) { 
                        $selected = ($comp->id == $model->getComponent()->id) ? 'selected="selected"' : null;
                        ?>
                        <option value="<?=$comp->id;?>" <?=$selected;?>>
                            <?=$comp->name;?>
                        </option>
                    <?php } ?>
                    </optgroup>
                </select>
            </td>
        </tr>
        <tr>
            <td>Quantity</td>
            <td>
            <?php echo txt('quantity', $model->quantity, 'required'); ?>
            </td>
        </tr>
        <tr>
            <td>No of Days:</td>
            <td>
            <?php echo txt('no_of_days', $model->no_of_days, 'required');?>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="right">
            <?php echo btn('save', 'SAVE', 'submit'); ?>
            </td>
        </tr>
    </table>
</form>