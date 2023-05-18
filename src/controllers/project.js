const projectService = require("../services/projects.js");

exports.getProjects = async (req, res) => {
  try {
    let projects = await projectService.getProjects();
    res.json({
      projects: projects,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({
      message: "Projects not retrieved",
    });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    let project = await projectService.getProjectById(req.params.id);

    res.json({
      project: project,
    });
  } catch (error) {
    console.error("error", error);
    res.status(404).json({
      message: "Cannot find requested project",
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    let projectSaved = await projectService.createProject(req.body);
    res.status(201).json({
      message: "Project Created",
      projectSaved: projectSaved,
    });
  } catch (error) {
    console.error("error", error);
    res.status(400).json({
      message: "Creating Project failed",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    const updatedProject = await projectService.updateProject(id, projectData);

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Error" });
  }
};
