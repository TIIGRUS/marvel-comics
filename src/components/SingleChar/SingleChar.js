import SingleItemLayout from "../SingleItemLayout/SingleItemLayout"

const SingleChar = ({ data }) => {
    const { name, description, thumbnail } = data || {};

    return (
        <SingleItemLayout
            title={name}
            description={description}
            thumbnail={thumbnail}
        >
        </SingleItemLayout>
    )
}

export default SingleChar;