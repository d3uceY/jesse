import { statsBar } from "@/lib/site-data";

export default function StatsBar() {
  return (
    <div className="stats-bar">
      {statsBar.map((stat) => (
        <div className="stats-bar__cell reveal" key={stat.label}>
          <div className="stats-bar__value">{stat.value}</div>
          <div className="stats-bar__label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
