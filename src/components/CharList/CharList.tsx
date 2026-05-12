import { useRef, createRef, useMemo, useEffect } from "react";
import { usePagination } from "../../hooks";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Character } from "../../types";
import "./CharList.scss";

interface CharListProps {
  onCharSelected: (id: number) => void;
}

const LIMIT = 9;

const CharList = ({ onCharSelected }: CharListProps) => {
  const { status, getAllCharacters } = useMarvelService();
  const {
    items: arrayChars,
    isNewLoading,
    isEnded,
    loadMore,
  } = usePagination<Character>({
    fetchFn: getAllCharacters,
    limit: LIMIT,
  });
  const arrayRefs = useRef<(HTMLLIElement | null)[]>([]);
  const prevCharsLength = useRef(arrayChars.length);

  useEffect(() => {
    if (
      arrayChars.length > LIMIT &&
      arrayChars.length > prevCharsLength.current &&
      status !== "loading"
    ) {
      const firstNewItemIndex = prevCharsLength.current;
      if (arrayRefs.current[firstNewItemIndex]) {
        const firstNewItem = arrayRefs.current[firstNewItemIndex];
        firstNewItem?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstNewItem?.focus();
      }
    }
    prevCharsLength.current = arrayChars.length;
  }, [arrayChars.length, status]);

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
      item?.classList.remove("char-list__item_selected"),
    );

    if (arrayRefs.current[index]) {
      arrayRefs.current[index]?.classList.add("char-list__item_selected");
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

      return (
        <CSSTransition
          key={id}
          nodeRef={nodeRef}
          timeout={500}
          classNames="transition"
        >
          <li
            className="char-list__item"
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
            <img src={thumbnail} alt={name} className="char-list__item-img" />
            <div className="char-list__item-name">{name}</div>
          </li>
        </CSSTransition>
      );
    });
  }, [arrayChars, onCharSelected]);

  return (
    <div className="char-list">
      <ul className="char-list__items">
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
