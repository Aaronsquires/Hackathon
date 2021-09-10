import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {DropdownButton, Dropdown} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './buttonStyles.css';



const useStyles = makeStyles({
    button:{


    }
});

export default function DDButton(props) {
    const classes = useStyles();


    const [title] = useState(props.title);
    const [data] = useState(props.data);

    return (
        <DropdownButton title={title} bsPrefix="custom-btn">
            {
                // maps the js data to each item
                data.map(({text, to}) => <Dropdown.Item href={to}>{text}</Dropdown.Item>)
            }
        </DropdownButton>
    );
};

