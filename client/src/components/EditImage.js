import React, {useState, useEffect} from 'react'
import { Helmet } from "react-helmet"
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateImageAction } from './../store/asyncMethods/PostMethod';
import toast, { Toaster } from 'react-hot-toast';
import { RESET_IMAGE_ERRORS } from '../store/types/PostTypes';

const EditImage = () => {
    const [currentImage, setCurrentImage] = useState('Choose Image')
    const [imagePreview, setimagePreview] = useState('')
    const [image, setImage] = useState('')
    const {id} = useParams();
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {updateImageErrors} = useSelector(state => state.UpdateImage)
    const {redirect}  = useSelector(state => state.PostReducer)

    const fileHandle =(e) => {
        if(e.target.files.length !== 0){
            const name = e.target.files[0].name;
            setCurrentImage(name);
            setImage(e.target.files[0])

            const reader = new FileReader();
            reader.onloadend = () => {
                setimagePreview(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const updateImage = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image)
        formData.append('id', id)
        dispatch(updateImageAction(formData))
    }

    useEffect(()=> {
        if(updateImageErrors.length > 0){
            updateImageErrors.map(error=> toast.error(error.msg))
            // dispatch({ type: RESET_IMAGE_ERRORS })
        }
    },[updateImageErrors])

    useEffect(()=>{
        if(redirect){
            push('/dashboard');
        }
    },[redirect])


    return (
        <div className="container mt-100">
             <Helmet>
                <title> Update Post Image | Blog </title>
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
            <Toaster  
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                       
                    },
                }}
            />
            <div className="row">
                <div className="col-6">
                    <div className="card">
                    <h3 className='card__h3'> Update Post Image </h3>
                        <form onSubmit={updateImage}>
                            <div className="group">
                                <label htmlFor="image" className='image__label'>{currentImage}</label>
                                <input type="file" name='image' onChange={fileHandle} id='image' className='group__control' />
                            </div>
                            <div className="group">
                                <div className="imagePreview">
                                    { imagePreview ? <img src={imagePreview} alt={imagePreview} />: '' }
                                </div>
                            </div>
                            
                            <div className="group">
                                <input type="submit" value="Update Post" className='btn btn-block btn-default btn-success' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditImage
