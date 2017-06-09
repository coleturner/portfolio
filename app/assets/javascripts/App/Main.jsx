import createElement from '../Components/createElement';

export const Main = createElement.bind(null, 'main');
Main.defaultProps = { role: 'main' };

export default Main;
