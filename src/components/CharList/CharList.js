import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./CharList.scss"
// import abyss from '../../assets/images/abyss.jpg';

class CharList extends Component {
    state = {
        arrayChars: [],
        isLoading: true,
        isNewLoading: false,
        error: false,
        offset: 210,
        limit: 9,
        isCharListEnded: false,
    }

    marvelService = new MarvelService();

    onInitialCharsListLoaded = (arrayChars) => {
        this.onIsCharsListEnded(arrayChars);

        this.setState({
            arrayChars,
            isLoading: false,
            isNewLoading: false,
        });
    }

    onMoreCharsListLoaded = (newArrayChars) => {
        this.onIsCharsListEnded(newArrayChars);

        this.setState(({ arrayChars }) => (
            {
                arrayChars: [...arrayChars, ...newArrayChars],
                isLoading: false,
                isNewLoading: false,
            }
        ))
    }

    onNewCharsListLoading = () => {
        this.setState({
            isNewLoading: true,
        })
    }

    onIsCharsListEnded = (arrayChars) => {
        const { limit } = this.state;

        if (arrayChars.length < limit) {
            this.setState({
                isCharListEnded: true,
            })
        }
    }

    onRequest = (limit, offset) => {
        this.onNewCharsListLoading();

        this.marvelService.getAllCharacters(limit, offset)
            .then(this.onInitialCharsListLoaded)
            .catch(e => {
                console.error("Error fetching characters", e)
                this.onError();
            });
    }

    onRequestMoreLoaded = (limit, offset) => {
        offset = this.state.offset + limit;

        this.onNewCharsListLoading();

        this.setState({
            offset,
        })

        this.marvelService.getAllCharacters(limit, offset)
            .then(this.onMoreCharsListLoaded)
            .catch(e => {
                console.error("Error fetching characters", e)
                this.onError();
            });
    }

    onError = () => {
        this.setState({
            isLoading: false,
            error: true,
        })
    }

    componentDidMount() {
        this.onRequest(this.state.limit, this.state.offset);
    }

    render() {
        const { arrayChars, isLoading, offset, limit, isNewLoading, error, isCharListEnded } = this.state;
        const items = arrayChars.map(({ name, thumbnail, id }) => {
            return (
                <li key={id} className="char__item" onClick={() => this.props.onCharSelected(id)}>
                    <img src={thumbnail} alt={name} />
                    <div className="char__name">{name}</div>
                </li>
            )
        });

        const errorMessage = error ? <li><ErrorMessage /></li> : null;
        const spinner = isLoading ? <li><Spinner /></li> : null;
        const content = !(isLoading || error) ? items : null;

        const classNameHideBtn = isCharListEnded ? "button_hidden button_disabled" : "";

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}

                    {/* <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button className={`button button__main button__long ${classNameHideBtn}`} disabled={isNewLoading || isCharListEnded} onClick={() => this.onRequestMoreLoaded(limit, offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;