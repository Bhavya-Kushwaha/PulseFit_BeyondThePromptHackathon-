export type MetroId = 'nyc' | 'dallas-fort-worth';

export type BusinessCategory = 'CAFE' | 'RESTAURANT';

export type DecisionTrack = 'OPEN_MARKET_SITE' | 'CONTROLLED_HOST' | 'LIVE_OPPORTUNITY';

export type ScoreTier = 'STRONG_FIT' | 'MODERATE_FIT' | 'WEAK_FIT' | 'GATED_OUT' | 'INSUFFICIENT_CONTEXT';

export type ScoreKind = 'CONTEXT_PULL' | 'DEMAND_CONTEXT';

export type RiskTolerance = 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';

export interface DaypartDensity {
  weekday_am: number;
  weekday_midday: number;
  weekday_evening: number;
  late_night: number;
  weekend_day: number;
}

export type DaypartKey = keyof DaypartDensity;

export interface ResilienceMetrics {
  shock_resilience: number;
  seasonality_amplitude: number;
  event_dependency: number;
  development_dependency: number;
}

export interface CrimeSafety {
  day?: number;
  evening?: number;
  late_night?: number;
}

export interface DataQualityAudit {
  derivation_method?: string;
  crime_basis?: string;
  timing_alpha_basis?: string;
  brand_halo_basis?: string;
  whitespace_basis?: string;
}

export interface Corridor {
  corridor_id: string;
  legacy_id?: string;
  name: string;
  metro_id: MetroId;
  district: string;
  level: string;
  character: string;
  dominant_audience: string[];
  dayparts: DaypartDensity;
  resilience: ResilienceMetrics;
  timing_alpha: number;
  neighborhood_momentum: number;
  crime_safety: CrimeSafety;
  transit_car_orientation: number;
  whitespace_quality: Record<string, number>;
  demand_magnets: Record<string, number>;
  magnet_diversity: number;
  occasions: Array<{ occasion_id: string; score: number }>;
  data_quality: DataQualityAudit;
  h3_cell_count: number;
}

export interface Archetype {
  archetype_id: string;
  category_id: BusinessCategory;
  number: number;
  name: string;
  decision_track: DecisionTrack;
  mission: string;
  decision_object: string;
  required_gate: string;
  access_contract: string;
  primary_signals: string[];
  supporting_signals: string[];
  context_only_signals: string[];
  demand_clocks: string[];
  prohibited_substitutions: string[];
  computation_state: string;
}

export interface SignalContribution {
  signal: string;
  role: string;
  value: number;
  effective_weight: number;
  contribution: number;
}

export interface CorridorArchetypeScore {
  score: number | null;
  tier: ScoreTier;
  score_kind: ScoreKind;
  screening_eligible: boolean;
  host_context_present: boolean;
  location_check: string;
  contributions: SignalContribution[];
}

export interface CalculatedFitMetrics {
  opportunityFit: number;          // 0 - 100 base score
  timeFit: number;                 // 0 - 100 daypart alignment score
  resilienceScore: number;         // 0 - 100 composite shock & stability index
  peakDependency: number;          // % of daypart volume in single dominant peak
  occasionBreadth: number;         // count of viable dayparts (>= 40 density)
  resilienceAdjustedFit: number;   // headline score penalized for peak dependency & fragility
  dominantDaypart: {
    key: DaypartKey;
    label: string;
    density: number;
    sharePercent: number;
  };
  weakestDaypart: {
    key: DaypartKey;
    label: string;
    density: number;
  };
  peakTrapWarning: boolean;        // true if peakDependency >= threshold and spread >= 40
  verdict: 'OPTIMAL' | 'VIABLE_CONSTRAINED' | 'PEAK_TRAP_FRAGILE' | 'GATED_OUT' | 'INSUFFICIENT_CONTEXT';
  verdictLabel: string;
  verdictDescription: string;
}

export interface AlternativeArchetype {
  archetype: Archetype;
  baseScore: number;
  resilienceAdjustedFit: number;
  timeFit: number;
  peakDependency: number;
  deltaFit: number;
  isPreferable: boolean;
  whyBetter: string[];
  tradeoffs: string[];
  isGated: boolean;
  gateReason?: string;
}

export interface ExplainabilityReport {
  whyThisModel: string[];
  whyThisTime: string[];
  whyThisCorridor: string[];
  whyNotAlternative: string[];
  thesisBreakers: string[];
  dataCaveats: string[];
}

export interface StressScenarioResult {
  shockApplied: {
    targetDaypart: DaypartKey;
    targetDaypartLabel: string;
    reductionPercentage: number;
  };
  before: CalculatedFitMetrics;
  after: CalculatedFitMetrics;
  fitDelta: number;
  verdictChanged: boolean;
  survivingAlternatives: AlternativeArchetype[];
  stressSummary: string;
}
