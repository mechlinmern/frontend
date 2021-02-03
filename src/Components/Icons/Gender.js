import React from 'react';
import { Icon } from 'semantic-ui-react';

const Gender = (props) => {
    if(props.gender === 'Male') {
        return <Icon name='male' />
    }
    else {
        return <Icon name='female' />
    }
}

export default Gender;