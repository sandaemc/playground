import React from "react"
import { formatDistance, subDays } from "date-fns"

interface ListComponentProps {
  distractions: Array<{ name: string }>
}

export function ListComponent({ distractions }: ListComponentProps) {
  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {distractions.map((c: any, i: number) => (
          <tr key={i}>
            <td>{c.name}</td>
            <td className="text-muted">
              {formatDistance(c.created.toDate(), new Date())}
            </td>
            <td>
              {c.tags &&
                c.tags.map((c: string, idx: number) => (
                  <span key={idx} className="badge">
                    {c}
                  </span>
                ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
