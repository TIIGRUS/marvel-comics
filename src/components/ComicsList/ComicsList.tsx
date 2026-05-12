import { createRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Comic } from "../../types";
import { usePagination } from "../../hooks";
import "./ComicsList.scss";

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
            ref={nodeRef}
          >
            <Link to={`/comics/${id}`}>
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
