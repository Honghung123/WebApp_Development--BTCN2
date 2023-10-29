import vCarousel from "./Carousel.js";
import vSlideShowMostPop from "./SlideShowMostPop.js";
import vSlideShowTop from "./SlideShowTop.js";
export default {
  components: {
    vCarousel,
    vSlideShowMostPop,
    vSlideShowTop,
  },
  template: `
            <vCarousel />
            <vSlideShowMostPop />
            <vSlideShowTop /> 
    `,
};
