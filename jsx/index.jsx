var React = require('react');
var ReactDOM = require('react-dom');
var socket = io.connect();

class App extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        var titileStyle = {
            width:"100%",
            background:"#000F0F"
        }
        return (
            <div id="title" style={titileStyle}>
                <h1>TRPG　GM管理画面</h1>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));