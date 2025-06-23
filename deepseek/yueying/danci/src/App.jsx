import { useState } from 'react'
import './App.css'

function App() {
  const updateImageData = () => {

  }

  return (
    <div className='card'>
      <input type="file" id="selectImage" class="input" accept=".jpg,.jpeg,.png,.gif" onChange={updateImageData}/>
      <label htmlFor="selecteImage" class="upload">
        <img src={imgPreview} alt="" />
      </label>
      <div className='word'>{{}}</div>
    </div>
  )
}

export default App
