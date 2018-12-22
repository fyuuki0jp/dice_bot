var React = require('react');
var ReactDOM = require('react-dom');
const { getMuiTheme, MuiThemeProvider } = require('material-ui/styles');
const { RaisedButton, AppBar, Drawer,Menu,Checkbox, MenuItem,Toggle, Divider,FlatButton, TextField, SelectField,Slider,LinearProgress, Paper, DropDownMenu, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn, Stepper, Step, StepLabel,Dialog } = require('material-ui');
//var socket = io.connect();

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false
        };
    }
    OpenMenu()
    {
        this.setState({open:true});
    }
    render()
    {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AppBar
                title={"監視カメラ"}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonClick={this.OpenMenu}
            />
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));