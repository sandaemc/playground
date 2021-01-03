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
class ViewEstimatorProjectComponent extends MY_Controller {
    const TITLE = 'Project Components';

    function ViewEstimatorProjectComponent() {
        parent::MY_Controller();

        $this->_model = 'ProjectComponent';

        if ($this->uri->segment(2) == 'index' && $this->uri->segment(3)) {            
            $this->session->set_userdata(array(
                'project_build_id' => $this->uri->segment(3)
            ));
        }

        $this->SUBNAV = array(
            lnk('ADD', site_url('ViewEstimatorProjectComponent/add')),            
        );
    }    

    private function _getProjectBuildId() {        
        return $this->session->userdata('project_build_id');
    }

    function index() {
        $build = new ProjectBuild();
        $build->get_by_id($this->_getProjectBuildId());
        $collection = $build->getProjectComponents();
        $this->setData(array('collection' => $collection));
        parent::index();
    }

    function add() {                
        $this->setData(array('project_build_id' => $this->_getProjectBuildId()));
        parent::add();
    }

    function edit() {
        $this->setData(array('project_build_id' => $this->_getProjectBuildId()));
        parent::edit();
    }

    function delete() {
        Log::createLog($this->getLoggedUser(), 'Deleted project component');
        parent::delete();
    }
    
    function save() {
        $comp = new ProjectComponent();
        if ($this->param('id'))
            $comp->get_by_id($this->param('id'));

        $comp->project_build_id = $this->param('project_build_id');
        $comp->component_id     = $this->param('component_id');
        $comp->quantity         = $this->param('quantity')
                                    ? $this->param('quantity')
                                    : 0;
        $comp->no_of_days       = $this->param('no_of_days')
                                    ? $this->param('no_of_days')
                                    : 0;
        $comp->save();

        Log::createLog($this->getLoggedUser(), 'Created/Modified project component');

        $this->setStatus('The data has been successfully saved.');
        return $this->index();
    }
}
?>
