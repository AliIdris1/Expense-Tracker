import React from 'react'
import {PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip} from "recharts"
import CustomTooltip from './CustomTooltip.jsx'
import CustomLegend from './CustomLegend.jsx'

const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor=true}) => {
  // Add a check for empty data
  if (!data || data.length === 0 || data.every(item => item.amount <= 0)) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie 
          data={data} 
          dataKey="amount" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          outerRadius={100} 
          innerRadius={70} 
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />

        {showTextAnchor && (
          <g>
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#666"
              fontSize="14px"
              fontWeight="500"
            >
              {label}
            </text>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </g>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart