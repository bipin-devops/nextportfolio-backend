const Chance = require("chance");

//what is to be tested
const projectController = require("../project.js");

//dependencies
const projectService = require("../../services/projects.js");

const chance = new Chance();

//mock dependencies
jest.mock("../../services/projects.js");

describe("when calling update project controller", () => {
  let id, projectData, updateProject, req;

  beforeEach(() => {
    id = chance.guid();
    projectData = {
      name: chance.name(),
      description: chance.string(),
    };
    updateProject = projectData;
    req = {
      params: { id },
      body: projectData,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    global.console = { log: jest.fn(), error: jest.fn() };

    projectService.updateProject = jest.fn().mockResolvedValue(updateProject);
  });

  it("should call projectService.updateProject with id and projectData", async () => {
    //Act
    await projectController.updateProject(req, res);

    //Assert
    expect(projectService.updateProject).toHaveBeenCalledWith(id, projectData);
  });

  it("should return status code of 200", async () => {
    await projectController.updateProject(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return json data", async () => {
    await projectController.updateProject(req, res);
    expect(res.json).toHaveBeenCalledWith(updateProject);
  });

  it("should return status of 500 when updateProject fails", async () => {
    //Arrange
    const error = new Error("Error 500 status");
    projectService.updateProject = jest.fn().mockRejectedValue(error);

    //Act
    await projectController.updateProject(req, res);

    //Assert
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
