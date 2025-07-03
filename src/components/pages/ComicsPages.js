import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import CommicsList from '../ComicsList/ComicsList';
import AppBanner from '../AppBanner/AppBanner';

const ComicsPage = () => {
    return (
        <ErrorBoundary>
            <AppBanner />
            <CommicsList />
        </ErrorBoundary>
    )
}

export default ComicsPage;