import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const NoMatch = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <ErrorMessage />

        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go to Home</Link>
    </div>
);

export default NoMatch;