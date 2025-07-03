import { useState } from 'react';

import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import RandomChar from '../RandomChar/RandomChar';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

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
                    <CharInfo selectedCharId={selectedChar} />
                </div>
            </ErrorBoundary>
        </>
    )
}

export default MainPage;
