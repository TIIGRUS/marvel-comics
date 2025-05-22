import { useState, useEffect, useRef } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./CharList.scss"
// import abyss from '../../assets/images/abyss.jpg';

const CharList = ({ id, onCharSelected }) => {
    const [arrayChars, setArrayChars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNewLoading, setIsNewLoading] = useState(false);
    const [error, setError] = useState(false);
    // const [offset, setOffset] = useState(210); // 210 to Marvel API
    const [offset, setOffset] = useState(3);
    const [limit, setLimit] = useState(9);
    const [isCharListEnded, setIsCharListEnded] = useState(false);
    const arrayRefs = useRef([]);

    const marvelService = new MarvelService();

    const onRequest = (limit, offset) => {
        onNewCharsListLoading();

        marvelService.getAllCharacters(limit, offset)
            .then(onInitialCharsListLoaded)
            .catch(e => {
                console.error("Error fetching characters", e)
                onError();
            });
    }

    useEffect(() => {
        onRequest(limit, offset);
    }, []);

    const onInitialCharsListLoaded = (arrayChars) => {
        onIsCharsListEnded(arrayChars);

        setArrayChars(arrayChars);
        setIsLoading(false);
        setIsNewLoading(false);
    }

    const onMoreCharsListLoaded = (newArrayChars) => {
        onIsCharsListEnded(newArrayChars);

        setArrayChars((arrayChars) => {
            return [...arrayChars, ...newArrayChars];
        });

        setIsLoading(false);
        setIsNewLoading(false);
    }

    const onNewCharsListLoading = () => {
        setIsNewLoading(true);
        setIsCharListEnded(false);
    }

    const onIsCharsListEnded = (arrayChars) => {
        if (arrayChars.length < limit) {
            setIsCharListEnded(true);
        }
    }

    const onRequestMoreLoaded = (limit, offset) => {
        offset = offset + limit;

        onNewCharsListLoading();

        setOffset(offset);

        marvelService.getAllCharacters(limit, offset)
            .then(onMoreCharsListLoaded)
            .catch(e => {
                console.error("Error fetching characters", e)
                onError();
            });
    }

    const setItemsRef = (index, ref) => {
        // if (ref && !itemRefs.includes(ref)) {
        //     itemRefs.push(ref);
        // }
        if (ref && !arrayRefs.current.includes(ref)) {
            // itemRefs.current.push(ref);
            arrayRefs.current[index] = ref;
        }
    }

    const onCharSetActive = (index) => {
        arrayRefs.current.forEach(item => item.classList.remove("char__item_selected"));

        if (arrayRefs.current[index]) {
            arrayRefs.current[index].classList.add("char__item_selected");
            arrayRefs.current[index].focus();
        }
    }

    const onError = () => {
        setIsLoading(false);
        setError(true);
    }

    const errorMessage = error ? <li><ErrorMessage /></li> : null;
    const spinner = isLoading ? <li><Spinner /></li> : null;
    const classNameHideBtn = isCharListEnded ? "button_hidden button_disabled" : "";
    const items = arrayChars.map(({ name, thumbnail, id }, index) => {
        return (
            <li key={id} className="char__item"
                onClick={() => {
                    onCharSelected(id);
                    onCharSetActive(index);
                }}
                ref={(el) => setItemsRef(index, el)} tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                        onCharSelected(id);
                        onCharSetActive(index);
                    }
                }}
            >
                <img src={thumbnail} alt={name} />
                <div className="char__name">{name}</div>
            </li>
        )
    });
    const content = !(isLoading || error) ? items : null;


    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
            </ul>
            <button className={`button button__main button__long ${classNameHideBtn}`} disabled={isNewLoading || isCharListEnded} onClick={() => onRequestMoreLoaded(limit, offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;