/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { api } from "~/utils/api";

export default function Home() {
  const createExample = api.example.createExample.useMutation();
  const allExamples = api.example.getAll.useQuery().data;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await createExample.mutateAsync({
      name: event.currentTarget.inputName.value as string,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" id="inputName" />
        <button type="submit">Create Example</button>
      </form>
      <ul>
        Examples:
        {allExamples?.map((example) => (
          <li key={example.id}>{example.name}</li>
        ))}
      </ul>
    </div>
  );
}
