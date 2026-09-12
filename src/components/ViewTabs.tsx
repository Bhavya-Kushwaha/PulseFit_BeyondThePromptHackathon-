import React from 'react';
import { Sliders, Award, HelpCircle, Activity } from 'lucide-react';

export type ScreenId = 'concept' | 'recommendation' | 'why' | 'stress';

interface ViewTabsProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  peakTrapWarning?: boolean;
}

export const ViewTabs: React.FC<ViewTabsProps> = ({
  activeScreen,
  onSelectScreen,
  peakTrapWarning,
}) => {
  return (
    <nav className="view-tabs" aria-label="Main Navigation">
      <button
        id="tab-concept"
        className={`tab-btn ${activeScreen === 'concept' ? 'active' : ''}`}
        onClick={() => onSelectScreen('concept')}
      >
        <span className="tab-num">1</span>
        <Sliders size={15} />
        Build Concept
      </button>

      <button
        id="tab-recommendation"
        className={`tab-btn ${activeScreen === 'recommendation' ? 'active' : ''}`}
        onClick={() => onSelectScreen('recommendation')}
      >
        <span className="tab-num">2</span>
        <Award size={15} />
        PulseFit Recommendation
      </button>

      <button
        id="tab-why"
        className={`tab-btn ${activeScreen === 'why' ? 'active' : ''}`}
        onClick={() => onSelectScreen('why')}
      >
        <span className="tab-num">3</span>
        <HelpCircle size={15} />
        Why & Alternatives
      </button>

      <button
        id="tab-stress"
        className={`tab-btn ${activeScreen === 'stress' ? 'active' : ''}`}
        onClick={() => onSelectScreen('stress')}
      >
        <span className="tab-num">4</span>
        <Activity size={15} />
        Peak Trap Simulator
        {peakTrapWarning && (
          <span className="badge rose" style={{ padding: '0.15rem 0.4rem', fontSize: '0.65rem' }}>
            Warning
          </span>
        )}
      </button>
    </nav>
  );
};
