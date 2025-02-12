import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import "./CharList.scss"
// import abyss from '../../assets/images/abyss.jpg';

class CharList extends Component {
    state = {
        arrayChars: [],
        isLoading: true
    }

    marvelService = new MarvelService();

    onCharsLoaded = (arrayChars) => {
        this.setState({
            arrayChars,
            isLoading: false
        })
    }

    getAllChars = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(e => console.error("Error fetching characters", e));
    }

    componentDidMount() {
        this.getAllChars();
    }

    render() {
        const { arrayChars, isLoading } = this.state;
        const items = arrayChars.map(({ name, thumbnail, id }) => {
            return (
                <li key={id} className="char__item" onClick={() => this.props.onCharSelected(id)}>
                    <img src={thumbnail} alt={name} />
                    <div className="char__name">{name}</div>
                </li>
            )
        });
        const spinner = isLoading ? <li><Spinner /></li> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {isLoading ? spinner : items}

                    {/* <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;