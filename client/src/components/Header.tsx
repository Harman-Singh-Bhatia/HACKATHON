import { Activity } from 'lucide-react';

export function Header() {
    return (
        <header style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                height: '4.5rem' // Slightly taller header
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <Activity color="var(--primary)" size={24} />
                    <h1 style={{
                        margin: 0,
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.025em' // Modern tight tracking
                    }}>
                        AI Risk Analysis Dashboard
                    </h1>
                </div>
            </div>
        </header>
    );
}
