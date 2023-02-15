export const HealthBar = ({ maxHp = 100, hp = 100 } = {}) => {
  const barWidth = (hp / maxHp) * 100;

  const health = Math.round((hp / maxHp) * 100);
  const healthColorClass = () => {
    if (health < 25) {
      return "bg-red-600";
    } else if (health < 50) {
      return "bg-orange-400";
    } else if (health < 75) {
      return "bg-green-400";
    } else {
      return "bg-emerald-600";
    }
  };

  // setHitWidth((damage / hp) * 100);
  // setBarWidth((hpLeft / maxHp) * 100);
  return (
    <div className="health-bar">
      <div
        className={`bar ${healthColorClass()}`}
        style={{ width: `${barWidth}%` }}
      ></div>
      <div className="hit" style={{ width: `${0}%` }}></div>

      <div
        style={{
          position: "absolute",
          top: "2px",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {health} / {100}
      </div>
    </div>
  );
};
