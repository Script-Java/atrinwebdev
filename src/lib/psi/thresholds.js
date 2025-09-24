export const thresholds = {
  LCP: { good: 2500, needs: 4000 },
  FCP: { good: 1800, needs: 3000 },
  INP: { good: 200, needs: 500 },
  CLS: { good: 0.1, needs: 0.25 },
  TTI: { good: 3800, needs: 7300 },
  SpeedIndex: { good: 3400, needs: 5800 },
  TotalBlockingTime: { good: 200, needs: 600 },
  TTFB: { good: 800, needs: 1800 },
};

export function metricColor(metric, value) {
  if (value == null) return "text-base-content";
  const t = thresholds[metric];
  if (!t) return "text-base-content";
  const v = metric === "CLS" ? Number(value) : Number(value);
  if (metric === "CLS") {
    if (v <= t.good) return "text-success";
    if (v <= t.needs) return "text-warning";
    return "text-error";
  }
  if (v <= t.good) return "text-success";
  if (v <= t.needs) return "text-warning";
  return "text-error";
}
