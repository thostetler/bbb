import { h } from 'preact';
import styled from 'styled-components';

const Brand = styled.div`
  font-size: 1.5em;
  padding: 5px;
`;

const Nav = () =>
<div className="navbar is-dark" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <Brand>Demo</Brand>
  </div>
</div>

export default Nav;
