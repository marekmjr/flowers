export const HealthBar = ({ maxHp = 100, hp = 100 } = {}) => {
  const barWidth = (hp / maxHp) * 100;
  // setHitWidth((damage / hp) * 100);
  // setBarWidth((hpLeft / maxHp) * 100);
  return (
      <div className="health-bar">
        <div className="bar" style={{ width: `${barWidth}%` }}></div>
        <div className="hit" style={{ width: `${0}%` }}></div>

        <div
          style={{
            position: "absolute",
            top: "5px",
            left: 0,
            right: 0,
            textAlign: "center"
          }}
        >
          {hp/maxHp*100} / {100}
        </div>
      </div>
  );
};
