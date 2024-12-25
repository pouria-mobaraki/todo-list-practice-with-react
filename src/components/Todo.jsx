import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function Todo({id,title,isComplete,onDone,onRemove}) {

    // const editHandle = (id) => {
    // onDone(id)
    // }

    // const remove = (id)=> {
    //     onRemove(id)
    // }
  return (
    <div className={`flex justify-between items-center w-80 p-7 bg-slate-200 h-3 border-2 m-5 rounded-md mx-auto ${!isComplete?'line-through':''}`} >
      <p>{title}</p>
      <div>
        <DoneOutlineIcon onClick={()=>onDone(id)}
        className="mr-3 cursor-pointer bg-green-300 hover:bg-green-800 transition-all" />
        <DeleteForeverIcon onClick={()=>onRemove(id)}
         className="cursor-pointer bg-red-500 hover:bg-red-800 transition-colors" />
      </div>
    </div>
  );
}

export default Todo;
