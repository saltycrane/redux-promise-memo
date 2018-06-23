import React from "react";

const VehicleCard = ({ color, color_hex, make, model, trim, year }) => (
  <div style={styles.card}>
    <div style={styles.firstRow}>
      <div style={styles.ymm}>
        {year} {make} {model}
      </div>
      <div style={styles.colorInfo}>
        <div style={styles.colorText}>{color}</div>
        <div
          style={{
            ...styles.colorSwatch,
            backgroundColor: `#${color_hex}`,
          }}
        />
      </div>
    </div>
    <div style={styles.trim}>{trim}</div>
  </div>
);

export default VehicleCard;

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    color: "#333",
    margin: 10,
    padding: "14px 22px",
    width: "100%",
  },
  colorInfo: {
    alignItems: "center",
    display: "flex",
  },
  colorSwatch: {
    height: 20,
    marginLeft: 7,
    width: 20,
  },
  colorText: {
    color: "#666",
    fontSize: 12,
    marginTop: 2,
  },
  firstRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 3,
  },
  trim: {
    color: "#666",
    fontStyle: "italic",
  },
  ymm: {
    fontSize: 22,
    fontWeight: 500,
  },
};
