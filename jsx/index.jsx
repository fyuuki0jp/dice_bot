var React = require('react');
var ReactDOM = require('react-dom');
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            mode:0
        };
    }
    OpenMenu()
    {
        this.setState({open:true});
    }
    Home()
    {
        this.setState({open:false,mode:0});
    }
    Dice()
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
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AppBar
                title={"TRPGシステム(大工大TRPGサークル)"}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonClick={this.OpenMenu}
            />
            <Menu>
                <MenuItem onClick={this.Home}>ホーム</MenuItem>
                <MenuItem onClick={this.Dice}>ダイスロール</MenuItem>
                <MenuItem onClick={this.Version}>バージョン</MenuItem>
            </Menu>
            {main}
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));