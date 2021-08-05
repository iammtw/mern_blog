import React, {useState, useEffect} from 'react'
import { Helmet } from "react-helmet"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import { createAction } from '../store/asyncMethods/PostMethod';
import { useSelector, useDispatch } from 'react-redux';

const Create = (props) => {
    const { createErrors, redirect } = useSelector(state => state.PostReducer)
    const [currentImage, setCurrentImage] = useState('Choose Image')
    const [imagePreview, setimagePreview] = useState('')
    const [value, setValue] = useState('');
    const [slug, setslug] = useState('')

    const dispatch = useDispatch()
    const {user : { _id, name }} = useSelector(state => state.AuthReducer)

    const [slugButton, setslugButton] = useState(false)
    const [state, setState] = useState({
        title: '',
        description: '',
        image:''
    })

    const fileHandle =(e) => {
        if(e.target.files.length !== 0){
            const name = e.target.files[0].name;
            setCurrentImage(name);
            setState({
                ...state,
                [e.target.name]:  e.target.files[0]
            })

            const reader = new FileReader();
            reader.onloadend = () => {
                setimagePreview(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const slugHandle =(e) => {
        setslug(e.target.value)
        setslugButton(true)
    }

    const handleInput =(e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

        const createSlug = e.target.value.trim().split(' ').join('-');
        setslug(createSlug);
    }

    const handleDescription =(e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleURL =(e) => {
        e.preventDefault()
        setslug(slug.trim().split(' ').join('-'));
    }

    const createPost =(e) => {
        e.preventDefault()
        const {title, description, image} = state;
        const formData = new FormData();
        formData.append('title', title)
        formData.append('body', value)
        formData.append('image', image)
        formData.append('description', description)
        formData.append('slug', slug)
        formData.append('name', name)
        formData.append('id', _id)
        dispatch(createAction(formData))        
    }

    useEffect(()=> {

        if(redirect){
            props.history.push('/dashboard');
        }

        if(createErrors.length > 0){
            createErrors.map(error=> {
                return toast.error(error.msg)
            })
        }
    },[createErrors, redirect])


    return (
        <div className='create mt-100'>
            <Helmet>
                <title> Create New Post | Blog </title>
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
            <Toaster  
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px'
                    },
                    }}
            />
            <div className="container">
            <form onSubmit={createPost}>
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-6 p-15">
                        <div className="card">
                            <h3 className='card__h3'> Create a new Post </h3>
                            <div className="group">
                                <label htmlFor="title">Post Title</label>
                                <input type="text" name='title' id='title' value={state.title} onChange={handleInput} className='group__control' />
                            </div>
                            <div className="group">
                                <label htmlFor="image" className='image__label'>{currentImage}</label>
                                <input type="file" name='image' onChange={fileHandle} id='image' className='group__control' />
                            </div>
                            <div className="group">
                                <label htmlFor="description">Description</label>
                                <ReactQuill placeholder='Enter Description' theme="snow" id='description' value={value} onChange={setValue}/>
                            </div>
                            <div className="group">
                                <label htmlFor="description">Meta Description</label>
                                <textarea 
                                    name="description" 
                                    defaultValue={state.description} 
                                    onChange={handleDescription}
                                    className='group__control' 
                                    placeholder='Enter Meta Description' 
                                    maxLength='150' id="description" cols="30" rows="10"> 
                                </textarea>
                                <p className='length'>
                                {state.description ? state.description.length : 0} /150
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 p-15">
                        <div className="card">
                            <div className="group">
                                <label htmlFor="slug">Post URL</label>
                                <input type="text" name='slug' id='slug' onChange={slugHandle} value={slug} className='group__control' />
                            </div>
                            <div className="group">
                                {slugButton ? <button className='btn btn-default btn-success' onClick={handleURL}>Update Slug</button> : ''}
                            </div>
                            <div className="group">
                                <div className="imagePreview">
                                    { imagePreview ? <img src={imagePreview} alt={imagePreview} />: '' }
                                </div>
                            </div>
                            <div className="group">
                                <input type="submit" value="Create Post" className='btn btn-block btn-default btn-success' />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Create
