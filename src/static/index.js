import { h, render } from 'preact';
import { BrowserRouter} from 'react-router-dom';
import App from '../app/app.jsx';
const root = document.getElementById('root');
render((
<BrowserRouter>
  <App />
</BrowserRouter>
), root, root.lastChild);
