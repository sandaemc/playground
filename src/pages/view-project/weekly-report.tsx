import React, { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";
import { width } from "@material-ui/system";

const data = [
  { name: "A", uv: 90, fp: 10 },
  { name: "B", uv: 25, fp: 3 },
  { name: "C", uv: 50, fp: 5 },
  { name: "D", uv: 1, fp: 0 },
  { name: "E", uv: 5, fp: 0 },
  { name: "F", uv: 15, fp: 1 },
  { name: "G", uv: 60, fp: 2 }
];

export function WeeklyReportComponent() {
  const width =
    window.screen.width > 1024 ? window.screen.width / 3 : window.screen.width;

  // sample

  return (
    <div
      style={{
        margin: "0 auto",
        height: 200,
        width,
        paddingRight: "30px"
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
