import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QardListItem from "../QardListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { renderWithProviders } from "@/test/setup";

const mockQard = {
  id: "1",
  accountName: "Test Qard",
  accountLink: "https://example.com",
  position: 0,
  userId: "user1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockGetQards = vi.fn();

vi.mock("@/components/ui/icons/IconGeneric", () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid={`icon-${name}`}>{name}</div>
  ),
}));

describe("QardListItem Component", () => {
  it("renders the Qard information", () => {
    renderWithProviders(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <QardListItem
                qard={mockQard}
                getQards={mockGetQards}
                index={0}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    );

    expect(screen.getByText("Test Qard")).toBeDefined();
    expect(screen.getByTestId("icon-https://example.com")).toBeDefined();
  });

  it("opens the edit dialog when edit button is clicked", () => {
    renderWithProviders(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <QardListItem
                qard={mockQard}
                getQards={mockGetQards}
                index={0}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    );

    const editButton = screen.getByLabelText("Edit qard");
    fireEvent.click(editButton);

    expect(screen.getByText("Edit Qard")).toBeDefined();
  });

  it("opens the confirm delete dialog when delete button is clicked", () => {
    renderWithProviders(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <QardListItem
                qard={mockQard}
                getQards={mockGetQards}
                index={0}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    );

    const deleteButton = screen.getByLabelText("Delete qard");
    fireEvent.click(deleteButton);

    expect(screen.getByText("Delete Qard?")).toBeDefined();
  });
});
