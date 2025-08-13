import SingleItemLayout from "../SingleItemLayout/SingleItemLayout"

const SingleChar = ({ title, description, thumbnail }) => {
    return (
        <SingleItemLayout
            title={title}
            description={description}
            thumbnail={thumbnail}
            backLink="/characters"
        >
        </SingleItemLayout>
    )
}

export default SingleChar;