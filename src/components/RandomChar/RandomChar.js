import { Component } from "react"
import MarvelService from "../../services/MarvelService";

import thor from "../../assets/images/thor.jpeg"
import mjolnir from "../../assets/images/mjolnir.png"
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./RandomChar.scss"


class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.setState({
            loading: true
        });

        this.marvelService.getCharacter(id)
            .then(this.onCharLoaded).catch(e => {
                this.onError(e);
                console.error("Error fethcing character", e)
            });
    }

    componentDidMount() {
        this.updateChar();
    }

    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        const classNamesButton = error ? "button_disabled" : "";
        // const { char: { name, description, thumbnail, homepage, wiki }, loading } = this.state;
        // const { char } = this.state;
        // const { name, description, thumbnail, homepage, wiki } = char;

        // if (loading) {
        //     return <Spinner />
        // }

        return (
            <div className="randomchar">

                {/* {loading ? <Spinner /> : <View char={char} />} */}
                {spinner}
                {errorMessage}
                {content}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className={`button button__main ${classNamesButton}`} disabled={error} onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    return (
        <div className="randomchar__block">
            <img src={thumbnail || thor} alt={name} className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name || "Tor"}</p>
                <p className="randomchar__descr">
                    {description}
                    {/* {description ? `${description.slice(0, 210)}...` : "There is no description for this character"} */}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;