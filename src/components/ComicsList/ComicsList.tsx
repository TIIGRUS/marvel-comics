import { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Comic } from "../../types";
import "./ComicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const {
    isLoading,
    error,
    isEndOfList,
    isNewLoading,
    status,
    getAllComics,
    // getAll,
  } = useMarvelService();

  // Initial loading
  useEffect(() => {
    getAllComics({ limit: 8 }).then((data) => setComics(data));
    // getAll({ type: "comics", limit: 8 }).then(data => setComics(data));
  }, []);

  const onRequestMoreLoaded = () => {
    // getAll({ type: "comics", limit: 4 }).then(newComics => {
    getAllComics({ limit: 4 }).then((newComics) => {
      setComics((prevComics) => [...prevComics, ...newComics]);
    });
  };

  // const spinner = isLoading && !isNewLoading ? <Spinner /> : null;
  // const errorMessage = error ? <ErrorMessage /> : null;
  const renderItems = (arr: Comic[]) => {
    return arr.map((item, i) => {
      const { id, title, thumbnail, price } = item;
      const nodeRef = createRef<HTMLLIElement>();

      return (
        <CSSTransition
          key={id}
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
              {renderItems(comics)}
            </TransitionGroup>
          </ul>
        ),
      })}
      <button
        className="button button__main button__long"
        onClick={onRequestMoreLoaded}
        disabled={isLoading || isEndOfList || !!error}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
