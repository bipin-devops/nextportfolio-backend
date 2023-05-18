const Chance = require("chance");

const projectService = require("../projects.js");

const project = require("../../models/project.js");
const e = require("express");

const chance = new Chance();

jest.mock("../../models/project.js");

describe("when calling the project service method", () => {
  let id, projectData, updatedProject;
  beforeEach(() => {
    id = chance.guid();
    projectData = {
      name: chance.name(),
      description: chance.string(),
    };
    updatedProject = projectData;
    project.findByIdAndUpdate = jest.fn().mockReturnThis();
    project.lean = jest.fn().mockReturnThis();
    project.exec = jest.fn().mockResolvedValue(updatedProject);
  });

  it("should call project.findByIdAndUpdate with id, project data and return document new property", async () => {
    await projectService.updateProject(id, projectData);

    expect(project.findByIdAndUpdate).toBeCalledWith(id, projectData, {
      new: true,
    });
  });

  it("should call .lean()", async () => {
    await projectService.updateProject(id, projectData);

    expect(project.lean).toBeCalled();
  });

  it("should call Project.exec", async () => {
    await projectService.updateProject(id, projectData);

    expect(project.exec).toBeCalled();
  });

  it("should return the updated project data", async () => {
    const result = await projectService.updateProject(id, projectData);

    expect(result).toEqual(updatedProject);
  });
});
