import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { day: '01/05', sales: 2 },
    { day: '05/05', sales: 12 },
    { day: '10/05', sales: 25 },
    { day: '15/05', sales: 45 },
    { day: '20/05', sales: 64 },
];

const SalesChart = () => {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="day" stroke="#666" tick={{ fontSize: 12 }} axisLine={false} />
                    <YAxis stroke="#666" tick={{ fontSize: 12 }} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '12px' }}
                        itemStyle={{ color: '#D4AF37' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#D4AF37"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSales)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;