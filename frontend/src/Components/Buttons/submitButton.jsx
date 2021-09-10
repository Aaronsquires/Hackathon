import Button from '@material-ui/core/Button';
import React, {useState} from 'react';
import './buttonStyles.css';

export default function SubmitButton(props) {
    const [title] = useState(props.title);
    const [onClick] = useState(props.onClick);

    return (
        <Button
            type="submit"
            onClick={onClick}
            className="custom-std-btn"
        >
            {title}
        </Button>
    );


}