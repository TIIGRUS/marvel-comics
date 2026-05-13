import { useRef, createRef, useMemo } from "react";
import { usePagination } from "../../hooks";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Character } from "../../types";
import { useFocusOnNewItems } from "../../hooks/useFocusOnNewItems";
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
  // можно убрать дублирование, вернув itemRefs из хука и используя его в onCharSetActive вместо arrayRefs. Тогда arrayRefs и setItemsRef можно будет удалить:
  const { setFocusRef } = useFocusOnNewItems({
    currentLength: arrayChars.length,
    limit: LIMIT,
    status,
  });

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
    // А тут можно будет упросить код, убрав логику работы с arrayRefs и используя itemRefs из хука, например:
    //itemRefs.current.forEach((item) =>
    //   item?.classList.remove("char-list__item_selected"),
    // );
    // // ...
    // itemRefs.current[index]?.classList.add("char-list__item_selected");
    // // ...
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
              setFocusRef(index)(el);
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
