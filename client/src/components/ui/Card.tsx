

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div
            className={`card ${className}`}
            style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden'
            }}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }: CardProps) {
    return (
        <div
            className={`card-header ${className}`}
            style={{
                padding: '1.5rem 1.5rem 0.5rem', // Adjusted internal padding
            }}
        >
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '' }: CardProps) {
    return (
        <h3
            className={`card-title ${className}`}
            style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.025em'
            }}
        >
            {children}
        </h3>
    );
}

export function CardContent({ children, className = '' }: CardProps) {
    return (
        <div
            className={`card-content ${className}`}
            style={{
                padding: '1rem 1.5rem 1.5rem', // Adjusted internal padding
            }}
        >
            {children}
        </div>
    );
}
