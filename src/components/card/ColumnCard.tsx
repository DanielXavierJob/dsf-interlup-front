import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { KanbanContext } from "../../helpers/KanbanContext";
import { Button, Card, Input, Space } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { ColumnContainerProps } from "../../@types/card.type";

function ColumnContainer({ column, tasks }: ColumnContainerProps) {
  const [editMode, setEditMode] = useState(false);
  const { deleteColumn, updateColumn, openDrawerToCreateTask, skeleton, updateTitleColumn } =
    useContext(KanbanContext);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
            bg-columnBackgroundColor
            opacity-40
            border-2
            border-pink-500
            w-[350px]
            h-[500px]
            max-h-[500px]
            rounded-md
            flex
            flex-col
            "
      ></div>
    );
  }

  return skeleton ? (
    <div
      className="
      ssc-card 
      ssc-wrapper  
      bg-columnBackgroundColor
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      justify-between
      flex
      flex-col
      border-5
      "
    >
      <div className="flex flex-col mbs overflow-y-auto">
        <div className="ssc-square tag h-[80px] mt-4"></div>
        <div className="ssc-square tag h-[80px] mt-4"></div>
        <div className="ssc-square tag h-[80px] mt-4"></div>
        <div className="ssc-square tag h-[80px] mt-4"></div>
        <div className="ssc-square tag h-[80px] mt-4"></div>
      </div>
    </div>
  ) : (
    <Card
      ref={setNodeRef}
      style={style}
      className="
        bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        "
      title={
        <div
          onClick={() => {
            setEditMode(true);
          }}
          className="
            text-md
            cursor-grab
            font-bold
            flex
            items-center
            justify-between
            text-white
            "
        >
          <div className="flex gap-2">
            <div
              className="
                flex
                justify-center
                items-center
                bg-columnBackgroundColor
                px-2
                py-1
                text-sm
                rounded-full
                "
            >
              {tasks.length}
            </div>
            {!editMode && column.title}
            {editMode && (
              <Input
                placeholder="Write your title here..."
                variant="borderless"
                className="bg-black focus:border-rose-500 border rounded outline-none px-2 text-white"
                value={column.title}
                onChange={(e) => updateTitleColumn(column.id, e.target.value)}
                autoFocus
                onBlur={(e) => {
                  updateColumn(column.id, e.target.value)
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </div>
        </div>
      }
      extra={
        <Button
          className="
            stroke-gray-500
            hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2
            "
          onClick={() => {
            deleteColumn(column.id);
          }}
          type="text"
          icon={<DeleteOutlined style={{ color: "#fff", fontSize: "20px" }} />}
        />
      }
      bordered={false}
      actions={[
        <Space key={`space-buttons-container-${column.id}`}>
          <Button
            onClick={() => {
              openDrawerToCreateTask(column.id);
            }}
            type="text"
            icon={<PlusCircleOutlined style={{ fontSize: "22px" }} />}
            size={"large"}
            className="text-white flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:text-rose-500"
          >
            Add task
          </Button>
        </Space>,
      ]}
      styles={{
        header: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
        },
        body: {
          marginTop: "5px",
          overflowY: "auto",
        },
        actions: {
          borderTop: "1px solid rgba(0, 0, 0, 0.5)",
          background: "transparent",
        },
      }}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto text-white">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
}

export default ColumnContainer;
