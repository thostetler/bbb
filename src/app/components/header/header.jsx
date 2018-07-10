import { h } from 'preact';
import { Provider, Container } from 'rebass';

const Header = ({ children }) =>
<Provider>
  <Container>{children}</Container>
</Provider>

export default Header;
