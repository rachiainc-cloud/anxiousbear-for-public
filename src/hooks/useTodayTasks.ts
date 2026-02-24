import { useState } from "react";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

let _tasks: Task[] = [];

export function useTodayTasks() {
  const [, forceRender] = useState(0);

  function getTasks() {
    return _tasks;
  }

  function addTask(text: string) {
    _tasks = [
      {
        id: Date.now().toString(),
        text,
        completed: false,
      },
      ..._tasks,
    ];
    forceRender((x) => x + 1);
  }

  function toggleTask(id: string) {
    _tasks = _tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    forceRender((x) => x + 1);
  }

  function removeTask(id: string) {
    _tasks = _tasks.filter((t) => t.id !== id);
    forceRender((x) => x + 1);
  }


  return {
    tasks: getTasks(),
    addTask,
    toggleTask,
    removeTask,
  };
}