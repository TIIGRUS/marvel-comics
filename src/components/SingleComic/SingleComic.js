import SingleItemLayout from '../SingleItemLayout/SingleItemLayout';

const SingleComic = ({ data }) => {
    const { title, description, pageCount, language, price, thumbnail } = data || {};

    return (
        <SingleItemLayout
            title={title}
            description={description}
            thumbnail={thumbnail}
            backLink="/comics"
        >
            <p className="single-item__descr">{pageCount} pages</p>
            <p className="single-item__descr">Language: {language}</p>
            <div className="single-item__price">{price}$</div>
        </SingleItemLayout>
    )
}

export default SingleComic;