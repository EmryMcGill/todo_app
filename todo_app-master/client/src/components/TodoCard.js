import React from 'react'


const TodoCard = ({refresh, todo}) => {

    const checkboxHandler = (e) => {
        e.preventDefault();
        // delete the todo from the list
        fetch("/todoAPI", {
            method: "DELETE",
            headers: {"Content-Type": "application/JSON"},
            body: JSON.stringify({'id': todo.id}) 
        }).then(() => {
            refresh()
        })
    }

    return (
        <div className='todocard-container'>
            <div className='check-box' onClick={checkboxHandler} />
            <p>{todo.title}</p>
        </div>
    );
}

export default TodoCard;