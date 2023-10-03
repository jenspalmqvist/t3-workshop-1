/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Exercise } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const allExercises = api.exercise.getAll.useQuery().data;
  const utils = api.useContext();
  const createExercise = api.exercise.createExercise.useMutation({
    onSettled: async () => {
      await utils.exercise.getAll.invalidate();
    },
  });

  const [exerciseData, setExerciseData] = useState<
    Pick<Exercise, "name" | "duration">
  >({ name: "", duration: 0 });
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createExercise.mutateAsync({ ...exerciseData });
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          id="name"
          onChange={(e) =>
            setExerciseData({ ...exerciseData, name: e.target.value })
          }
        />
        <input
          type="text"
          name="duration"
          onChange={(e) =>
            setExerciseData({ ...exerciseData, duration: +e.target.value })
          }
        />
        <button type="submit">Create Exercise</button>
      </form>
      <ul>
        Exercises:
        {allExercises?.map((exercise) => (
          <li key={exercise.id}>
            Name: {exercise.name}, Duration: {exercise.duration}
          </li>
        ))}
      </ul>
    </div>
  );
}
