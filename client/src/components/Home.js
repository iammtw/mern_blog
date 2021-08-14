import { Helmet } from "react-helmet"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { homePosts } from "../store/asyncMethods/PostMethod";
import { useParams } from 'react-router-dom';
import moment from 'moment'
import Loader from "./Loader";
import { Link } from 'react-router-dom';
import Pagination from "./Pagination";


const Home = () => {
    const { loading } = useSelector(state => state.PostReducer)
    const {posts, count, perPage } = useSelector(state => state.FetchPosts)
    let {page} = useParams();
    if(page === undefined){
        page = 1;
    }
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(homePosts(page))
    }, [page])
   
    return (
        <>
            <Helmet>
                <title> Web Articles </title>
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
            <div className="container">
                <div className="row mt-100" style={{ marginBottom: '30px' }}>
                    <div className="col-9 home">
                        { !loading ? posts.length > 0 ? posts.map(post => (
                            <div className="row post-style">
                                <div className="col-8">
                                    <div className="post">
                                        <div className="post__header">
                                            <div className="post__header__avatar">
                                                {post.userName[0]}
                                            </div>
                                            <div className="post__header__user">
                                                <span>{post.userName}</span>
                                                <span>{moment(post.updatedAt).format('MMM Do YYYY')}</span>
                                            </div>
                                        </div>
                                        <div className="post__body">
                                            <h1 className="post__body__title">
                                                <Link>{post.title}</Link>
                                            </h1>
                                            <div className="post__body__details">
                                            {(post.body.slice(0,300))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                  <div className="post__image">
                                        <img src={`/images/${post.image}`} alt={post.image} />
                                  </div>
                                </div>
                            </div>
                        )) : 'No Posts yet!' : <Loader /> }
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                     
                    <Pagination path="home" count={count} perPage={perPage} page={page}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
