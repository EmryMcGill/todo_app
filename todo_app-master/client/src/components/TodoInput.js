import React, { useState } from 'react'
import {useRef} from 'react'

const TodoInput = ({refresh}) => {

    // var for todo title
    const [todotitle, settodotitle] = useState('');
    const [tododes, settododes] = useState('');


    // isnew
    const [isnew, setisnew] = useState(false);

    const [ismore, setismore] = useState(false);

    // var for input element
    const inputEle = useRef(null);

    // func to create todo
    const submitHandler = (e) => {
            e.preventDefault();
            // clear the input
            e.target.reset();
            // focus the input again
            inputEle.current.focus();
            if (todotitle !== '') {
            fetch("/todoAPI", {
                method: "POST",
                headers: {"Content-Type": "application/JSON"},
                body: JSON.stringify({'title': todotitle, 'desc': tododes, 'id': Date.now()}) 
            }).then(() => {
                refresh()
            })
        }
    }

    const moreHandler = () => {
        setismore(!ismore);
    }

    const inputHandler = () => {
        setisnew(!isnew);
    }

    return (
            <div className='input-wrapper'>
                
                {isnew ?
                <form className='input-container' onSubmit={submitHandler}>   
                    <div className='input-areas'>
                        <input type='text' className='title-input' placeholder='title' autoFocus ref={inputEle} onChange={(e) => settodotitle(e.target.value)} />
                    </div>
                    <div>
                        <button className='more-btn' onClick={moreHandler}>More</button>
                        <button className='add-btn' type='submit'>Add</button>
                    </div> 
                </form>
                :
                <button className='new-todo-btn' onClick={inputHandler}>+ Add todo</button>
                }
                 
            </div>
    );
}

export default TodoInput;