import { useState } from 'react';

const PictureCard = (props) => {
    const [imgPreview, setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png');
    const { updateImage, word, audio } = props;
    const updateImageData = (e) => {
        const file = (e.target).files?.[0];
        if (!file) { return; }
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const data = reader.result;
                setImgPreview(data);
                updateImage(data);
                resolve(data);
            }
            reader.onerror = (error) => { reject(error); };
        })
    }
    const playAudio = () => { 
        const audioEle = new Audio(audio); 
        audioEle.play();
    }
    return (
        <div className="card">
            <input id="selecteImage" className="input" type="file" accept=".jpg,.jpeg,.png,.gif" onChange={updateImageData} />
            <label htmlFor="selecteImage" className="upload">
                <img src={imgPreview} alt="preview"/>
            </label>
            <div className="word">{word}</div>
            {audio && (
                <div className="playAudio" onClick={playAudio}>
                    <img width="20px" src="https://res.bearbobo.com/resource/upload/Omq2HFs8/playA-3iob5qyckpa.png" alt="logo" />
                </div>
            )}
        </div>
    )
}

export default PictureCard;