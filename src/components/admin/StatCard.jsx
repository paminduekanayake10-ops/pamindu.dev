function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e293b",
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
  },
};

export default StatCard;