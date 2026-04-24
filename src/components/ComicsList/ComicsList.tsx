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

  // const spinner = isLoading && !isNewLoading ? <Spinner /> : null;
  // const errorMessage = error ? <ErrorMessage /> : null;
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
            className="comics__item"
            key={id}
            // ref={(el) => (nodeRef.current = el)}
            ref={nodeRef}
          >
            <Link to={`/comics/${id}`}>
              <img src={thumbnail} alt={title} className="comics__item-img" />
              <div className="comics__item-name">{title}</div>
              <div className="comics__item-price">{price}$</div>
            </Link>
          </li>
        </CSSTransition>
      );
    });
  };

  return (
    <div className="comics__list">
      {/* {spinner}
            {errorMessage}
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {renderItems(comics)}
                </TransitionGroup>
            </ul> */}
      {setContent({
        process: status,
        paginationLoading: isNewLoading,
        Component: (
          <ul className="comics__grid">
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
