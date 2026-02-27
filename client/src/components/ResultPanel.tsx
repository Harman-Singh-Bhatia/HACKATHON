import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ResultPanel() {
    // These will eventually be props or context provided by the InputPanel / main App state
    const statusStr: string = "Waiting for input";
    const riskLevel: string = "—";

    const isWaiting = statusStr === "Waiting for input";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem'
                }}>

                    <div style={{
                        padding: '1.25rem',
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                    }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Status
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: isWaiting ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                            {isWaiting ? <AlertCircle size={22} /> : <CheckCircle2 size={22} color="var(--primary)" />}
                            <strong style={{ fontSize: '1.125rem', fontWeight: 600 }}>{statusStr}</strong>
                        </div>
                    </div>

                    <div style={{
                        padding: '1.25rem',
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                    }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Risk Level
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: isWaiting ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                            {riskLevel === '—' ? (
                                <span className="badge badge-gray" style={{ fontSize: '1rem', padding: '0.375rem 1rem' }}>Unknown</span>
                            ) : (
                                <span className={`badge badge-${riskLevel.toLowerCase() === 'low' ? 'green' : riskLevel.toLowerCase() === 'medium' ? 'orange' : 'red'}`} style={{ fontSize: '1rem', padding: '0.375rem 1rem' }}>
                                    {riskLevel}
                                </span>
                            )}
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
