var React = require('react');
var ReactDOM = require('react-dom');
var socket = io.connect();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            talk:[],
        }
    }
    componentWillMount()
    {
        socket.on("talk",(res)=>{
            this.setState({talk:this.state.talk.push(res)});
        })
    }
    render() {
        var {talk} = this.state;
        var titileStyle = {
            position:"absolute",
            width:"100%",
            height:"20%",
            background:"#00eeee",
            color:"#000000"
        }
        var talkStyle ={
            top:"20%",
            left:"70%",
            width:"30%",
            height:"80%",
            position:"absolute",
            background:"#f2f2f3",
            color:"#000000"
        }
        var mapStyle ={
            position:"absolute",
            top:"20%",
            width:"65%",
            height:"80%"
        }
        return (
            <div>
                <div id="title" style={titileStyle}>
                    <h1> TRPG　GM管理画面</h1>
                </div>
                <div id="talk" style = {talkStyle}>
                    {talk}
                </div>
                <div id="map" style = {mapStyle}>

                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));