import { useState } from 'react';

import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import RandomChar from '../RandomChar/RandomChar';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import CharSearchForm from '../CharSearchForm/CharSearchForm';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <RandomChar />
            <div className='char__content'>
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo selectedCharId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )
}

export default MainPage;
