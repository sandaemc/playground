import React from "react";

interface ListComponentProps {
  distractions: Array<{ name: string }>;
}

export function ListComponent({ distractions }: ListComponentProps) {
  return (
    <ul>
      {distractions.map((c: any, i: number) => (
        <li key={i}>{c.name}</li>
      ))}
    </ul>
  );
}
