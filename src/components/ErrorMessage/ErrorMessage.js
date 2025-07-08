import "./ErrorMessage.scss";

const ErrorMessage = () => {
    return (
        <div className="error-message">
            <img src={`${process.env.PUBLIC_URL}/error.gif`} className="error-message__img" alt='Robot and it system is error' />
        </div>
    )
}

export default ErrorMessage;