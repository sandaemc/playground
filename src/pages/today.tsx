import React from "react";
import { ProjectList } from "./today-components";
import Container from "@material-ui/core/Container";

export function TodayPageComponent() {
  return (
    <Container maxWidth="xl">
      <ProjectList />
    </Container>
  );
}
