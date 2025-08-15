import { Helmet } from 'react-helmet';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import CommicsList from '../ComicsList/ComicsList';
import AppBanner from '../AppBanner/AppBanner';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with list of Marvel Comics" />
                <title>Comics page</title>
            </Helmet>
            <ErrorBoundary>
                <AppBanner />
                <CommicsList />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;