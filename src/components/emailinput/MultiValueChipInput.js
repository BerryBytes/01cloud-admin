import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import './emailinput.css';
import { withTranslation } from 'react-i18next';

const useStyles = () => ({
    tagItem: {
        backgroundColor: '#d4d5d6',
        
        fontSize: '14px',
        borderRadius: '30px',
        height: '30px',
        padding: '0 4px 0 1rem',
        display: 'inline-flex',
        alignItems: 'center',
        margin: '0 0.3rem 0.3rem 0'
    },
    button: {
        backgroundColor: 'white',
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        font: 'inherit',
        marginLeft: '10px',
        fontWeight: 'bold',
        padding: '0',
        lineHeight: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

export class MultiValueChipInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: null
        }
        this.inputRef = React.createRef();
    }

  handleKeyDown = evt => {
    if ([ 'Enter', 'Tab', ',' ].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        const newValues = [ ...this.props.values, value ];
        this.setState({
          value: ''
        });
        this.props.handleValues(newValues)
      }
    }
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = item => {
      const newValues = this.props.values.filter(i => i !== item)
      this.props.handleValues(newValues);
  };

  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData('text');
    var labels = paste.split(',');
    if (labels) {
      var toBeAdded = labels.map(Function.prototype.call, String.prototype.trim).filter(x => !this.isInList(x));

      const newValues =  [ ...this.props.values, ...toBeAdded ];
      this.props.handleValues(newValues);
    }
  };

  isValid = (val) => {
    let error = null;

    if (this.isInList(val)) {
      error = `${ val } has already been added.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList = (val) => {
    return this.props.values.includes(val);
  }

  render() {
    const { classes, t } = this.props;
    return (
        <div className="react-multi-email"
          onClick={ () => {
          if (this.inputRef.current) {
            this.inputRef.current.focus();
          }
        } }
          data-test="main-container"
        >
            {this.props.values.map(item => (
                <div className={ classes.tagItem } key={ item } data-test="tags-div">
                    {item}
                    <button
                      type="button"
                      className={ classes.button }
                      onClick={ () => this.handleDelete(item) }
                      disabled={ this.props.disabled }
                    >
                        &times;
                    </button>
                </div>
        ))}
            {!this.props.disabled &&
            <input
            
              ref={ this.inputRef }
              value={ this.state.value }
              placeholder={t('MultiValueChipPlaceholder')}
              onKeyDown={ this.handleKeyDown }
              onChange={ this.handleChange }
              onPaste={ this.handlePaste }
              disabled={ this.props.disabled }
              data-test="tags-input"
            />
        }

            {this.state.error && <p className="error">{this.state.error}</p>}
        </div>
    );
  }
}

export default withStyles(useStyles)(withTranslation()(MultiValueChipInput));