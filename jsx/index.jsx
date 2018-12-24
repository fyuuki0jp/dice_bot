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
            height:"10%",
            background:"#01A9DB",
            color:"#000000",
            
        }
        var style = {
            "text-align":"center"
        }
        var talkStyle ={
            position:"absolute",
            top:"15%",
            left:"70%",
            width:"30%",
            height:"80%",
            background:"#f2f2f3",
            color:"#000000"
        }
        var mapStyle ={
            position:"absolute",
            top:"15%",
            width:"65%",
            height:"80%"
        }
        return (
            <div>
                <header id="title" style={titileStyle}>
                    <h1 style={style}> TRPG　GM管理画面</h1>
                </header>
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