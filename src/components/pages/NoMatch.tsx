import { Helmet } from "react-helmet-async";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const NoMatch = () => (
  <>
    <Helmet>
      <meta
        name="description"
        content="Page not found - Marvel information portal"
      />
      <title>404 - Page Not Found</title>
    </Helmet>
    <ErrorMessage textLink="Go back to main page" pathLink="/">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </ErrorMessage>
  </>
);

export default NoMatch;
