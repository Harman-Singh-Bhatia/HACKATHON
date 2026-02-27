import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { ResultPanel } from './components/ResultPanel';
import { VisualizationPanel } from './components/VisualizationPanel';
import { AnimeGallery } from './components/AnimeGallery';
import './App.css';

function App() {
  return (
    <div className="dashboard-layout">
      <Header />

      <main className="main-content">
        <div className="container">
          <div className="dashboard-grid">
            <InputPanel />
            <ResultPanel />
            <VisualizationPanel />
            <AnimeGallery />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
