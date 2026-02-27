import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ResultPanel() {
    // These will eventually be props or context provided by the InputPanel / main App state
    const statusStr = "Waiting for input";
    const riskLevel = "—";

    const isWaiting = statusStr === "Waiting for input";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mission Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>

                    <div style={{
                        padding: '1.25rem',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                            Current Status
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isWaiting ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                            {isWaiting ? <AlertCircle size={20} /> : <CheckCircle2 size={20} color="var(--primary)" />}
                            <strong style={{ fontSize: '1.125rem', fontWeight: 600 }}>{statusStr === "Waiting for input" ? "Awaiting Orders" : statusStr}</strong>
                        </div>
                    </div>

                    <div style={{
                        padding: '1.25rem',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                            Threat Level
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isWaiting ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                            <strong style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{riskLevel === "—" ? "Unknown" : riskLevel}</strong>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
