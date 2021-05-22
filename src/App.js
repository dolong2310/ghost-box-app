import { Redirect, Route, Switch } from "react-router";
import "./assets/scss/style.scss";
import Content from "./components/Content";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Photos from "./pages/Photos";
import Apps from "./pages/Apps";
import Settings from "./pages/Settings";

function App() {
    return (
        <>
            <div className="app">
                <div className="container wide">
                    <div className="row no-gutter">
                        <div className="col sm-2 md-2 lgm-2 lg-3">
                            <SideBar />
                        </div>
                        <div className="col sm-10 md-10 lgm-10 lg-9">
                            <Switch>
                                <Redirect from="/home" to="/" exact></Redirect>

                                <Route path="/" exact component={Home} />
                                <Route path="/app" component={Apps} />
                                <Route path="/photos" component={Photos} />
                                <Route path="/file" component={Content} />
                                <Route path="/setting" component={Settings} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
