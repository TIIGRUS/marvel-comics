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
            <ErrorBoundary>
                <RandomChar />
                <div className='char__content'>
                    <CharList onCharSelected={onCharSelected} />
                    <div>
                        <CharInfo selectedCharId={selectedChar} />
                        <CharSearchForm />
                    </div>
                </div>
            </ErrorBoundary>
        </>
    )
}

export default MainPage;
