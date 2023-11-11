export const riskLevelColors = {
  low: "bg-green-200",
  medium: "bg-orange-200",
  high: "bg-red-200",
};

export const getRiskLevelColor = (riskLevel: string) => {
  switch (riskLevel) {
    case "low":
      return "#10B981";
    case "medium":
      return "#F59E0B";
    case "high":
      return "#EF4444";
    default:
      return "#6B7280";
  }
};
