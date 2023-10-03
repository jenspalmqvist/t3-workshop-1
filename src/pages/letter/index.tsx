/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { api } from "~/utils/api";

export default function Home() {
  const createLetter = api.letter.createLetter.useMutation();
  const allLetters = api.letter.getAll.useQuery().data;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await createLetter.mutateAsync({
      senderName: (event.currentTarget.senderName.value as string) || undefined,
      recipientName: event.currentTarget.recipientName.value as string,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" id="senderName" />
        <input type="text" id="recipientName" />
        <button type="submit">Create Letter</button>
      </form>
      <ul>
        Letters:
        {allLetters?.map((letter) => (
          <li key={letter.id}>
            Sender: {letter.senderName ?? ""} Recipient: {letter.recipientName}
          </li>
        ))}
      </ul>
    </div>
  );
}
