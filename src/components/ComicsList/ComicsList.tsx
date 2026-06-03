import { createRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import setContent from "../../utils/setContent";
import { Comic } from "../../types";
import { useFocusOnNewItems } from "../../hooks/useFocusOnNewItems";
import { useComicsContext } from "../../hooks/useComicsContext";
import { COMICS_LIMIT } from "../../contexts/ComicsContext";
import { useInfiniteScroll } from "../../hooks";
import InfiniteScrollToggle from "../InfiniteScrollToggle/InfiniteScrollToggle";
import "./ComicsList.scss";

const ComicsList = () => {
  const {
    arrayComics,
    isNewLoading,
    isEnded,
    loadMore,
    status,
    lastClickedIndex,
    setLastClickedIndex,
    initComicsFetch,
  } = useComicsContext();
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [isInfiniteScrollEnabled, setIsInfiniteScrollEnabled] = useState(false);
  const lastItemRef = useRef<HTMLAnchorElement | null>(null);
  useInfiniteScroll({
    ref: lastItemRef,
    loadMore,
    isLoading: isNewLoading,
    isEnded,
    enabled: isInfiniteScrollEnabled,
  });

  const { setFocusRef } = useFocusOnNewItems({
    currentLength: arrayComics.length,
    limit: COMICS_LIMIT,
    status,
  });

  useEffect(() => {
    if (lastClickedIndex === null) return;

    linkRefs.current[lastClickedIndex]?.focus();

    linkRefs.current.forEach((el) =>
      el?.classList.remove("comics-list__item-link_selected"),
    );
    const target = linkRefs.current[lastClickedIndex];
    target?.classList.add("comics-list__item-link_selected");
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [lastClickedIndex]);

  useEffect(() => initComicsFetch(), [initComicsFetch]);

  const renderItems = (arr: Comic[]) => {
    return arr.map((item, i) => {
      const { id, title, thumbnail, price } = item;
      const nodeRef = createRef<HTMLLIElement>();

      return (
        <CSSTransition
          key={id + i}
          nodeRef={nodeRef}
          timeout={500}
          classNames="transition"
        >
          <li
            className="comics-list__item"
            key={id}
            // ref={(el) => (nodeRef.current = el)}
            ref={(el) => {
              nodeRef.current = el;
            }}
          >
            <Link
              to={`/comics/${id}`}
              className="comics-list__item-link"
              ref={(el) => {
                setFocusRef(i)(el);
                linkRefs.current[i] = el;
                if (i === arrayComics.length - 1) {
                  lastItemRef.current = el;
                }
              }}
              onClick={() => {
                linkRefs.current.forEach((el) =>
                  el?.classList.remove("comics-list__item-link_selected"),
                );
                linkRefs.current[i]?.classList.add(
                  "comics-list__item-link_selected",
                );
                setLastClickedIndex(i);
              }}
            >
              <img
                src={thumbnail}
                alt={title}
                className="comics-list__item-img"
              />
              <h3 className="comics-list__item-name">{title}</h3>
              <p className="comics-list__item-price">{price}$</p>
            </Link>
          </li>
        </CSSTransition>
      );
    });
  };

  return (
    <section
      className="comics-list app__list"
      aria-labelledby="title-list-comics"
    >
      <h2 className="visually-hidden" id="title-list-comics">
        All comics
      </h2>
      {setContent({
        process: status,
        paginationLoading: isNewLoading,
        Component: (
          <ul className="comics-list__grid">
            <TransitionGroup component={null}>
              {renderItems(arrayComics)}
            </TransitionGroup>
          </ul>
        ),
      })}
      <div className="app__list-controls">
        <InfiniteScrollToggle
          isInfiniteScrollEnabled={isInfiniteScrollEnabled}
          setIsInfiniteScrollEnabled={setIsInfiniteScrollEnabled}
        />
        <button
          className="button button_theme_main button_size_large"
          onClick={loadMore}
          disabled={isNewLoading || isEnded}
          type="button"
        >
          <span className="button__inner">load more</span>
        </button>
      </div>
    </section>
  );
};

export default ComicsList;
