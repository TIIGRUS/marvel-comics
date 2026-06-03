import { useRef, createRef, useMemo, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import setContent from "../../utils/setContent";
import { useFocusOnNewItems } from "../../hooks/useFocusOnNewItems";
import { useCharactersContext } from "../../hooks/useCharactersContext";
import { CHARS_LIMIT } from "../../contexts/CharactersContext";
import InfiniteScrollToggle from "../InfiniteScrollToggle/InfiniteScrollToggle";
import { useInfiniteScroll } from "../../hooks";
import "./CharList.scss";

interface CharListProps {
  onCharSelected: (id: number, el: HTMLLIElement | null) => void;
}

const CharList = ({ onCharSelected }: CharListProps) => {
  const { arrayChars, loadMore, isNewLoading, isEnded, status } =
    useCharactersContext();
  const arrayRefs = useRef<(HTMLLIElement | null)[]>([]);
  // можно убрать дублирование, вернув itemRefs из хука и используя его в onCharSetActive вместо arrayRefs. Тогда arrayRefs и setItemsRef можно будет удалить:
  const { setFocusRef } = useFocusOnNewItems({
    currentLength: arrayChars.length,
    limit: CHARS_LIMIT,
    status,
  });

  const disabled = isEnded || status === "loading";
  const [isInfiniteScrollEnabled, setIsInfiniteScrollEnabled] = useState(false);
  const lastItemRef = useRef<HTMLLIElement | null>(null);
  useInfiniteScroll({
    ref: lastItemRef,
    loadMore,
    isLoading: isNewLoading,
    isEnded,
    enabled: isInfiniteScrollEnabled,
  });

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

  const classNameHideBtn = isEnded ? "button_state_hidden" : "";
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

              if (index === arrayChars.length - 1) {
                lastItemRef.current = el;
              }
            }}
            onClick={() => {
              onCharSelected(id, arrayRefs.current[index]);
              onCharSetActive(index);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
              if (e.key === " " || e.key === "Enter") {
                onCharSelected(id, arrayRefs.current[index]);
                onCharSetActive(index);
              }
            }}
          >
            <img
              src={thumbnail}
              alt={`Image of ${name}`}
              className="char-list__item-img"
            />
            <h3 className="char-list__item-name">{name}</h3>
          </li>
        </CSSTransition>
      );
    });
  }, [arrayChars, onCharSelected, setFocusRef]);

  return (
    <div className="char-list app__list">
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
      <div className="app__list-controls">
        <InfiniteScrollToggle
          isInfiniteScrollEnabled={isInfiniteScrollEnabled}
          setIsInfiniteScrollEnabled={setIsInfiniteScrollEnabled}
        />
        <button
          className={`button button_theme_main button_size_large ${classNameHideBtn}`}
          disabled={disabled}
          onClick={loadMore}
          type="button"
        >
          <span className="button__inner">load more</span>
        </button>
      </div>
    </div>
  );
};

export default CharList;
