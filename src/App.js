import React, { Component } from 'react';
import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '',
      useDegrees: true,
      history: [],
      showHistory: false,
    };
  }

  copyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  toggleHistory = () => {
    this.setState((prevState) => ({ showHistory: !prevState.showHistory }));
  };

  handleButtonClick = (value) => {
    let { displayValue, useDegrees, history } = this.state;

    if (value === 'C') {
      displayValue = ''; // Clear the display
    } else if (value === '=') {
      try {
        let originalExpression = displayValue; // Save the original expression
        // Check for expressions like '7*sin90' and evaluate them separately
      if (displayValue.match(/[+\-*/]/)) {
        const result = eval(displayValue);
        if (!isNaN(result)) {
          if (result > 2147483647888 || result < -2147483648888) {
            displayValue = 'Overflow';
          } else {
            displayValue = result.toString();
          }
        } else {
          displayValue = 'Error';
        }
        history.push(`${originalExpression} = ${result}`); // Use the original expression
      } else if (displayValue.includes('sin')) {
          // Sine
          const inputValue = useDegrees
            ? (parseFloat(displayValue.replace('sin', '')) * Math.PI) / 180
            : parseFloat(displayValue.replace('sin', ''));
          const result = Math.sin(inputValue);
          if (!isNaN(result)) {
            displayValue = result.toString();
            history.push(`${originalExpression} = ${result}`); // Use the original expression
          } else {
            displayValue = 'Error';
          }
        } else if (displayValue.includes('cos')) {
          // Cosine
          const inputValue = useDegrees
            ? (parseFloat(displayValue.replace('cos', '')) * Math.PI) / 180
            : parseFloat(displayValue.replace('cos', ''));
          const result = Math.cos(inputValue);
          if (!isNaN(result)) {
            displayValue = result.toString();
            history.push(`${originalExpression} = ${result}`); // Use the original expression
          } else {
            displayValue = 'Error';
          }
        } else if (displayValue.includes('tan')) {
          // Tangent
          const inputValue = useDegrees
            ? (parseFloat(displayValue.replace('tan', '')) * Math.PI) / 180
            : parseFloat(displayValue.replace('tan', ''));
          if (inputValue % (Math.PI / 2) === 0) {
            // Handle "tan 90" as "undefined"
            displayValue = 'undefined';
            history.push(`${originalExpression} is undefined`); // Use the original expression
          } else {
            const result = Math.tan(inputValue);
            if (!isNaN(result)) {
              displayValue = result.toString();
              history.push(`${originalExpression} = ${result}`); // Use the original expression
            } else {
              displayValue = 'Error';
            }
          }
        } else if (displayValue.includes('log')) {
          // Logarithm
          displayValue = Math.log10(parseFloat(displayValue.replace('log', ''))).toString();
          history.push(`${originalExpression} = ${displayValue}`); // Use the original expression
        } 
        else {
          // Handle other basic arithmetic operations here
          const result = eval(displayValue);
          if (!isNaN(result)) {
            displayValue = result.toString();
            history.push(`${originalExpression} = ${result}`); // Use the original expression
          } else {
            displayValue = 'Error';
          }
        }
      } catch (error) {
        displayValue = 'Error';
      }
    } else if (value === 'log') {
      // Logarithm
      displayValue += 'log';
    } else if (value === 'sin') {
      // Sine
      displayValue += 'sin';
    } else if (value === 'cos') {
      // Cosine
      displayValue += 'cos';
    } else if (value === 'tan') {
      // Tangent
      displayValue += 'tan';
    }
     else if (value === 'deg') {
      // Toggle between degrees and radians
      useDegrees = !useDegrees;
    } else if (value === 'H') {
      // Show history and copy to clipboard
      const historyText = history.join('\n');
      this.copyToClipboard(historyText);
      alert('History copied to clipboard:\n\n' + historyText);
    } else {
      displayValue += value; // Append the button value to the display
    }

    this.setState({ displayValue, useDegrees });
  };

  render() {
    const { displayValue, showHistory, history } = this.state;

    return (
      <div className='cal'>
        <h1>Calziii</h1>
      <div className="calculator">
        <div className="display">
          <span>{displayValue}</span>
        </div>
        <div className="buttons">
          <button onClick={() => this.handleButtonClick('C')}>C</button>
          <button onClick={() => this.handleButtonClick('log')}>log</button>
          <button onClick={() => this.handleButtonClick('sin')}>sin</button>
          <button onClick={() => this.handleButtonClick('cos')}>cos</button>
          <button onClick={() => this.handleButtonClick('tan')}>tan</button>
          <button onClick={() => this.handleButtonClick('7')}>7</button>
          <button onClick={() => this.handleButtonClick('8')}>8</button>
          <button onClick={() => this.handleButtonClick('9')}>9</button>
          <button onClick={() => this.handleButtonClick('*')}>*</button>
          <button onClick={() => this.handleButtonClick('4')}>4</button>
          <button onClick={() => this.handleButtonClick('5')}>5</button>
          <button onClick={() => this.handleButtonClick('6')}>6</button>
          <button onClick={() => this.handleButtonClick('-')}>-</button>
          <button onClick={() => this.handleButtonClick('1')}>1</button>
          <button onClick={() => this.handleButtonClick('2')}>2</button>
          <button onClick={() => this.handleButtonClick('3')}>3</button>
          <button onClick={() => this.handleButtonClick('+')}>+</button>
          <button onClick={() => this.handleButtonClick('.')}>.</button>
          <button onClick={() => this.handleButtonClick('0')}>0</button>
          <button onClick={() => this.handleButtonClick('=')}>=</button>
          <button onClick={() => this.handleButtonClick('/')}>/</button>
          <button onClick={this.toggleHistory}>H</button>
        </div>
        {showHistory && (
          <div className="history">
            <h2>History</h2>
            <textarea readOnly rows="" value={history.join('\n')} />
          </div>
        )}
      </div>
      </div>
    );
  }
}

export default App;

