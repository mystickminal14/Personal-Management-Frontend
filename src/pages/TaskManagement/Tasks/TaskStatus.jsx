import React from "react";
import { useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import BlockTitle from "../../../components/task-components/BlockTitle";
import TodoBlock from "./../../../components/task-components/TodoBlock";

const TaskStatus = () => {
  const { id } = useParams();
  const { data } = useGet(`/task-management/boards/tasks/${id}`);
  
  return (
    <div>
      {" "}
      <div className="flex h-full overflow-x-auto scroll-smooth no-scrollbar gap-5 p-4">
        {data
          ? 
            (data?.data[0]?.status.map((status)=>{
                <div key={status._id} className="card flex flex-col gap-3">
                <BlockTitle title={status.status} />
                <TodoBlock />
              </div>
            }))
          : "No Data Found"}
        {/*  <div className="card flex flex-col gap-3">
  <BlockTitle title="Todo" />
  <TodoBlock />
</div>
<div className="card flex flex-col gap-3">
  <BlockTitle title="Todo" />
  <div className='flex flex-col gap-3'>
    <TodoBlock />
    <TodoBlock />
    <TodoBlock />
    <TodoBlock />
    <TodoBlock />
    <TodoBlock />
  </div>
</div>
<div className="card flex flex-col gap-3">
  <BlockTitle title="Todo" />
  <TodoBlock />
  <TodoBlock />

  <TodoBlock />
</div>
<div className="card flex flex-col gap-3">
  <BlockTitle title="Todo" />
  <TodoBlock />
</div>

<div className="card flex flex-col gap-3">
  <BlockTitle title="Todo" />
  <TodoBlock />
  <TodoBlock />
  <TodoBlock />
</div> */}
      </div>
    </div>
  );
};

export default TaskStatus;
