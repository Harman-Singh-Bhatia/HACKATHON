import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
    { name: 'Mon', risk: 4000 },
    { name: 'Tue', risk: 3000 },
    { name: 'Wed', risk: 2000 },
    { name: 'Thu', risk: 2780 },
    { name: 'Fri', risk: 1890 },
    { name: 'Sat', risk: 2390 },
    { name: 'Sun', risk: 3490 },
];

export function VisualizationPanel() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: '350px', marginTop: '1.5rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={dummyData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20, // Tightly hug the left side since the axis line is hidden
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 13, fill: 'var(--text-secondary)' }}
                                dy={10} // Add spacing from the bottom axis
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 13, fill: 'var(--text-secondary)' }}
                                dx={-10} // Add spacing from the left axis
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-light)',
                                    boxShadow: 'var(--shadow-lg)',
                                    color: 'var(--text-primary)',
                                    padding: '0.75rem 1rem'
                                }}
                                itemStyle={{ color: 'var(--primary)', fontWeight: 600 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="risk"
                                stroke="var(--primary)"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorRisk)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
