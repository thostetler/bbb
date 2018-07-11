import '../static/scss/main.scss';
import { h, Component } from 'preact';
import { Route, Link } from 'react-router-dom';
import Nav from './components/nav/nav.jsx';

const ResultsLayout = () =>
<div className="columns">
  <div className="column has-background-white-ter">
    LEFT
  </div>
  <div className="column is-half has-background-white-ter">
    Main
  </div>
  <div className="column has-background-white-ter">
    Right
  </div>
</div>

const LandingLayout = () =>
<div className="container is-fluid">
  LANDING
</div>

const Breadcrumb = () =>
<nav className="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><Link to="/">Home</Link></li>
    <li className="is-active">
      <Link to="#" aria-current="page">Search</Link>
    </li>
  </ul>
</nav>

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <Breadcrumb/>
        <section className="section">
          <Route exact path="/" component={LandingLayout} />
          <Route path="/search" component={ResultsLayout} />
        </section>
      </div>
    );
  }
}
