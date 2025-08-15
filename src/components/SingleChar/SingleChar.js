import { Helmet } from "react-helmet";
import SingleItemLayout from "../SingleItemLayout/SingleItemLayout"

const SingleChar = ({ data }) => {
    const { name, description, thumbnail } = data || {};

    return (
        <>
            <Helmet>
                <meta name="description" content={description} />
                <title>{name}</title>
            </Helmet>
            <SingleItemLayout
                title={name}
                description={description}
                thumbnail={thumbnail}
            >
            </SingleItemLayout>
        </>
    )
}

export default SingleChar;