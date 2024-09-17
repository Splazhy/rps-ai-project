/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { lazy } from 'solid-js';
import { Router, Route } from '@solidjs/router';
const Ai = lazy(() => import('./pages/Ai'));
const Home = lazy(() => import('./pages/Home'));
const Host = lazy(() => import('./pages/Host'));
const Join = lazy(() => import('./pages/Join'));

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const App = (props) => (
  <>
    {props.children}
  </>
);


render(() => (
  <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="/ai" component={Ai} />
    <Route path="/host" component={Host} />
    <Route path="/join" component={Join} />
  </Router>
), root);
