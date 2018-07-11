import '../static/scss/main.scss';
import { h, Component } from 'preact';
import { Route, Link } from 'react-router-dom';
import Nav from './components/nav/nav.jsx';
import Section from './components/section/section.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <section className="section">
          <div className="columns">
            <div className="column has-background-white-ter">
              A
            </div>
            <div className="column is-half has-background-white-ter">
              B
            </div>
            <div className="column has-background-white-ter">
              C
            </div>
          </div>
        </section>
      </div>
    );
  }
}
