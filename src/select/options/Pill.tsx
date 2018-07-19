import * as React from 'react';
import { SFC } from 'react';
import { compose, pure, withHandlers } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Option } from './Option';
const injectSheet = require('react-jss').default;

const defaultPillStyle = {
    container: {
        display: 'flex',
        'flex-flow': 'row wrap',
        'justify-content': 'flex-start',
        'align-content': 'center',
        'align-items': 'center',
        'padding-left': 10,
        height: 50,
        width: 200,
    },
    'icon': {
        'margin-right': 8
    },
    'spanLabel': {
        width: 80
    }
    
};

interface PillProps {
    classes?: any;
    option: Option;
    onPillClick: any;
}

interface PrivateProps {
    handlePillClick: any;
}

const pill: SFC<PillProps & PrivateProps> = ({
    classes, option, handlePillClick
}) => {
    return (
        <div className={classes.container} onClick={handlePillClick}>
            <span className={classes.icon}><FontAwesomeIcon icon={faCoffee} /></span>
            <span className={classes.spanLabel}>{option.label}</span>
        </div>
    );
};
const handlers = withHandlers({
    handlePillClick: (props: any) => (e: any) => {
        props.onPillClick(props.option);
    }
});

export const Pill = compose<PillProps, PillProps>(handlers, injectSheet(defaultPillStyle), pure)(pill);