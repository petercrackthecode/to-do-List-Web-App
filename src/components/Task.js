import React from "react";

import ListGroup from 'react-bootstrap/ListGroup';

export function Task(props) {
    return (
        <ListGroup.Item as='li' className={`task-${props.task}`} bsPrefix='media-body'>
                {props.task}
        </ListGroup.Item>
    );
}