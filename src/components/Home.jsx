import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react';
import './Styles/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';

const Home = () => {
  return (
    <div className='home-comp'>
      <CCarousel controls dark interval={2000}>
        <CCarouselItem>
          <CImage className="d-block w-100 carousel" src="https://mobirise.com/extensions/commercem4/assets/images/gallery07.jpg" alt="slide 1" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100 carousel" src="https://mobirise.com/extensions/commercem4/assets/images/gallery02.jpg" alt="slide 2" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100 carousel" src="https://mobirise.com/extensions/commercem4/assets/images/gallery06.jpg" alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </div>
  );
};

export default Home;
