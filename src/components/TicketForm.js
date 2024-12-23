import React, { useEffect, useState } from "react";

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required to create a ticket.");
      return;
    }

    //1
    // console.log("Submitted Data:", {
    //   title,
    //   description,
    //   priority,
    // });
    //2
    // Extract values directly from the form
    // const formData = {
    //   title: e.target.title.value,
    //   description: e.target.description.value,
    //   priority: e.target.priority.value,
    // };
    // console.log("Submitted Data using event:", formData);
    //3

    // component ---> What should happen
    // Reducer ---> How it is done
    const ticketData = {
      id: editingTicket ? editingTicket.id : crypto.randomUUID(),
      title,
      description,
      priority,
    };
    // console.log(ticketData);
    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData,
    });
    clearForm();
  };

  // handle cancel while editing
  const handleCancel = () => {
    dispatch({ type: "CLEAR_EDITING_TICKET" });
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title" // Add name attribute to get the event by using e.target.title.value in onSubmit
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          type="text"
          name="description" // Add name attribute to get the event by using e.target.title.value in onSubmit
          value={description}
          className="form-input"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabels).map(([value, label]) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              name="priority" // Add name attribute to get the event by using e.target.title.value in onSubmit
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(e) => setPriority(e.target.value)}
            ></input>
            {label}
          </label>
        ))}
      </fieldset>

      <button type="submit" className="button">
        Submit
      </button>

      {editingTicket && (
        <button className="button" onClick={handleCancel}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}
