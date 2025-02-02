import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import FileConverter from './pages/FileConverter';
import ImageCompressor from './pages/ImageCompressor';
import ImageCropper from './pages/ImageCropper';
import ImageConverter from './pages/ImageConverter';
import ImageWatermark from './pages/ImageWatermark';

const MainContent = styled.main`
  min-height: calc(100vh - 64px - 70px);
`;

function App() {
  return (
    <Router>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/file-converter" element={<FileConverter />} />
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/image-cropper" element={<ImageCropper />} />
          <Route path="/image-converter" element={<ImageConverter />} />
          <Route path="/image-watermark" element={<ImageWatermark />} />
          {/* Other routes will be added later */}
        </Routes>
      </MainContent>
      <Footer />
    </Router>
  );
}

export default App;
