import React, {useState} from 'react'
import { Helmet } from "react-helmet"
import { useParams } from 'react-router-dom';

const EditImage = () => {
    const [currentImage, setCurrentImage] = useState('Choose Image')
    const [imagePreview, setimagePreview] = useState('')
    const [name, setName] = useState('')
    const {id} = useParams();

    const fileHandle =(e) => {
        if(e.target.files.length !== 0){
            const name = e.target.files[0].name;
            setCurrentImage(name);
            setName(e.target.files[0])

            const reader = new FileReader();
            reader.onloadend = () => {
                setimagePreview(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const updateImage = (e)=>{
        e.preventDefault();
    }


    return (
        <div className="container mt-100">
             <Helmet>
                <title> Update Post Image | Blog </title>
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
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
