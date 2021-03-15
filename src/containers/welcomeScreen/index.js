import React from 'react'

export default (props) => {
    return (
        <div>
            <header>
                <h3>Welcome to Chat App</h3>
                <div>
                    <button onClick={() => {
                        props.history.push("signup")
                        console.log(props)
                    }}>
                        Sign Up
                    </button>
                    <button onClick={() => {
                        props.history.push("login")
                    }}>
                        Login
                    </button>
                </div>
            </header>
        </div>
    )
}