import { useState, useEffect, useRef } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./CharList.scss"
// import abyss from '../../assets/images/abyss.jpg';

const CharList = ({ id, onCharSelected }) => {
    const [arrayChars, setArrayChars] = useState([]);
    const [isNewLoading, setIsNewLoading] = useState(false);
    // const [offset, setOffset] = useState(210); // 210 to Marvel API
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(9);
    const [isCharListEnded, setIsCharListEnded] = useState(false);
    const arrayRefs = useRef([]);

    const { isLoading, error, getAllCharacters } = useMarvelService();

    const onRequest = (limit, offset, isInitialLoading) => {
        isInitialLoading ? setIsNewLoading(false) : setIsNewLoading(true);

        getAllCharacters(limit, offset)
            .then((arrayChars) => {
                onInitialCharsListLoaded(arrayChars);
            })
    }

    useEffect(() => {
        onRequest(limit, offset, true);
    }, []);

    const onInitialCharsListLoaded = (arrayChars) => {
        onIsCharsListEnded(arrayChars);
        setArrayChars(arrayChars);
    }

    const onMoreCharsListLoaded = (newArrayChars) => {
        onIsCharsListEnded(newArrayChars);

        setArrayChars((arrayChars) => {
            return [...arrayChars, ...newArrayChars];
        });
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

        getAllCharacters(limit, offset)
            .then((arrayChars) => {
                onMoreCharsListLoaded(arrayChars);
            })
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

    const errorMessage = error ? <li><ErrorMessage /></li> : null;
    const spinner = isLoading && !isNewLoading ? <li><Spinner /></li> : null;
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
    // const content = !(isLoading || error) ? items : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {items}
            </ul>
            <button className={`button button__main button__long ${classNameHideBtn}`} disabled={isCharListEnded || isLoading || error} onClick={() => onRequestMoreLoaded(limit, offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;