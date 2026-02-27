import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { ResultPanel } from './components/ResultPanel';
import { VisualizationPanel } from './components/VisualizationPanel';
import './App.css';

function App() {
  return (
    <div className="dashboard-layout">
      <Header />

      <main className="main-content">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="dashboard-grid">
            <InputPanel />
            <ResultPanel />
            <VisualizationPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
