import { h, render } from 'preact';
import App from '../app/app.jsx';
const root = document.getElementById('root');
render(<App />, root, root.lastChild);
