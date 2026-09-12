import { RiskTolerance, DaypartKey } from '../models/types';

export interface ScoringWeights {
  resilience: {
    shock_resilience: number;
    seasonality_penalty: number;
    event_dependency_penalty: number;
    development_dependency_penalty: number;
  };
  riskProfiles: Record<
    RiskTolerance,
    {
      peakPenaltyGamma: number;   // weight on peak dependency excess
      resilienceBeta: number;     // exponent scaling for resilience dampener
      minFitThreshold: number;    // minimum score to be considered VIABLE
      optimalThreshold: number;   // minimum score for OPTIMAL
    }
  >;
  peakDependency: {
    baselineThreshold: number;    // 20% is balanced across 5 dayparts
    severeThreshold: number;      // 32%+ indicates a severe peak trap
    minDaypartDensityForBreadth: number; // >= 40 indicates viable daypart
  };
}

export const SCORING_CONFIG: ScoringWeights = {
  resilience: {
    shock_resilience: 0.45,
    seasonality_penalty: 0.25,
    event_dependency_penalty: 0.15,
    development_dependency_penalty: 0.15,
  },
  riskProfiles: {
    CONSERVATIVE: {
      peakPenaltyGamma: 0.55,
      resilienceBeta: 0.40,
      minFitThreshold: 65,
      optimalThreshold: 78,
    },
    MODERATE: {
      peakPenaltyGamma: 0.35,
      resilienceBeta: 0.25,
      minFitThreshold: 58,
      optimalThreshold: 72,
    },
    AGGRESSIVE: {
      peakPenaltyGamma: 0.15,
      resilienceBeta: 0.10,
      minFitThreshold: 50,
      optimalThreshold: 68,
    },
  },
  peakDependency: {
    baselineThreshold: 24, // 24% of total daypart mass
    severeThreshold: 30,   // >= 30% indicates single-peak dominance
    minDaypartDensityForBreadth: 40,
  },
};

export const DAYPART_MAPPINGS: Record<string, DaypartKey[]> = {
  AM_COMMUTE: ['weekday_am'],
  MIDDAY: ['weekday_midday'],
  PM_COMMUTE: ['weekday_evening'],
  EVENING: ['weekday_evening'],
  LATE_NIGHT: ['late_night'],
  WEEKEND: ['weekend_day'],
  WEEKEND_LEISURE: ['weekend_day'],
  FLIGHT_AND_WORKER_WINDOWS: ['weekday_am', 'weekday_midday', 'weekday_evening'],
  GOVERNED_EVENTS: ['weekday_evening', 'weekend_day'],
  MEAL_DAYPARTS: ['weekday_midday', 'weekday_evening', 'weekend_day'],
  WEEKDAY_LUNCH_DINNER_AND_WEEKEND_SEPARATE: ['weekday_midday', 'weekday_evening', 'weekend_day'],
  ACADEMIC_CALENDAR_MEAL_PERIODS: ['weekday_midday', 'weekday_evening'],
  ACADEMIC_CALENDAR_AND_MEALS: ['weekday_am', 'weekday_midday'],
  VENUE_OPEN_AND_PROGRAM_WINDOWS: ['weekday_evening', 'weekend_day'],
  ORDER_DAYPART_WITH_PREP_AND_VERTICAL_DELAY: ['weekday_midday', 'weekday_evening', 'weekend_day'],
};

export const DAYPART_LABELS: Record<DaypartKey, string> = {
  weekday_am: 'Weekday AM (7am–10am)',
  weekday_midday: 'Weekday Midday (11am–2pm)',
  weekday_evening: 'Weekday Evening (5pm–9pm)',
  late_night: 'Late Night (10pm–3am)',
  weekend_day: 'Weekend Daytime (9am–5pm)',
};
