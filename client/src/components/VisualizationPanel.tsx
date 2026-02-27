import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
    { name: 'Mon', threat: 4 },
    { name: 'Tue', threat: 3 },
    { name: 'Wed', threat: 12 },
    { name: 'Thu', threat: 7 },
    { name: 'Fri', threat: 18 },
    { name: 'Sat', threat: 23 },
    { name: 'Sun', threat: 34 },
];

export function VisualizationPanel() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Titan Activity Grid (Weekly)</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: '300px', marginTop: '1rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={dummyData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(20, 24, 30, 0.9)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-light)',
                                    boxShadow: 'var(--shadow-md)',
                                    color: 'var(--text-primary)'
                                }}
                                itemStyle={{ color: 'var(--primary)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="threat"
                                stroke="var(--primary)"
                                strokeWidth={3}
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
