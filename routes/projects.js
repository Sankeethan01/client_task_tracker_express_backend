const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllProjects);
router.get('/count', projectController.getProjectsCount);
router.get('/recent', projectController.getRecentProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.get('/client/:client_id', projectController.getProjectsByClient);


module.exports = router;
