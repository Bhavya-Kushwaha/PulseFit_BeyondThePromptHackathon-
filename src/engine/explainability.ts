import {
  Corridor,
  Archetype,
  CalculatedFitMetrics,
  AlternativeArchetype,
  ExplainabilityReport,
} from '../models/types';

export function generateExplainabilityReport(
  corridor: Corridor,
  archetype: Archetype,
  metrics: CalculatedFitMetrics,
  alternatives: AlternativeArchetype[]
): ExplainabilityReport {
  const whyThisModel: string[] = [];
  const whyThisTime: string[] = [];
  const whyThisCorridor: string[] = [];
  const whyNotAlternative: string[] = [];
  const thesisBreakers: string[] = [];
  const dataCaveats: string[] = [];

  // 1. Why This Model
  if (archetype.decision_track === 'OPEN_MARKET_SITE') {
    whyThisModel.push(
      'Autonomous storefront operation on public rights-of-way without landlord revenue shares or gatekeeper restrictions.'
    );
  } else if (archetype.decision_track === 'CONTROLLED_HOST') {
    whyThisModel.push(
      `Captive foot-traffic envelope protected by institutional host environment (${archetype.required_gate}).`
    );
  }

  if (metrics.resilienceScore >= 65) {
    whyThisModel.push(
      `Strong macro shock-absorption (Resilience Index: ${metrics.resilienceScore}/100) minimizes exposure to sudden shifts.`
    );
  }

  if (metrics.occasionBreadth >= 3) {
    whyThisModel.push(
      `Sustained multi-occasion coverage across ${metrics.occasionBreadth} active operating windows reduces off-peak drag.`
    );
  }

  // 2. Why This Time (Daypart alignment)
  const dom = metrics.dominantDaypart;
  whyThisTime.push(
    `Peak activity concentrated in ${dom.label} with an intensity score of ${dom.density}/100 (${dom.sharePercent}% of total clock mass).`
  );

  const weak = metrics.weakestDaypart;
  if (weak.density < 30) {
    whyThisTime.push(
      `Severe lull in ${weak.label} (${weak.density}/100) mandates condensed operating hours or minimal baseline staffing.`
    );
  } else {
    whyThisTime.push(
      `Balanced baseline: Even the slowest window (${weak.label}) sustains viable density (${weak.density}/100).`
    );
  }

  // 3. Why This Corridor
  if (corridor.dominant_audience.length > 0) {
    whyThisCorridor.push(
      `Primary demographic anchors driven by ${corridor.dominant_audience.join(' and ')}.`
    );
  }
  if (corridor.neighborhood_momentum >= 60) {
    whyThisCorridor.push(
      `High commercial trajectory with momentum rating of ${corridor.neighborhood_momentum}/100.`
    );
  }
  if (corridor.magnet_diversity >= 0.7) {
    whyThisCorridor.push(
      `High foot-traffic diversity (${Math.round(corridor.magnet_diversity * 100)}% dispersion across transit, retail, and workplace).`
    );
  }

  // 4. Why Not The Alternative
  const topAlt = alternatives[0];
  if (topAlt) {
    if (topAlt.isGated) {
      whyNotAlternative.push(
        `Alternative "${topAlt.archetype.name}" is blocked by gating requirement: ${topAlt.gateReason || 'Host availability required'}.`
      );
    } else if (topAlt.deltaFit > 0) {
      whyNotAlternative.push(
        `Note: Alternative "${topAlt.archetype.name}" achieves a higher resilience score (+${topAlt.deltaFit} pts) by avoiding your chosen model's peak concentration.`
      );
    } else {
      whyNotAlternative.push(
        `Alternative "${topAlt.archetype.name}" trails by ${Math.abs(topAlt.deltaFit)} points due to lower alignment with dominant corridor demand clocks.`
      );
    }
  }

  // 5. What Could Break The Thesis
  if (metrics.peakTrapWarning) {
    thesisBreakers.push(
      `Peak Trap Vulnerability: The corridor depends overwhelmingly on ${dom.label}. A 30% reduction in this single window renders full-service seating unprofitable.`
    );
  }
  if (corridor.resilience.seasonality_amplitude >= 40) {
    thesisBreakers.push(
      `Elevated Seasonality: Swing amplitude of ${corridor.resilience.seasonality_amplitude}/100 demands high summer/winter cash reserves.`
    );
  }
  if (corridor.resilience.event_dependency >= 35) {
    thesisBreakers.push(
      `Event Fragility: Foot traffic is highly tethered to ticketed arena or convention schedules (${corridor.resilience.event_dependency}/100).`
    );
  }
  if (corridor.resilience.development_dependency >= 50) {
    thesisBreakers.push(
      `Construction Friction: High development dependency (${corridor.resilience.development_dependency}/100) risks sidewalk scaffolding and access disruption.`
    );
  }
  if (thesisBreakers.length === 0) {
    thesisBreakers.push(
      'Low structural risks identified: Balanced daypart dispersion and solid baseline resilience.'
    );
  }

  // 6. Data Caveats (Adhering to strict source rules)
  dataCaveats.push(
    'Audit Notice: All metrics are derived from curated expert estimates and spatial priors, not real-time point-of-sale or live foot-traffic counters.'
  );
  if (corridor.metro_id === 'dallas-fort-worth') {
    dataCaveats.push(
      'Geometry Notice: DFW corridor boundaries reflect Voronoi display envelopes, not exact parcel or site-catchment lines.'
    );
  } else {
    dataCaveats.push(
      'Geometry Notice: NYC metrics reflect authoritative canonical H3-10 spatial ownership.'
    );
  }

  return {
    whyThisModel,
    whyThisTime,
    whyThisCorridor,
    whyNotAlternative,
    thesisBreakers,
    dataCaveats,
  };
}
