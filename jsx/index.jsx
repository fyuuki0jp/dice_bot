var React = require('react');
var ReactDOM = require('react-dom');
var DropZone = require('react-dropzone');
const { getMuiTheme, MuiThemeProvider } = require('material-ui/styles');
const { RaisedButton, AppBar, Drawer,Menu,Checkbox, MenuItem,Toggle, Divider,FlatButton, TextField, SelectField,Slider,LinearProgress, Paper, DropDownMenu, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn, Stepper, Step, StepLabel,Dialog } = require('material-ui');
var socket = io.connect();

class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
                <h1>Hello World!</h1>
        )
    }
}

class Keaper extends React.Component
{
    constructor(props)
    {
        super(props);
        this.sendfile = this.sendfile.bind(this);
    }
    sendfile(file)
    {
        var reader = new FileReader();
        var send_file = file;
        reader.onload = (event) => {
            data.file = event.target.result;
            data.name = send_file;
            data.type = "image/jpg";
   
            socket.emit('image',data);
        }
        reader.readAsBinaryString(send_file);
    }
    render()
    {
        var left = {
            width:"70%"
        };
        var right = {
            left:"75%",
            width:"25%",
            background:"#f2f2f3"
        };
        return (
            <div >
                <div draggable={true} style={left}>
                    <DropZone onDrop={sendfile}  accept="image/jpg">
                        <div>画像をドラックまたはクリック</div>
                    </DropZone>
                </div>
                <div draggable={false} style={right}>

                </div>
            </div>
        )
    }
}

class Version extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (
            <h1>バージョン情報</h1>
            
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            mode:0
        };
        this.OpenMenu = this.OpenMenu.bind(this);
        this.Home = this.Home.bind(this);
        this.Keaper = this.Keaper.bind(this);
        this.Version = this.Version.bind(this);
    }
    OpenMenu()
    {
        this.setState({open:true});
    }
    Home()
    {
        this.setState({open:false,mode:0});
    }
    Keaper()
    {
        this.setState({open:false,mode:1});
    }
    Version()
    {
        this.setState({open:false,mode:2});
    }
    render()
    {
        
        var main = <Home/>
        if(this.state.mode == 1)main = <Keaper/>
        else if(this.state.mode==2)main=<Version/>


        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AppBar
                title={"TRPGシステム(大工大TRPGサークル)"}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonClick={this.OpenMenu}
            />
            <Drawer open={this.state.open} width="30%" docked={true}>
                <MenuItem onClick={this.Home}>ホーム</MenuItem>
                <ManuItem onClick={this.Keaper}>キーパー管理画面</ManuItem>
                <MenuItem onClick={this.Version}>バージョン</MenuItem>
            </Drawer>
            {main}
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));