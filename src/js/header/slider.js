import image1 from '../../img/header/header-pic/1.webp'
import image2 from '../../img/header/header-pic/2.webp'
import image3 from '../../img/header/header-pic/3.webp'
import image4 from '../../img/header/header-pic/4.webp'
import image5 from '../../img/header/header-pic/5.webp'
import image6 from '../../img/header/header-pic/6.webp'
import image7 from '../../img/header/header-pic/7.webp'
import image8 from '../../img/header/header-pic/8.webp'
import image9 from '../../img/header/header-pic/9.webp'
const imageArr = [image1,image2,image3,image4,image5,image6,image7,image8,image9]
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(()=>{
    import('../../css/styles.css').then(() => {
      const slider = document.querySelector('.slider');
      const slides = document.querySelectorAll('.slide');
      const lazyImages = document.querySelectorAll('.lazy-image');
      const indicatorsContainer = document.querySelector('.slider-indicators');
      
      let currentIndex = 0;
      let slideWidth = 100;
      const lazyLoad = () => {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const image = entry.target;
    
              // Görselin src'yi data-src'den al
              image.src = imageArr[Number(image.dataset.src)-1];
    
              // Lazy yükleme sınıfını kaldır
              image.classList.remove('lazy-image');
    
              // Observer'ı kaldır
              observer.unobserve(image);
            }
          });
        }, {
          threshold: 0.1 // Görselin %10'u ekranda göründüğünde yükleme başlaması için
        });
        lazyImages.forEach(image => observer.observe(image));
      };
    
      lazyLoad();
    
      slides.forEach((_, index) => {
          const indicator = document.createElement('div');
          indicator.classList.add('indicator');
          indicator.addEventListener('click', () => goToSlide(index));
          indicatorsContainer.appendChild(indicator);
      });
    
      const indicators = document.querySelectorAll('.indicator');
    
      function updateSlider() {
          slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
          updateIndicators();
      }
    
      function updateIndicators() {
          indicators.forEach((indicator, index) => {
              if (index === currentIndex) {
                  indicator.classList.add('active');
              } else {
                  indicator.classList.remove('active');
              }
          });
      }
    
      function goToSlide(index) {
          currentIndex = index;
          updateSlider();
      }
    
      function updateSlideWidth() {
          const sliderContainerWidth = slider.offsetWidth;
    
          if (window.innerWidth >= 1280) {
              slideWidth = (602 / sliderContainerWidth) * 100;  
          } 
          else if (window.innerWidth >= 768 && window.innerWidth < 945) {
              slideWidth = (sliderContainerWidth / 1) / sliderContainerWidth * 100;
          } 
          else {
              slideWidth = 100;
          }
          updateSlider();
      }
    
      updateSlideWidth();
      updateSlider();
    
      window.addEventListener('resize', updateSlideWidth);
    
      setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlider();
      }, 5000);
      }).catch((err) => {
        console.error('CSS yüklenirken bir hata oluştu:', err);
      });
  },100)
  
});

