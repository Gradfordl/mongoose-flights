const React = require("react");

class Show extends React.Component {
  render() {
    const { airline, flightNo, departs, airport, destinations } =
      this.props.flight;

    return (
      <div>
        <h1>Flight Info</h1>
        <b>Airline:</b> {`${airline} `} <br />
        <b>Flight #:</b> {`${flightNo} `} <br />
        <b>Departs:</b> {`${departs} `} <br />
        <b>From Airport:</b> {`${airport} `} <br />
        <b>Destination:</b> {destinations.map((flight) => {
            return(
                <li key={flight._id}>{`${flight.arrival.toLocaleString()}`}{" "}{`Destination Airport: ${flight.airport}`}</li>
            )
        })} <br />

        <form
          action={`/flights/${this.props.flight._id}?_method=PUT`}
          method="POST"
        >
          <b>Airport:</b>{" "}
          <select name="airport">
            <option value="SAN">SAN</option>
            <option value="AUS">AUS</option>
            <option value="DAL">DAL</option>
            <option value="LAX">LAX</option>
            <option value="SEA">SEA</option>
          </select>{" "}
          <br />
          <b>Arrival:</b> <input type="datetime-local" name="arrival" /><br />
          <input type="submit" value="Submit Arrival Info" />
        </form>
        <br />
        <nav>
        <a href="/flights"> Flights Home</a>
        </nav>
      </div>
    );
  }
}

module.exports = Show;
