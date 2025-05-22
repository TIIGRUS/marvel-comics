import { useState, useEffect } from "react"
import MarvelService from "../../services/MarvelService";

import thor from "../../assets/images/thor.jpeg"
import mjolnir from "../../assets/images/mjolnir.png"
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./RandomChar.scss"


const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const marvelService = new MarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const updateChar = () => {
        // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        const id = Math.floor(Math.random() * (20 - 1 + 1) + 1); // Include max and min values

        onCharLoading();

        marvelService.getCharacter(id)
            .then(onCharLoaded).catch(e => {
                onError(e);
                console.error("Error fethcing character", e)
            });
    }

    useEffect(() => {
        updateChar();
    }, []);

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
                <button className={`button button__main ${classNamesButton}`} disabled={error} onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
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