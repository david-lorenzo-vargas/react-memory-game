import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import images from './memory-game.mock';
import Button from '../button';
import styles from './memory-game.scss';

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allImages: [],
      currentCard: '',
      currentId: 0,
      previousId: 0,
      previousCard: '',
      cardsFliped: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    const { allImages } = this.state;
    const arrayOfImages = images;
    const shuffledArray = this.shuffleCards(arrayOfImages);
    const newArr = [...allImages, ...shuffledArray];

    this.setState({
      allImages: newArr,
    });
  }

  shuffleCards(images) {
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
  }

  areBothCardsFliped(name) {
    const { cardsFliped } = this.state;
    const bothCardsFliped = cardsFliped.includes(name);

    return bothCardsFliped;
  }

  handleClick(name, id) {
    const {
      currentCard,
      previousCard,
      currentId,
      cardsFliped,
    } = this.state;

    let newState;

    if (currentCard === '') {
      newState = {
        currentCard: name,
        currentId: id,
      };
    }

    if (currentCard !== '' && currentCard !== previousCard) {
      newState = {
        currentCard: name,
        currentId: id,
        previousId: currentId,
        previousCard: currentCard,
      };
    }

    if (currentCard !== '' && currentCard === previousCard) {
      newState = {
        currentCard: name,
        currentId: id,
        previousId: currentId,
        previousCard: currentCard,
        cardsFliped: [...cardsFliped, currentCard],
      };
    }

    if (currentCard !== '' && previousCard !== '' && currentCard !== previousCard) {
      newState = {
        currentCard: name,
        currentId: id,
        previousId: 0,
        previousCard: '',
      };
    }

    this.setState(newState);
  }

  handleButtonClick() {
    this.setState({
      currentCard: '',
      previousCard: '',
      currentId: 0,
      previousId: 0,
      cardsFliped: [],
    });
  }

  render() {
    console.log(this.state);
    console.log(this.shuffleCards())

    const { currentId, previousId, allImages } = this.state;
    // const randomNumber = Math.floor(Math.random() * 20) + 1;

    return (
      <div className={styles['memory-game']}>
        <Row>
          {allImages.map((item) => (
            <>
              <Column>
                <div className={styles['memory-game__item']}>
                  <Card
                    image={(currentId === item.id)
                      || (previousId === item.id)
                      || this.areBothCardsFliped(item.name) ?
                      item.url : ''}
                    name={item.name}
                    id={item.id}
                    onClick={this.handleClick}
                  />
                </div>
              </Column>
              {/* <Column>
                <div className={styles['memory-game__item']}>
                  <Card
                    image={(currentId === item.id + images.length)
                      || (previousId === item.id + images.length)
                      || this.areBothCardsFliped(item.name) ?
                      item.url : ''}
                    name={item.name}
                    id={item.id + images.length}
                    onClick={this.handleClick}
                  />
                </div>
              </Column> */}
            </>
          ))}
        </Row>
        <Row>
          <Button
            text="play again"
            theme="blue"
            size="medium"
            onClick={this.handleButtonClick}
          />
        </Row>
      </div>
    );
  }
}

export default MemoryGame;
