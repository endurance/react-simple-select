import * as React from 'react';
import { compose, pure, defaultProps, withState, setDisplayName, withHandlers } from 'recompose';
import { Options } from './options/Options';
import { SFC } from 'react';
import { Option } from './options/Option';
import { withOutsideClickDetection } from '../shared/WithOutsideClickDetection';
import { SpecialInput } from './SpecialInput';
import { blue } from '../Style';
const injectSheet = require('react-jss').default;

export const defaultSelectStyles = {
    container: {
        outline: 'none',
        'border-bottom': (props: any) => props.isOpen ? `solid 2px ${blue}` : `solid 2px grey`,
        width: 200,
        'padding-top': 2,
        '& input': {
            'border-style': 'none',
            '&:focus': {
                outline: 'none'
            },
            '&::placeholder': {
                'font-family': 'NimbusSanL-Reg',
                'font-size': 16,
                'font-weight': 'normal',
                'font-style': 'normal',
                'font-stretch': 'normal',
                'letter-spacing': -0.2,
                'text-align': 'left',
                'line-height': 'normal',
                opacity: 0.5,
            },
        },
    },
};

interface SimpleSelectProps {
    classes?: any;
    placeholder?: string;
    closeOnSelect?: boolean;
    clearInputOnSelect?: boolean;
    options: Option[];
    onSelect: any;
}

interface PrivateProps {
    isOpen: boolean;
    onOptionSelected?: any;
    handleSelectControlClick?: any;
    setOpenFlag: any;
    selectedOption: Option;
    currentInput: string;
    onInputChange: any;
}

const SimpleSelectBaseComponent: SFC<SimpleSelectProps & PrivateProps> = ({
    classes, isOpen, options, placeholder, selectedOption, currentInput,
     onOptionSelected, handleSelectControlClick, onInputChange
}) => {
    return (
        <div className={classes.container} tabIndex={-1}>
            <SpecialInput 
                placeholder={placeholder}
                option={selectedOption}
                currentInput={currentInput}
                onInputClick={handleSelectControlClick}
                onInputChange={onInputChange}
            />
            <Options 
                visible={isOpen} 
                options={options}
                onOptionSelected={onOptionSelected}
            />
        </div>
    );
};

// Like Component.defaultProps = {};
const defaults = defaultProps({placeholder: 'Select...', closeOnSelect: true, clearInputOnSelect: true});
// Adds state and stateUpdater function to the component.
// Also turns the component into a class component
const openState = withState('isOpen', 'setOpenFlag', false);
const selectedOptionState = withState('selectedOption', 'setOption', null);
const inputValueState = withState('currentInput', 'setCurrentInput', '');
// Adds handlers that knows the props of the base component.
const handlers = withHandlers({
    handleSelectControlClick: (props: any) => () => {
        props.setOpenFlag(true);
    },
    onOptionSelected: (props: any) => (option: Option) => {
        props.setOption(option);
        props.onSelect(option);
        if (props.closeOnSelect) { props.setOpenFlag(!props.isOpen); } 
        if (props.clearInputOnSelect) { props.setCurrentInput(''); }
    },
    onOutsideClick: (props: any) => () => {
        props.setOpenFlag(false);
    },
    onInputChange: (props: any) => (e: any) => {
        props.setCurrentInput(e.target.value);
    }
});
// Compose order matters. Turns hoc1(hoc2(hoc3(BaseComponent))) -> compose (hoc1, hoc2, hoc2)(BaseComponent)
// The Input/Output props tells other components what the final composed component expects as properties.
const SimpleSelect = compose<SimpleSelectProps, SimpleSelectProps>(
  setDisplayName('SimpleSelect'),
  defaults,
  openState,
  selectedOptionState,
  inputValueState,
  handlers,
  withOutsideClickDetection,
  injectSheet(defaultSelectStyles),
  pure)(SimpleSelectBaseComponent);

export {SimpleSelect};