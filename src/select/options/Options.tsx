import * as React from 'react';
import { Pill } from './Pill';
import { compose, branch, renderNothing, withProps, pure } from 'recompose';
import { Option } from './Option';
import { SFC } from 'react';
import { isEmpty } from 'lodash';
const injectSheet = require('react-jss').default;

const defaultOptionStyles = {
    container: {
        position: 'fixed',
        'margin-top': 5,
        'box-shadow': '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
        'z-index': 1,
        overflow: 'auto',
        height: 200,
    }
};

interface OptionsProps {
    classes?: any;
    options: Option[];
    visible: boolean;
    onOptionSelected: any;
}

interface OptionPillTransformProps {
    pills: any[];
}

const OptionsSFC: SFC<OptionsProps & OptionPillTransformProps> = ({
    classes, pills
}) => {
    return (<div className={classes.container}>{pills}</div>);
};

const mapOptions = withProps(({options, onOptionSelected}: OptionsProps) => {
    return { 
        pills: options.map( (o: any, i: number) => {
            return <Pill key={i} option={o} onPillClick={onOptionSelected}/>;
        })
    }; 
});

const isVisible = ({visible, options}: OptionsProps) => visible && !isEmpty(options);
let EnhancedOptions = compose<OptionsProps, OptionsProps>(
    injectSheet(defaultOptionStyles),
    mapOptions,
    pure,
);
EnhancedOptions = branch<OptionsProps>(isVisible, EnhancedOptions, renderNothing);

export const Options = EnhancedOptions(OptionsSFC);