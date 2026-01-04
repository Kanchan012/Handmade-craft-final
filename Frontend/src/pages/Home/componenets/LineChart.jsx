import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function LineCharts({ data }) {
  // Step 1: Prepare graph data grouped by date
  const graphData = data?.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-GB"); // e.g., "21/10/2025"
    const existing = acc.find((item) => item.date === date);

    if (existing) {
      existing.TotalSell += Number(order.totalAmount);
      existing.TotalOrders += 1;
    } else {
      acc.push({
        date,
        TotalSell: Number(order.totalAmount),
        TotalOrders: 1,
      });
    }

    return acc;
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-4">📈 Daily Orders & Revenue</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSell"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="Revenue (Rs.)"
          />
          <Line
            type="monotone"
            dataKey="TotalOrders"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="Orders Count"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineCharts;
