import { Activity } from 'lucide-react';

export function Header() {
    return (
        <header style={{
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                height: '4rem'
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
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Survey Corps Command Center
                    </h1>
                </div>
            </div>
        </header>
    );
}
