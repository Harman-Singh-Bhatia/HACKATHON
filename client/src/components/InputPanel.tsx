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
                <CardTitle>Mission Deployment Interface</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Squad Leader / Regiment
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Levi Ackerman / Special Operations"
                            style={{ ...inputStyles, backgroundColor: 'rgba(0,0,0,0.2)', color: 'white' }}
                            value={textValue}
                            onChange={e => setTextValue(e.target.value)}
                            onFocus={e => {
                                e.target.style.borderColor = 'var(--primary)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(153, 27, 27, 0.2)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'var(--border-light)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Titans Spotted (Estimated Count)
                        </label>
                        <input
                            type="number"
                            placeholder="Enter number of targets"
                            style={{ ...inputStyles, backgroundColor: 'rgba(0,0,0,0.2)', color: 'white' }}
                            value={numValue}
                            onChange={e => setNumValue(e.target.value)}
                            onFocus={e => {
                                e.target.style.borderColor = 'var(--primary)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(153, 27, 27, 0.2)';
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
                            backgroundColor: (!textValue || !numValue) ? 'var(--text-muted)' : 'var(--primary)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginTop: '0.5rem',
                            transition: 'background-color 0.2s',
                            cursor: (!textValue || !numValue || isAnalyzing) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isAnalyzing ? 'Deploying...' : (
                            <>
                                Deploy Squad <Send size={18} />
                            </>
                        )}
                    </button>
                </form>
            </CardContent>
        </Card>
    );
}
