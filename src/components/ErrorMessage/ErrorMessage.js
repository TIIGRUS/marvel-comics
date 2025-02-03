import "./ErrorMessage.scss";
const img = "./error.gif"

const ErrorMessage = () => {
    return (
        <div className="error-message">
            {/* <img src={process.env.PUBLIC_URL + "/error.gif"} /> */}
            <img src={img} className="error-message__img" alt="Robot and it system is error" />
        </div>
    )
}

export default ErrorMessage;