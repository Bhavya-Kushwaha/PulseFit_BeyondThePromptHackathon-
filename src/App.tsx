import React, { useState, useMemo } from 'react';
import {
  MetroId,
  BusinessCategory,
  RiskTolerance,
  Corridor,
  Archetype,
} from './models/types';
import {
  getAllCorridors,
  getAllArchetypes,
  getCorridorScore,
  getDemoPresets,
} from './data/loader';
import {
  evaluateOperatingFit,
  findAlternativeArchetypes,
  generateExplainabilityReport,
} from './engine';

import { Header, StageId } from './components/Header';
import { PresetsBar } from './components/PresetsBar';
import { MethodologyDrawer } from './components/MethodologyDrawer';
import { Footer } from './components/Footer';

import { ScreenConceptBuilder } from './views/ScreenConceptBuilder';
import { ScreenRecommendation } from './views/ScreenRecommendation';
import { ScreenStressTest } from './views/ScreenStressTest';

export const App: React.FC = () => {
  // State: Guided 3-Stage Workflow (01 Build -> 02 Diagnose -> 03 Stress Test)
  const [currentStage, setCurrentStage] = useState<StageId>('build');
  const [activePresetId, setActivePresetId] = useState<string | null>('demo-midtown-peak-trap');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);

  // State: Concept Parameters
  const [metroId, setMetroId] = useState<MetroId>('nyc');
  const [category, setCategory] = useState<BusinessCategory>('CAFE');
  const [corridorId, setCorridorId] = useState<string>('N0oRUzSGS4hi'); // Default: Midtown East - Grand Central
  const [archetypeId, setArchetypeId] = useState<string>('us.cafe.neighborhood_seated.v1'); // Default: Neighborhood seated
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>('CONSERVATIVE');

  // Available options
  const corridors = useMemo(() => getAllCorridors(metroId), [metroId]);
  const archetypes = useMemo(() => getAllArchetypes(category), [category]);

  // Active Corridor & Archetype objects
  const selectedCorridor: Corridor = useMemo(() => {
    const found = corridors.find((c) => c.corridor_id === corridorId);
    return found || corridors[0];
  }, [corridors, corridorId]);

  const selectedArchetype: Archetype = useMemo(() => {
    const found = archetypes.find((a) => a.archetype_id === archetypeId);
    return found || archetypes[0];
  }, [archetypes, archetypeId]);

  // Derived Calculations
  const scoreRecord = useMemo(() => {
    return getCorridorScore(selectedCorridor.corridor_id, selectedArchetype.archetype_id);
  }, [selectedCorridor, selectedArchetype]);

  const metrics = useMemo(() => {
    return evaluateOperatingFit(selectedCorridor, selectedArchetype, scoreRecord, riskTolerance);
  }, [selectedCorridor, selectedArchetype, scoreRecord, riskTolerance]);

  const alternatives = useMemo(() => {
    return findAlternativeArchetypes(selectedCorridor, selectedArchetype, riskTolerance);
  }, [selectedCorridor, selectedArchetype, riskTolerance]);

  const explainabilityReport = useMemo(() => {
    return generateExplainabilityReport(selectedCorridor, selectedArchetype, metrics, alternatives);
  }, [selectedCorridor, selectedArchetype, metrics, alternatives]);

  const peakRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' =
    metrics.peakDependency >= 30 ? 'HIGH' : metrics.peakDependency >= 24 ? 'MEDIUM' : 'LOW';

  // Handlers
  const handleSelectMetro = (newMetro: MetroId) => {
    setMetroId(newMetro);
    setActivePresetId(null);
    const newCorrs = getAllCorridors(newMetro);
    if (newCorrs.length > 0) {
      setCorridorId(newCorrs[0].corridor_id);
    }
  };

  const handleSelectCategory = (newCat: BusinessCategory) => {
    setCategory(newCat);
    setActivePresetId(null);
    const newArchs = getAllArchetypes(newCat);
    if (newArchs.length > 0) {
      setArchetypeId(newArchs[0].archetype_id);
    }
  };

  const handleSelectCorridor = (newCorrId: string) => {
    setCorridorId(newCorrId);
    setActivePresetId(null);
  };

  const handleSelectArchetype = (newArchId: string) => {
    setArchetypeId(newArchId);
    setActivePresetId(null);
  };

  const handleAdoptAlternative = (newArchId: string) => {
    setArchetypeId(newArchId);
    setActivePresetId(null);
    setCurrentStage('diagnose');
  };

  const handleSelectPreset = (preset: ReturnType<typeof getDemoPresets>[0]) => {
    setActivePresetId(preset.id);
    setMetroId(preset.metroId);
    setCategory(preset.category);
    setCorridorId(preset.corridorId);
    setArchetypeId(preset.archetypeId);
    setRiskTolerance(preset.riskTolerance);
    setCurrentStage('diagnose');
  };

  return (
    <div className="app-container">
      {/* Executive Clean Header with 3-Stage Progress Nav */}
      <Header
        currentStage={currentStage}
        onSelectStage={setCurrentStage}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        peakRiskLevel={peakRiskLevel}
      />

      {/* Human-Readable Demo Presets Strip */}
      <PresetsBar
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
      />

      {/* Active Stage Guided Workflow */}
      <main>
        {currentStage === 'build' && (
          <ScreenConceptBuilder
            metroId={metroId}
            onChangeMetro={handleSelectMetro}
            category={category}
            onChangeCategory={handleSelectCategory}
            corridors={corridors}
            selectedCorridor={selectedCorridor}
            onChangeCorridor={handleSelectCorridor}
            archetypes={archetypes}
            selectedArchetype={selectedArchetype}
            onChangeArchetype={handleSelectArchetype}
            riskTolerance={riskTolerance}
            onChangeRisk={setRiskTolerance}
            onProceed={() => setCurrentStage('diagnose')}
          />
        )}

        {currentStage === 'diagnose' && (
          <ScreenRecommendation
            corridor={selectedCorridor}
            archetype={selectedArchetype}
            metrics={metrics}
            alternatives={alternatives}
            report={explainabilityReport}
            onAdoptAlternative={handleAdoptAlternative}
            onNavigateToStress={() => setCurrentStage('stress')}
            onOpenMethodology={() => setIsMethodologyOpen(true)}
          />
        )}

        {currentStage === 'stress' && (
          <ScreenStressTest
            corridor={selectedCorridor}
            selectedArchetype={selectedArchetype}
            riskTolerance={riskTolerance}
            onAdoptAlternative={handleAdoptAlternative}
            onNavigateToDiagnose={() => setCurrentStage('diagnose')}
          />
        )}
      </main>

      {/* Team Attribution Footer */}
      <Footer />

      {/* Methodology & Provenance Modal Drawer */}
      <MethodologyDrawer
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
        corridor={selectedCorridor}
        archetype={selectedArchetype}
      />
    </div>
  );
};
