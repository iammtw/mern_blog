import React from 'react'
import { Helmet } from "react-helmet"

const NotFound = () => {
    return (
            <>
            <Helmet>
                <title> Not Found | Blog </title>
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
            <div className="notFound">
                <div className="notFound__container">
                    <h1 className="notFound__container__h1">404</h1>
                    <p className="notFound__container__p">Oops! That page could not found</p>
                </div>
            </div>
            </>
    )
}

export default NotFound
