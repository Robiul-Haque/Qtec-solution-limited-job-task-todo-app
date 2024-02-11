import "./App.css";
import Todo_img from "./assets/to-do-image.jpg";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";

function App() {
  // get local storage data
  const getLocalItem = () => {
    let list = localStorage.getItem("todo-app");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [items, setItems] = useState(getLocalItem);
  const [newItem, setNewItem] = useState("");
  const [newStatus, setNewStatus] = useState("Complete");
  const [updateStatus, setUpdateStatus] = useState("");
  const [disable, setDisable] = useState(false);
  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  const options = ["Complete", "Not Complete"];

  useEffect(() => {
    localStorage.setItem("todo-app", JSON.stringify(items));
  }, [items]);

  // create task
  const addItem = () => {
    const item = {
      id: Math.floor(Math.random() * 1000),
      name: newItem,
      status: newStatus,
    };

    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  };

  // delete single task
  const deleteItem = (id) => {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  };

  // delete all tasks
  const deleteAll = () => {
    let check = confirm("Are you sure want to delete all tasks?");
    if (check) {
      setItems([]);
    }
  };

  // edit single task
  const editItem = (id, newText) => {
    setDisable(false);
    const currentItem = items.filter((item) => item.id === id);
    const newItem = {
      id: currentItem.id,
      name: newText,
      status: updateStatus,
    };

    deleteItem(id);
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  };

  return (
    <div>
      {/*create task input field and image */}
      <div className="flex justify-evenly items-center gap-4 flex-wrap">
        <h1 className="font-extrabold text-3xl border-b-2 border-dashed flex items-end">
          <span className="text-green-500 text-4xl">T</span>
          <span className="text-indigo-700">o</span>
          <span className="text-red-500 text-4xl">D</span>
          <span className="text-indigo-700">o</span>
          <img src={Todo_img} alt="Todo-image" className="w-14 h-14" />
        </h1>
        <input
          type="text"
          placeholder="Enter a task name"
          className="input input-bordered w-full max-w-xs"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          onClick={() => addItem()}
          className={
            !newItem
              ? "btn btn-primary btn-disabled"
              : "btn btn-primary cursor-pointer"
          }
        >
          Add
          <IoMdAddCircleOutline className="text-xl" />
        </button>
        <button
          className="btn bg-red-500 hover:bg-red-600 text-white"
          onClick={() => deleteAll()}
        >
          Delete All
          <RiDeleteBin6Line className="text-xl" />
        </button>

        {/* edit task input field */}
        {disable &&
          items.map((item) => {
            return (
              <div className="flex justify-center gap-3 flex-wrap mt-6">
                {showEdit === item.id ? (
                  <div className="flex justify-center gap-3 flex-wrap">
                    <div>
                      <input
                        type="text"
                        value={updatedText}
                        placeholder="Type your update text"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setUpdatedText(e.target.value)}
                      />
                    </div>
                    <div>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        value={updateStatus}
                        onChange={(e) => setUpdateStatus(e.target.value)}
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className={
                        !updatedText ? "btn btn-disabled" : "btn btn-primary"
                      }
                      onClick={() => {
                        editItem(item.id, updatedText);
                      }}
                    >
                      Update
                      <RxUpdate className="text-xl" />
                    </button>
                    <button
                      className="btn btn-active"
                      onClick={() => setDisable(false)}
                    >
                      Cancel
                      <MdOutlineCancel className="text-xl" />
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-8">
        <table className="table text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="hover">
                <td className="font-semibold text-gray-400">{index + 1}</td>
                <td className="font-semibold text-gray-600 capitalize">
                  {item.name}
                </td>
                <td
                  className={
                    item.status == "Complete"
                      ? "text-green-500 font-semibold drop-shadow-md"
                      : "text-red-500 font-semibold drop-shadow-md"
                  }
                >
                  {item.status}
                </td>
                <td className="flex justify-center gap-x-2">
                  <button
                    className={
                      disable ? "btn btn-disabled" : "btn btn-active tooltip"
                    }
                    data-tip="Edit"
                    onClick={() => {
                      setShowEdit(item.id);
                      setDisable(true);
                    }}
                  >
                    <FaEdit className="text-xl" />
                  </button>
                  <button
                    className="btn bg-red-500 hover:bg-red-600 text-white tooltip"
                    data-tip="Delete"
                    onClick={() => deleteItem(item.id)}
                  >
                    <RiDeleteBin4Line className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
