var React = require('react');
var ReactDOM = require('react-dom');
var socket = io.connect();

var getDevice = (function(){
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
        return 'sp';
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        return 'tab';
    }else{
        return 'other';
    }
})();


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            talk:[],
            imgURL:"",
            path:"",
            mode:getDevice,
            dice:6,
            count:2,
            result:""
        }
        this.onChange = this.onChange.bind(this);
        this.SendMap = this.SendMap.bind(this);
        this.Debug = this.Debug.bind(this);
        this.Sumaho = this.Sumaho.bind(this);
        this.Tab = this.Tab.bind(this);
        this.Other = this.Other.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.DiceCount = this.DiceCount.bind(this);
        this.DiceSelect = this.DiceSelect.bind(this);
        this.ExecuteDice = this.ExecuteDice.bind(this);
    }
    componentDidMount()
    {
        var t = this.state.talk;
        socket.on("talk",(res)=>{
            this.setState({talk:this.state.talk.concat([res])});
        })
        socket.on("debug",this.Debug);
    }
    Debug(res)
    {
        console.log(res);
    }
    SendMap()
    {
        var reader = new FileReader();
        var data = {}
        reader.onload = function(event){
            data.file = event.target.result;
            data.name = this.state.path.name;
            data.type = this.state.path.type;
            socket.emit("image",data);
        }.bind(this);

        reader.readAsBinaryString(this.state.path);
    }
    onChange(e)
    {
        var reader = new FileReader();
        this.setState({path:e.target.files[0]});
        reader.onload = function(read){
            this.setState({imgURL:read.target.result});
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
    }
    Other()
    {
        var title = {
            position: "absolute",
            width: "100%",
            height: "10%",
            background: "#01A9DB",
            color: "#000000",

        }
        var h1 = {
            "text-align": "center"
        }
        var talk = {
            position: "absolute",
            top: "15%",
            left: "70%",
            width: "30%",
            height: "80%",
            background: "#f2f2f3",
            color: "#000000"
        }
        var map = {
            position: "absolute",
            top: "15%",
            width: "65%",
            height: "80%"
        }
        var view = {
            height: "50%"
        }
        return { titleStyle: title, style: h1,talkStyle:talk, mapStyle: map, ViewStyle: view ,diceStyle:dice};
    }
    Sumaho()
    {
        var title = {
            position:"float",
            height:"10%",
            background: "#01A9DB",
            color: "#000000"
        };
        var h1 = {
            margin:"0px",
            padding:"0px",
            "text-align":"center",
            background: "#01A9DB",
            color: "#000000"
        };
        var talk = {
            width:"100%",
            background: "#f2f2f3",
            color: "#000000"
        };
        var map = {
            width:"100%",
            height:"40%"
        };
        var view = {
            width:"100%",
        };
        var dice = {
            width:"100%"
        }

        return { titileStyle: title, style: h1,talkStyle:talk, mapStyle: map, ViewStyle: view ,diceStyle:dice};
    }
    Tab()
    {
        var title = {
            position:"float",
            height:"10%",
            background: "#01A9DB",
            color: "#000000"
        };
        var h1 = {
            margin:"0px",
            padding:"0px",
            "text-align":"center",
            background: "#01A9DB",
            color: "#000000"
        };
        var talk = {

        };
        var map = {

        };
        var view = {

        };

        return { titileStyle: title, style: h1,talkStyle:talk, mapStyle: map, ViewStyle: view ,diceStyle:dice};
    }
    getStyle()
    {
        var {mode} = this.state;
        if (mode == 'sp') {
            return this.Sumaho();
        }
        else{
            return this.Other();
        }
    }
    DiceCount(e)
    {
        this.setState({count:e.target.value});
    }
    DiceSelect(e)
    {
        this.setState({dice:e.target.value});
    }
    ExecuteDice()
    {
        const {dice,count} = this.state;
        var result='';
        var sum = 0;
        for(var i = 0;i<count;i++){
            var tmp = Math.floor(Math.random()*dice);
            if(dice == 6 || dice == 8 || dice == 20 || dice == 4)
            {
                tmp = tmp+1;
                sum += tmp;
            }
            if(i != 0)result+=',';
            result += tmp.toString();
        }
        this.setState({result:sum.toString()+'('+result+')'});
    }
    render() {
        var {talk,imgURL,dice,count,result} = this.state;
        var {titleStyle,style,talkStyle,mapStyle,ViewStyle,diceStyle} = this.getStyle();

        return (
            <div>
                <header id="title" style={titleStyle}>
                    <h1 style={style}> TRPG　GM管理画面</h1>
                </header>
                <div id="map" style = {mapStyle} draggable={true}>
                公開するマップ：<input type="file" onChange={this.onChange} /><br/>
                <img src={imgURL} style={ViewStyle}/><br/>
                <button onClick={this.SendMap}>マップ公開</button><br/>
                </div>
                <div id="dice" style = {diceStyle}>
                    <input type="number" value={count} onChange={this.DiceCount} />
                    D
                    <select value={dice}onChange={this.DiceSelect}>
                        <option value={4}>4</option>
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={100}>100</option>
                    </select>
                    <button onClick={this.ExecuteDice}>ダイスを振る</button><br/>
                    結果：{result}
                </div>
                <div id="talk" style = {talkStyle}>
                    トーク履歴<br/>
                    <ul style={{"list-style-type": "none",height:"100%",overflow:"auto"}}>
                        {talk.reverse().map((res)=>{return (<li>{res}</li>)})}
                    </ul>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));