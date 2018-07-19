import * as React from 'react';
import { SFC } from 'react';
import { Option } from './options/Option';
import { compose, pure, withHandlers } from 'recompose';
const injectSheet = require('react-jss').default;

interface SpecialInputProps {
    currentInput?: string;
    option: Option;
    placeholder?: string;
    onInputClick: (event: any) => void;
    onControlClick?: (event: any) => void;
    onInputChange?: (event:any) => void;
    onInnerInputChange?: (event: any) => void;
}

interface PrivateProps { 
    classes: any;
    registerChild?: any;
}

const SpecialInputStyles = {
    container: {
        'padding-left': 16,
        '& span': {
            'padding-right': 4
        },
        '& input': {
            width: 50
        }
    }
};

// This Component controls showing a span that is the tag.
// In the future, this could conditionally render a Custom Component or this span default.
const s: SFC<SpecialInputProps & PrivateProps> = ({
    classes, option, currentInput, placeholder,
     onControlClick, onInnerInputChange, registerChild
}) => {
    return (
        <div className={classes.container} onClick={onControlClick}>
            {option && <span>{option.label}</span>}
            <input ref={registerChild} placeholder={option ? '' : placeholder} value={currentInput} onChange={onInnerInputChange}/>
        </div>
    );
};


export const SpecialInput = compose<SpecialInputProps, SpecialInputProps>(
    withHandlers(() => {
        let ref: any = null;
        return {
            registerChild: () => (r: any) => ref = r,
            onControlClick: ({onInputClick}: any) => (e: any) => {
                // The ref refers to the Input (check input ref in render function)
                // Gives focus to THAT input when clicks occur within the div.
                ref.focus();
                // OnInputClick comes from the user.
                // The user might want to do something onClick for the Input.
                if (onInputClick) {onInputClick(e)};
            },
            onInnerInputChange: ({onInputChange}: any) => (e: any) => {
                // OnInputClick comes from the user.
                // The user might want to do something onClick for the Input.
                if (onInputChange) {onInputChange(e)};
            }
        }
    }),
    injectSheet(SpecialInputStyles),
    pure 
)(s);