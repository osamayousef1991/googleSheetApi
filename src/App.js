import React, { Component } from "react";
import "./App.css";
import config from "./config";

class App extends Component {
  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        // 3. Initialize and make the API request.
        this.load();
      });
  };

  load() {
    window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.spreadsheetId,
          range: "Sheet1"
        })
        .then(response => {
          console.log(response.result);
        });
    });
  }
  componentDidMount() {
    //  window.gapi.load("client", this.initClient);

    // to get for sheet inside total sheet by gid

    const API =
      "https://docs.google.com/a/google.com/spreadsheets/d/1ehSc4AfhuumZ1lAtsda37TDFYf3Y0yXwbBu4-FxVAHo/gviz/tq?key=AIzaSyC5lT3hIMP09OADy_XcpAtjZpg1nCbUlK8&gid=0&tq=select%20*";

    //   const API =
    // "https://sheets.googleapis.com/v4/spreadsheets/1ehSc4AfhuumZ1lAtsda37TDFYf3Y0yXwbBu4-FxVAHo/values/Sheet1?key=AIzaSyC5lT3hIMP09OADy_XcpAtjZpg1nCbUlK8";

    fetch(API)
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        var newDate = data
          .replace("google.visualization.Query.setResponse", "")
          .replace("/*O_o*/", "")
          .replace("(", "")
          .replace(");", "");
        console.log(JSON.parse(newDate));
      });

    // fetch(API)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   });
  }
  render() {
    return <div>test</div>;
  }
}

export default App;
