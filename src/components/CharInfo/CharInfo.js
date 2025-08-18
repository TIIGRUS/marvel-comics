import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Skeleton from "../Skeleton/Skeleton";
import "./CharInfo.scss";

const CharInfo = ({ selectedCharId }) => {
    const [char, setChar] = useState(null);
    const { status, getCharacter, clearError } = MarvelService();

    useEffect(() => {
        const updateChar = () => {
            if (!selectedCharId) {
                return;
            }

            clearError();

            getCharacter(selectedCharId)
                .then(onCharLoaded)
        }

        if (selectedCharId) {
            updateChar();
        }
    }, [selectedCharId]);

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const setContent = (process, char) => {
        switch (process) {
            case 'waiting':
                return <Skeleton />;

            case 'loading':
                return <Spinner />;

            case 'confirmed':
                return <View char={char} />;

            case 'error':
                return <ErrorMessage />;
            default:
                throw new Error(`Unexpected process state: ${process}`);
        }
    }

    return (
        <div className="char__info">
            {setContent(status, char)}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, wiki, homepage, comics } = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? (
                    comics.slice(0, 10).map((item, i) => (
                        <li key={i} className="char__comics-item">
                            {/* {item.name}  This to Marvel API*/}
                            {item}
                        </li>
                    ))
                ) : (
                    <span>Comics not found for this character.</span>
                )}
            </ul>
        </>
    )
}


export default CharInfo;