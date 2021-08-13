import { Helmet } from "react-helmet"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { homePosts } from "../store/asyncMethods/PostMethod";
import { useParams } from 'react-router-dom';

const Home = () => {

    const { loading } = useSelector(state => state.PostReducer)
    const {posts, count, perPage } = useSelector(state => state.FetchPosts)
    let {page} = useParams();
    if(page === undefined){
        page = 1;
    }
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(homePosts())
    }, [])
    console.log('page: ',page);
    console.log('posts: ',posts);
    console.log('count: ',count);
    console.log('perPage: ',perPage);


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
