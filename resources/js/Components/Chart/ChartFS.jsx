import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#10b981', '#facc15', '#6366f1', '#f43f5e', '#06b6d4', '#f97316'];

export default function ChartFS({ data }) {
    return (
        <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="percent"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        innerRadius="45%"
                        outerRadius="70%"
                        paddingAngle={3}
                        label={({ percent }) => `${percent}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{
                            textAlign: 'center',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
