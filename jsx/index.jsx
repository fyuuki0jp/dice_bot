var React = require('react');
var ReactDOM = require('react-dom');
var socket = io.connect();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            talk:["サンプル：ここにトーク履歴が記入されていきます。"],
            imgURL:"",
        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount()
    {
        var t = this.state.talk;
        socket.on("talk",(res)=>{
            this.setState({talk:this.state.talk.concat([res])});
        })
    }
    onChange(e)
    {
        var reader = new FileReader();
        reader.onload = function(){
            this.setState({imgURL:this.result});
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
    }
    render() {
        var {talk,imgURL} = this.state;
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
                    トーク履歴<br/>
                    <ul style={{"list-style-type": "none"}}>
                        {talk.map((res)=>{return (<li>{res}</li>)})}
                    </ul>
                </div>
                <div id="map" style = {mapStyle} draggable={true}>
                <input type="file" onChange={this.onChange} />
                <img src={imgURL}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));