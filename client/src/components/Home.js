import { Helmet } from "react-helmet"

const Home = () => {
    return (
        <>
            <Helmet>
                <title> Web Articles </title>
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
           <center> <h1 style={{ marginTop: '100px'}}> Home </h1></center>
        </>
    )
}

export default Home
