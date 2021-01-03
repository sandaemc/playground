<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ViewEstimatorProjectBuild
 *
 * @author Sandae
 */
class ViewEstimatorProjectBuild extends MY_Controller {
    const TITLE = 'Project Builds';    

    function ViewEstimatorProjectBuild() {
        parent::MY_Controller();

        $this->_model = 'ProjectBuild';        

        if ($this->uri->segment(2) == 'index' && $this->uri->segment(3)) {
            $this->session->set_userdata(array(
                'project_id' => $this->uri->segment(3)
            ));
        }

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewEstimatorProjectBuild/add'))            
        );
    }

    function detailedreport() {
        $build = new ProjectBuild();
        $build->get_by_id($this->uri->segment(3));

        return $this->downloadXls(ReportDetailedEstimate::create($build));
    }

    function index() {        
        $project_id = $this->session->userdata('project_id');        

        $project = new Project();
        $project->where(array('project_id' => $project_id));
        $collection = $project->getProjectBuilds();
        
        $this->setData(array('collection' => $collection));
        parent::index();
    }    
    
    function add() {
        $project_id = $this->session->userdata('project_id');
        $this->setData(array('project_id' => $project_id));
        parent::add();
    }

    function edit() {
        $project_id = $this->session->userdata('project_id');
        $this->setData(array('project_id' => $project_id));
        parent::edit();
    }

    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted project build');
        parent::delete();
    }

    function save() {
        $project_id = $this->session->userdata('project_id');
        
        $build = new ProjectBuild();
        if ($this->param('id'))
            $build->get_by_id($this->param('id'));

        $build->project_id = $project_id;
        $build->project_item_id = $this->param('project_item_id');
        $build->quantity = $this->param('quantity');
        $build->note = $this->param('note');
        $build->category = $this->param('category');
        $build->save();

        Log::createLog($this->getLoggedUser(), 'Created/Modified project build');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>
