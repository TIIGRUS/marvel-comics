import { useState, useEffect, useRef, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import "./CharList.scss"

const CharList = ({ onCharSelected }) => {
    const [arrayChars, setArrayChars] = useState([]);
    const [isNewLoading, setIsNewLoading] = useState(false);
    // const [offset, setOffset] = useState(210); // 210 to Marvel API
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(9);
    const [isCharListEnded, setIsCharListEnded] = useState(false);
    const arrayRefs = useRef([]);
    const { status, getAllCharacters } = useMarvelService();
    const disabled = isCharListEnded || status === "loading";

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

    const classNameHideBtn = isCharListEnded ? "button_hidden button_disabled" : "";
    const items = arrayChars.map(({ name, thumbnail, id }, index) => {
        const nodeRef = createRef();

        return (
            <CSSTransition key={id} nodeRef={nodeRef} timeout={500} classNames="transition">
                <li className="char__item"
                    tabIndex={0}
                    ref={(el) => {
                        nodeRef.current = el;
                        setItemsRef(index, el)
                    }}
                    onClick={() => {
                        onCharSelected(id);
                        // onFocusItem(nodeRef);
                        onCharSetActive(index);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            onCharSelected(id);
                            // onFocusItem(nodeRef);
                            onCharSetActive(index);
                        }
                    }}
                >
                    <img src={thumbnail} alt={name} />
                    <div className="char__name">{name}</div>
                </li>
            </CSSTransition>
        )
    });

    return (
        <div className="char__list">
            <ul className="char__grid">
                {/* {errorMessage}
                {spinner}
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup> */}

                {setContent({
                    process: status,
                    paginationLoading: isNewLoading,
                    Component: (
                        <TransitionGroup component={null}>
                            {items}
                        </TransitionGroup>
                    )
                })}
            </ul>
            <button className={`button button__main button__long ${classNameHideBtn}`} disabled={disabled} onClick={() => onRequestMoreLoaded(limit, offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;