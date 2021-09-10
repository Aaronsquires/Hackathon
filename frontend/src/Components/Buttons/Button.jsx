import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Button} from 'react-bootstrap';
import './buttonStyles.css';

const useStyles = makeStyles({
    button:{


    }
});

export default function BSTButton(props) {
    const classes = useStyles();

    const [title] = useState(props.title);
    const [path] = useState(props.path);
    const [icon] = useState(props.icon);

    if (icon != null) {
        return (
            <Button bsPrefix="custom-std-btn" href={path} >
                <div className="std-btn-item1">
                    {icon}
                </div>
                <div className="std-btn-item2">
                    {title}
                </div>
            </Button>
        );
    } else {
        return (
            <Button bsPrefix="custom-std-btn" href={path} >{title}</Button>
        );
    }
};

