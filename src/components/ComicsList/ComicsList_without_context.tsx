import { createRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Comic } from "../../types";
import { usePagination } from "../../hooks";
import "./ComicsList.scss";
import { useFocusOnNewItems } from "../../hooks/useFocusOnNewItems";

const ComicsList = () => {
  const {
    status,
    getAllComics,
    // getAll,
  } = useMarvelService();
  const {
    items: arrayComics,
    isNewLoading,
    isEnded,
    loadMore,
  } = usePagination<Comic>({
    fetchFn: getAllComics,
    limit: 8,
  });
  const { setFocusRef } = useFocusOnNewItems({
    currentLength: arrayComics.length,
    limit: 8,
    status,
  });

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
              ref={setFocusRef(i)}
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
        className="button button_theme_main button_size_long"
        onClick={loadMore}
        disabled={isNewLoading || isEnded}
      >
        <div className="button__inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
