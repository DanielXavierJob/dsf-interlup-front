import { useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCardProps } from "../../@types/task.type";
import { KanbanContext } from "../../helpers/KanbanContext";
import { Button, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";




function TaskCard({ task }: TaskCardProps) {
  const { openDrawerEdit } = useContext(KanbanContext);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
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
        opacity-30
        bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
        "
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="text-white bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      bordered={false}
      {...attributes}
      {...listeners}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.title}
      </p>

      {mouseIsOver && (
        <Button
          type="text"
          onClick={() => {
            openDrawerEdit(task)
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor rounded opacity-60 hover:opacity-100"
          icon={<EyeOutlined />}
        />
      )}
    </Card>
  );
}

export default TaskCard;
