import ErrorMessage from "../ErrorMessage/ErrorMessage";

const NoMatch = () => (
  <ErrorMessage>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
  </ErrorMessage>
);

export default NoMatch;
