"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", analyses: 8, uploads: 4 },
  { day: "Tue", analyses: 12, uploads: 6 },
  { day: "Wed", analyses: 10, uploads: 5 },
  { day: "Thu", analyses: 15, uploads: 8 },
  { day: "Fri", analyses: 18, uploads: 9 },
  { day: "Sat", analyses: 7, uploads: 3 },
  { day: "Sun", analyses: 6, uploads: 2 },
]

export default function UserActivityChart() {
  return (
    <div className="glass-effect glow-blue p-6 rounded-lg">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 136, 229, 0.1)" />
          <XAxis dataKey="day" stroke="#1A1A1A" />
          <YAxis stroke="#1A1A1A" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #1E88E5",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="analyses" fill="#1E88E5" radius={[8, 8, 0, 0]} name="Analyses" />
          <Bar dataKey="uploads" fill="#00ACC1" radius={[8, 8, 0, 0]} name="Uploads" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
