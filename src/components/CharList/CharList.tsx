import { useRef, createRef, useMemo } from "react";
import { usePagination } from "../../hooks";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Character } from "../../types";
import "./CharList.scss";

interface CharListProps {
  onCharSelected: (id: number) => void;
}

const CharList = ({ onCharSelected }: CharListProps) => {
  const { status, getAllCharacters } = useMarvelService();
  const {
    items: arrayChars,
    isNewLoading,
    isEnded,
    loadMore,
  } = usePagination<Character>({
    fetchFn: getAllCharacters,
    limit: 9,
  });
  const arrayRefs = useRef<(HTMLLIElement | null)[]>([]);
  const disabled = isEnded || status === "loading";

  const setItemsRef = (index: number, ref: HTMLLIElement | null) => {
    // if (ref && !itemRefs.includes(ref)) {
    //     itemRefs.push(ref);
    // }
    if (ref && !arrayRefs.current.includes(ref)) {
      // itemRefs.current.push(ref);
      arrayRefs.current[index] = ref;
    }
  };

  const onCharSetActive = (index: number) => {
    arrayRefs.current.forEach((item) =>
      item?.classList.remove("char__item_selected"),
    );

    if (arrayRefs.current[index]) {
      arrayRefs.current[index]?.classList.add("char__item_selected");
      arrayRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      arrayRefs.current[index]?.focus();
    }
  };

  const classNameHideBtn = isEnded ? "button_hidden button_disabled" : "";
  const items = useMemo(() => {
    return arrayChars.map(({ name, thumbnail, id }, index) => {
      const nodeRef = createRef<HTMLLIElement>();

      console.log("render items");

      return (
        <CSSTransition
          key={id}
          nodeRef={nodeRef}
          timeout={500}
          classNames="transition"
        >
          <li
            className="char__item"
            tabIndex={0}
            ref={(el) => {
              nodeRef.current = el;
              setItemsRef(index, el);
            }}
            onClick={() => {
              onCharSelected(id);
              // onFocusItem(nodeRef);
              onCharSetActive(index);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
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
      );
    });
  }, [arrayChars, onCharSelected]);

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
            <TransitionGroup component={null}>{items}</TransitionGroup>
          ),
        })}
      </ul>
      <button
        className={`button button__main button__long ${classNameHideBtn}`}
        disabled={disabled}
        onClick={loadMore}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
