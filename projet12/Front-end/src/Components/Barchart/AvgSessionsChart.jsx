import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import PropTypes from "prop-types";
/**
 * A component to display average session duration data using a line chart.
 * @param {object} props - The props object.
 * @param {object} props.data - The user's average session data object.
 * @param {number} props.data.day - The day of the session.
 * @param {number} props.data.sessionLength - The length of the session.
 * @returns {JSX.Element} The AvgSessionsChart React component.
 */

const AvgSessionsChart = (props) => {
  console.log("AvgSessionsChart props:", props);
  const { data } = props;
  if (!data) {
    return <div>Aucune donnée d'activité utilisateur trouvée.</div>;
  }

  console.log("AvgSessionsChart props6:", props);
  const dayLetters = ["L", "M", "M", "J", "V", "S", "D"];
  console.log("userAverageSessions.sessions", data.sessions);
  const datas = data.map((session, index) => ({
    day: session.day,
    sessionLength: session.sessionLength,
  }));
  const renderTooltip = ({ active, payload }) => {
    if (active && payload.length) {
      return (
        <div
          style={{
            background: "#FFFFFF",
            color: "#000000",
            padding: "1em 1em",
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          <p>{payload[0].value} min</p>
        </div>
      );
    }
  };

  console.log("AvgSessionsChart datas:", datas);
  return (
    <ResponsiveContainer width="90%" height="90%">
      <LineChart
        data={datas}
        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
      >
        <defs>
          <linearGradient id="lineGradient">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="30%" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="100%" />
          </linearGradient>
        </defs>
        <text
          x={10}
          y={30}
          textAnchor="left"
          style={{
            fontSize: "1.8rem",
            fontWeight: 500,
            fill: "#FFFFFF",
            fillOpacity: "50%",
          }}
        >
          Durée moyenne des sessions
        </text>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#FFFFFF", fillOpacity: "50%" }}
          stroke="#FFFFFF"
          tickMargin={10}
          tickFormatter={(day) => dayLetters[day - 1]}
        />
        <YAxis
          dataKey="sessionLength"
          hide={true}
          domain={["dataMin -20", "dataMax + 50"]}
        />
        <Line
          dataKey="sessionLength"
          type="natural"
          stroke="url(#lineGradient)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            stroke: "#FFFFFF",
            strokeOpacity: "50%",
            strokeWidth: 10,
          }}
        />
        <Tooltip
          content={renderTooltip}
          cursor={{
            stroke: "#000000",
            strokeOpacity: "10%",
            strokeWidth: "20%",
            height: "100%",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

AvgSessionsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      sessionLength: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AvgSessionsChart;
