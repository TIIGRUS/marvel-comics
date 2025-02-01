import { Component } from "react"
import MarvelService from "../../services/MarvelService";

import "./RandomChar.scss"
import thor from "../../assets/images/thor.jpeg"
import mjolnir from "../../assets/images/mjolnir.png"

class RandomChar extends Component {
    state = {
        char: {
            name: null,
            description: null,
            thumbnail: null,
            homepage: null,
            wiki: null
        }
    }

    marvelService = new MarvelService();

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelService.getCharacter(id)
            .then(res => {
                this.setState({
                    char: {
                        ...res
                    }
                })
            }).catch(e => console.error("Error fethcing character", e));
    }

    componentDidMount() {
        this.updateChar();
    }

    render() {
        const { char } = this.state;
        // const { name, description, thumbnail, homepage, wiki } = char;

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={char.thumbnail} alt="Random character" className="randomchar__img" />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{char.name}</p>
                        <p className="randomchar__descr">
                            {char.description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={char.homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={char.wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

export default RandomChar;