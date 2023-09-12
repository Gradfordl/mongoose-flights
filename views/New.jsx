const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <h1>New Flight Page:</h1>
        <form action="/flights" method="POST">
          Airline: <input type="text" name="airline" />
          <br />
          Flight Number: <input type="text" name="flightNo" />
          <br/>
          Departs: <input type="datetime-local" />
          <input type="submit" value="Create Flight"  />
          <nav>
          <br />
    <a href="/flights">Go Back...</a>
</nav>
        </form>
      </div>
    );
  }
}

module.exports = New;
