const React = require("react");


class Index extends React.Component {
  render() {
    const { flights } = this.props;
    return (
      <div>
        <h1>Flight Page</h1>
        <a href="/flights/new"> Register a New Flight</a>
        <ul>
          {flights.map((flight) => {
            return (
              <li key={flight._id}>{`${flight.airline} ${flight.flightNo} ${flight.departs.toLocaleString()}`}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
