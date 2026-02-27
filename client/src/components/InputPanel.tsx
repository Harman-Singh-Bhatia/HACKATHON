import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Send } from 'lucide-react';

export function InputPanel() {
    const [textValue, setTextValue] = useState('');
    const [numValue, setNumValue] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!textValue || !numValue) return;

        setIsAnalyzing(true);
        // Placeholder for future fetch to Flask API
        // try {
        //   const response = await fetch('http://127.0.0.1:5000/predict', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ text: textValue, value: Number(numValue) })
        //   });
        //   const data = await response.json();
        //   // handle data...
        // } catch (error) {
        //   console.error(error);
        // } finally {
        setIsAnalyzing(false);
        // }
    };

    const inputStyles: React.CSSProperties = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Enter Parameters</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Text Parameter
                        </label>
                        <input
                            type="text"
                            placeholder="Enter value"
                            style={inputStyles}
                            value={textValue}
                            onChange={e => setTextValue(e.target.value)}
                            onFocus={e => {
                                e.target.style.borderColor = 'var(--primary)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(15, 23, 42, 0.1)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'var(--border-light)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Numeric Parameter
                        </label>
                        <input
                            type="number"
                            placeholder="Enter numeric value"
                            style={inputStyles}
                            value={numValue}
                            onChange={e => setNumValue(e.target.value)}
                            onFocus={e => {
                                e.target.style.borderColor = 'var(--primary)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(15, 23, 42, 0.1)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'var(--border-light)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!textValue || !numValue || isAnalyzing}
                        style={{
                            backgroundColor: (!textValue || !numValue || isAnalyzing) ? 'var(--text-muted)' : 'var(--primary)',
                            color: 'white',
                            padding: '0.875rem 1.5rem', // Slightly larger button
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            marginTop: '0.5rem',
                            transition: 'all 0.2s ease',
                            cursor: (!textValue || !numValue || isAnalyzing) ? 'not-allowed' : 'pointer',
                            boxShadow: (!textValue || !numValue || isAnalyzing) ? 'none' : 'var(--shadow-sm)'
                        }}
                        onMouseEnter={e => {
                            if (textValue && numValue && !isAnalyzing) {
                                e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (textValue && numValue && !isAnalyzing) {
                                e.currentTarget.style.backgroundColor = 'var(--primary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }
                        }}
                        onMouseDown={e => {
                            if (textValue && numValue && !isAnalyzing) {
                                e.currentTarget.style.transform = 'translateY(1px)';
                            }
                        }}
                        onMouseUp={e => {
                            if (textValue && numValue && !isAnalyzing) {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }
                        }}
                    >
                        {isAnalyzing ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: 'white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                Analyzing...
                            </span>
                        ) : (
                            <>
                                Analyze <Send size={18} />
                            </>
                        )}
                    </button>
                    {/* Add animation styles inline for simplicity during hackathon */}
                    <style>{`
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </form>
            </CardContent>
        </Card>
    );
}
