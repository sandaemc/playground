import React from "react";
import Container from "@material-ui/core/Container";
import { ProjectListComponent } from "./projects-components/project-list";

const projects = [
  { name: "Work - Pomometer", minutesLeft: 25 },
  { name: "Work - IE", minutesLeft: 25 },
  { name: "Work - Example", minutesLeft: 100 }
];

export function ProjectsPage() {
  return (
    <Container maxWidth="sm">
      <ProjectListComponent projects={projects} />
    </Container>
  );
}
