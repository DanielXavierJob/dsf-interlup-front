import React from "react";
import KanbanProvider from "../helpers/KanbanContext";
import KanbanSection from "../sections/kanban";
import EditTaskCard from "../components/drawer/EditTaskCard";
import LayoutSection from "../components/layout";

const HomePage = () => {
  return (
    <LayoutSection>
      <KanbanProvider>
        <KanbanSection />
        <EditTaskCard />
      </KanbanProvider>
    </LayoutSection>
  );
};
export default HomePage;
