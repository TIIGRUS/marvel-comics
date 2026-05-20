import { createRef, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import setContent from "../../utils/setContent";
import { Comic } from "../../types";
import { useFocusOnNewItems } from "../../hooks/useFocusOnNewItems";
import { useComicsContext, COMICS_LIMIT } from "../../hooks/useComicsContext";
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
  }, []);

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
              <div className="comics-list__item-name">{title}</div>
              <div className="comics-list__item-price">{price}$</div>
            </Link>
          </li>
        </CSSTransition>
      );
    });
  };

  return (
    <div className="comics-list">
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
      <button
        className="button button__main button__long"
        onClick={loadMore}
        disabled={isNewLoading || isEnded}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
