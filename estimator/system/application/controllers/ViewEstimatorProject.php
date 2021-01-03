<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ViewEstimatorProject
 *
 * @author Sandae
 */
class ViewEstimatorProject extends MY_Controller {
    const TITLE = 'Projects';
    
    function ViewEstimatorProject() {
        parent::MY_Controller();

        $this->_model = 'Project';

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewEstimatorProject/add'))
        );
    }

    function add() {
        parent::add();
    }
    
    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted project');
        parent::delete();
    }

    function summaryreport() {
        $id = $this->uri->segment(3);
        if (is_null($id))
            redirect ($uri, $method, "404");

        $project = new Project();
        $project->where(array('id' => $id));
        $project->get();

        return $this->downloadXls(ReportSummary::create($project));
    }

    function programreport() {
        $id = $this->uri->segment(3);
        if (is_null($id))
            redirect ($uri, $method, "404");

        $project = new Project();
        $project->where(array('id' => $id));
        $project->get();

        return $this->downloadXls(ReportProgramReport::create($project));
    }

    function save() {
        $project = new Project();
        if ($this->param('id'))
            $project->get_by_id($this->param('id'));

        if (!$this->param('id') && Project::contractExists($this->param('contract_id'))) {
            $this->setError('Contract ID already exists');
            return $this->add();
        }

        $project->name = $this->param('name');
        $project->contract_id = $this->param('contract_id');
        $project->category = $this->param('category');
        $project->location = $this->param('location');
        $project->description = $this->param('description');
        $project->save($this->getLoggedUser());

        Log::createLog($this->getLoggedUser(), 'Created/Modified project');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>
