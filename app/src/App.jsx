import './css/global.css';
import './css/page.css';
import './css/module.css';
import logo from './images/LOGO.svg';
import React, { useState, useEffect, useRef } from 'react';
import pizzaCursor from './images/mouse.png';
import banner from './images/banner.png';
import bannerDark from './images/banner_dark.png';
import finestbanner2 from './images/finestbanner2.png';
import pepperoniSlice from './images/pizza1.png'; 
import mushroomSlice from './images/pizza2.png';
import jalapenoSlice from './images/pizza3.png';
import sliderbg from './images/sliderbg.png';
import arrow from './images/arrow.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import slide1 from './images/pizza1.png';
import slide2 from './images/pizza2.png';
import slide3 from './images/pizza3.png';
import menu1 from './images/pizza-01.png';
import menu2 from './images/pizza-02.png';
import menu3 from './images/pizza-03.png';
import menu4 from './images/pizza-04.png';
import menu5 from './images/pizza-05.png';
import size1 from './images/size_01.svg';
import size2 from './images/size_02.svg';
import size3 from './images/size_03.svg';
import shop01 from './images/shop01.png';
import shop02 from './images/shop02.jpg';
import shop03 from './images/shop03.jpg';
import shop04 from './images/shop04.jpg';
import shop05 from './images/shop05.jpg';

const signatureMenus = [
  { id: 1, name: "FLARE PEPPERONI", price: "6,000", desc: "SPICY FLAVORS AND CRISPY\nPEPPERONI IN EACH BITE", img: pepperoniSlice, isBest: true },
  { id: 2, name: "FLARE MUSHROOM", price: "6,000", desc: "EARTHY MUSHROOMS WITH\nA TOUCH OF SPICE", img: mushroomSlice, isBest: true },
  { id: 3, name: "FLARE JALAPENO", price: "6,000", desc: "HOT JALAPENOS FOR A\nTRULY FIERY EXPERIENCE", img: jalapenoSlice, isBest: true }
];

function App(){
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const delayedPos = useRef({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('flare-theme') === 'dark';
  });
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('intro-viewed');
  });
  const [view, setView] = useState(() => {
    return sessionStorage.getItem('current-view') || 'home';
  });
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('flare-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  useEffect(() => {
    sessionStorage.setItem('current-view', view);
  }, [view]);

  useEffect(() => {
    if (sessionStorage.getItem('intro-viewed')) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('intro-viewed', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const updateMouse = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY - 60 };
    };

    const animate = () => {
      const speed = 0.08; 
      delayedPos.current.x += (mousePos.current.x - delayedPos.current.x) * speed;
      delayedPos.current.y += (mousePos.current.y - delayedPos.current.y) * speed;
      
      setPosition({ x: delayedPos.current.x, y: delayedPos.current.y });
      requestAnimationFrame(animate);
    };
    
    window.addEventListener('mousemove', updateMouse);
    const frameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return(
    <>
      <div className={`intro-screen ink-splash-intro ${!isLoading ? 'fade-out' : ''}`}>
        <div className="ink-drop layer-1"></div>
        <div className="ink-drop layer-2"></div>
        <div className="ink-drop layer-3"></div>
        <img src={logo} alt="Flare Logo" className="intro-logo-svg ink-splash-logo" />
      </div>
      <div className="floating-pizza" style={{transform:`translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`}}>
          <img src={pizzaCursor} alt="floating pizza" />
      </div>
      {view === 'menu' ?(
        <MenuPage 
          onBack={() => setView('home')} 
          logo={logo} 
          pizzaImg={slide1} 
          isDarkMode={isDarkMode} 
        />
      ) : (
        <div className={`main-container ${isLoading ? 'hidden' : 'visible'}`}>
          <header className="main-header">
          <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className="desktop-nav">
              <button onClick={() => { scrollToFooter(); setIsMenuOpen(false); }}>SHOP</button>
              <button onClick={() => setView('menu')}>MENU</button>
              <button onClick={() => window.open('https://www.instagram.com', '_blank')}>SNS</button>
            </nav>
            <h1>
              <img src={logo} alt="Flare logo"/>
            </h1>

            <div className="mode-toggle">
              <button type="button" className="btn-light" onClick={() => setIsDarkMode(false)}></button>
              <button type="button" className="btn-dark" onClick={() => setIsDarkMode(true)}></button>
            </div>
          </header>
          
          <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✕</button>
            <nav>
              <button onClick={() => { scrollToFooter(); setIsMenuOpen(false); }}>SHOP</button>
              <button onClick={() => { setView('menu'); setIsMenuOpen(false); }}>MENU</button>
              <button onClick={() => { window.open('https://www.instagram.com', '_blank'); setIsMenuOpen(false); }}>SNS</button>
            </nav>
          </div>

          <div className="red-bar">
            <div className="marquee-wrapper">
              <div className="marquee-content">
                <span>FLARE PIZZA OPEN 11:00 - CLOSE 22:00</span>
                <span>/ Tuesday & Wednesday /</span>
                <span>Address 2-4-8-101 Kotobuki Taito-ku, Seoul 111-0042</span>
                <span>/ Phone 070-2434-1818 /</span>
                <span>FLARE PIZZA OPEN 11:00 - CLOSE 22:00</span>
                <span>/ Tuesday & Wednesday /</span>
                <span>Address 2-4-8-101 Kotobuki Taito-ku, Seoul 111-0042</span>
                <span>/ Phone 070-2434-1818 /</span>
                <span>FLARE PIZZA OPEN 11:00 - CLOSE 22:00</span>
                <span>/ Tuesday & Wednesday /</span>
                <span>Address 2-4-8-101 Kotobuki Taito-ku, Seoul 111-0042</span>
                <span>/ Phone 070-2434-1818 /</span>
              </div>
            </div>
          </div>

          <main>
            <div className="main-area">
              <h1>FLARE:<br/> HOT AND DELICIOUS</h1>
              <div>
                <p className = 'mainLeft'>IN 2022, MAPLE PIZZA STARTED IN DOWNTOWN SEOUL. WE WANT TO CREATE A FAMILY FRIENDLY NEIGHBORHOOD SHOP WITH GREAT PIZZA EXPERIENCES AND LASTING MEMORIES.</p>
                <div>
                  <img 
                    src={isDarkMode ? bannerDark : banner}
                    alt="banner"
                    style={{ transition: 'all 0.3s ease' }} 
                  />
                </div>
                <p className = 'mainRight'>IN 2022, MAPLE PIZZA STARTED IN DOWNTOWN SEOUL. WE WANT TO CREATE A FAMILY FRIENDLY NEIGHBORHOOD SHOP WITH GREAT PIZZA EXPERIENCES AND LASTING MEMORIES.</p>
              </div>
            </div>

            <div className="finest-area">
              <div> 
                <div>
                  <img src={finestbanner2} alt="Slide Pizza"/>
                </div>
                <div>
                  <h2>FINEST<br />QUALITY<br />FLARE<br />PIZZA</h2>
                  <p>IN 2022, FLARE PIZZA STARTED IN DOWNTOWN SEOUL.
                    WE WANT TO CREATE A FAMILY FRIENDLY NEIGHBORHOOD SHOP
                    WITH GREAT PIZZA EXPERIENCES AND LASTING MEMORIES.</p>
                </div>
              </div> 
            </div>

            <div className="signature-area">
              <div className="signature-title">
                <h2>OUR SIGNATURE</h2>
                <p>(3 FIERY FLARES)</p>
                <p className="flare-icon">🔥FLARE</p>
              </div>

              <ul className="menu-container">
                {signatureMenus.map((menu) => (
                  <li key={menu.id}>
                    {menu.isBest && <span className="best-tag">BEST</span>}
                    <div className="pizza-img">
                      <img src={menu.img} alt={menu.name} />
                    </div>
                    <div className="pizza-info">
                      <h3>
                        {menu.name.split('\n').map((line, i) => (
                          <React.Fragment key={i}>{line}<br/></React.Fragment>
                        ))}
                      </h3>
                      <span className="price">₩ {menu.price}</span>
                      <p>
                        {menu.desc.split('\n').map((line, i) => (
                          <React.Fragment key={i}>{line}<br/></React.Fragment>
                        ))}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="today-area">
              <div className="today-title">
                <h2>( TODAY MENU )</h2>
                <button onClick={() => { setView('menu'); setIsMenuOpen(false); }}>VIEW ALL</button>
              </div>

              <div className="marquee-container">
                <div className="marquee-text">
                  <span>CHEESE SLICE / PEPPERONI SLICE / MUSHROOM SLICE / JALAPENO SLICE / </span>
                  <span>CHEESE SLICE / PEPPERONI SLICE / MUSHROOM SLICE / JALAPENO SLICE / </span>
                </div>

                <div className="center-content">
                  <img src={arrow} className="arrow" alt="arrow"/>
                  <div className="slide-box">
                    <img src={sliderbg} alt="pizza placeholder"/>
                    <Swiper
                      modules={[Autoplay, EffectFade]}
                      effect="fade"
                      autoplay={{ delay: 2500, disableOnInteraction: false }} 
                      loop={true}
                      className="mySwiper">
                        {[slide1, slide2, slide3].map((img, index) => (
                          <SwiperSlide key={index}>
                            <img src={img} alt={`pizza-slice-${index}`} className="slice-img" />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer ref={footerRef}>
            <div className="footer-box">
              <div>
                <h3>( SHOP )</h3>
                <ul>
                  <li>
                    <span className='border'>ADDRESS</span>
                    <address>2-4-8-101 Kotobuki Taito-ku, Seoul 111-0042</address>
                  </li>
                  <li>
                    <button className="google-map-btn" onClick={() => window.open('https://www.google.com/maps/search/Flare+Pizza/@35.707198,139.789128,17z', '_blank')}>
                    GOOGLE MAP
                    </button>
                  </li>
                  <li className='marginB'>
                    <span className='border'>PHONE</span>
                    <span className='phone'>070-1234-1234</span>
                  </li>
                  <li className='marginB'>
                    <span className='border'>OPEN</span>
                    <span className='block'>11:30 ~ 19:00</span>
                  </li>
                  <li>
                    <span className='border'>CLOSE</span>
                    <span className='block'>Tuesday & Wednesday</span>
                  </li>
                </ul>
              </div>

              <div className="footer-logo">
                <h2><img src={logo} alt="Flare Logo"/></h2>
                <p>Copyright (C) Flare Pizza. All Rights Reserved.</p>
              </div>

              <div className="footer-slider">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{delay: 0, disableOnInteraction: false}}
                  speed={4000}
                  loop={true}
                  slidesPerView={4.5} 
                  className="footerSwiper">
                  <SwiperSlide className="h-type1"><img src={shop01} alt="shop1"/></SwiperSlide>
                  <SwiperSlide className="h-type2"><img src={shop02} alt="shop2"/></SwiperSlide>
                  <SwiperSlide className="h-type3"><img src={shop03} alt="shop3"/></SwiperSlide>
                  <SwiperSlide className="h-type1"><img src={shop04} alt="shop4"/></SwiperSlide>
                  <SwiperSlide className="h-type2"><img src={shop05} alt="shop5"/></SwiperSlide>
                  <SwiperSlide className="h-type1"><img src={shop01} alt="shop1"/></SwiperSlide>
                  <SwiperSlide className="h-type2"><img src={shop02} alt="shop2"/></SwiperSlide>
                  <SwiperSlide className="h-type3"><img src={shop03} alt="shop3"/></SwiperSlide>
                  <SwiperSlide className="h-type1"><img src={shop04} alt="shop4"/></SwiperSlide>
                  <SwiperSlide className="h-type2"><img src={shop05} alt="shop5"/></SwiperSlide>
                  <SwiperSlide className="h-type1"><img src={shop01} alt="shop1"/></SwiperSlide>
                  <SwiperSlide className="h-type2"><img src={shop02} alt="shop2"/></SwiperSlide>
                  <SwiperSlide className="h-type3"><img src={shop03} alt="shop3"/></SwiperSlide>
                  <SwiperSlide className="h-type1"><img src={shop04} alt="shop4"/></SwiperSlide>
                  <SwiperSlide className="h-type2"><img src={shop05} alt="shop5"/></SwiperSlide>
                </Swiper>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

const MenuPage = ({ onBack, logo, isDarkMode }) => {
  return (
    <div className={`menu-page ${isDarkMode ? 'dark' : ''}`}>
      <aside>
        <div>
        <button onClick={onBack}>CLOSE</button>
        <img src={logo} alt="logo" onClick={onBack} />

        </div>
      </aside>

      <main>
        <ul>
          <li>
            <div>
              <span>PIZZA</span>
              <h2>Cheese<br></br>Slice</h2>
              <p>Cheese Slices</p>
              <p>Tomato Sauce / Original Blend Cheese / Parmesan Cheese / Olive Oil</p>
              <strong>₩ 6,000</strong>
            </div>
            <div>
              <img src={menu1} alt="cheese"/>
            </div>
          </li>

          <li>
            <div>
              <span>PIZZA</span>
              <h2>Pepperoni<br></br>Slice</h2>
              <p>Pepperoni Slices</p>
              <p>Tomato sauce / Original blend cheese / Pepperoni</p>
              <strong>₩ 6,000</strong>
            </div>
            <div>
              <img src={menu2} alt="pepperoni"/>
            </div>
          </li>

          <li>
            <div>
              <span>PIZZA</span>
              <h2>Mushroom<br></br>Slice</h2>
              <p>Mushroom Slices</p>
              <p>Tomato Sauce / Original Blend Cheese / Mushrooms</p>
              <strong>₩ 6,000</strong>
            </div>
            <div>
              <img src={menu3} alt="mushroom"/>
            </div>
          </li>
          <li>
            <div>
              <span>PIZZA</span>
              <h2>Jalapeño<br></br>Slice</h2>
              <p>Sliced jalapenos</p>
              <p>Tomato sauce / Original blend cheese / Jalapenos</p>
              <strong>₩ 6,000</strong>
            </div>
            <div>
              <img src={menu4} alt="jala"/>
            </div>
          </li>
          <li>
            <div>
              <span>PIZZA</span>
              <h2>Today's<br></br>Slice</h2>
              <p>Today's Slice</p>
              <p>Tomato sauce / Original blend cheese / Daily toppings</p>
              <strong>₩ 7,000</strong>
            </div>
            <div>
              <img src={menu5} alt="today"/>
            </div>
          </li>
          <li>
            <div>
              <span>TOPPING</span>
              <h2>Jalapeño</h2>
              <p>JALAPENO TOPIING</p>
              <strong>₩ 500</strong>
            </div>
          </li>
          <li>
            <div>
              <span>SIDE</span>
              <h2>Garlic Knot</h2>
              <p>Garlic Knots</p>
              <p>Garlic bread made with pizza dough</p>
              <strong>₩ 3,000</strong>
            </div>
            <div>
              <h2>Spicy Potato</h2>
              <p>Spicy Potatoes</p>
              <p>Homemade Baked Potatoes</p>
              <strong>₩ 3,000</strong>
            </div>
          </li>
          <li>
            <div>
              <span>DRINK</span>
              <h2>Coca-Cola</h2>
              <p>Coca-Cola</p>
              <strong>₩ 3,500</strong>
            </div>
            <div>
              <h2>Sprite, Dr Pepper</h2>
              <p>Sprite, Dr. Pepper (can)</p>
              <strong>₩ 3,500</strong>
            </div>
            <div>
              <h2>Lemonade</h2>
              <p>Homemade lemonade</p>
              <strong>₩ 3,500</strong>
            </div>
          </li>
          <li>
            <div>
              <span>ALCOHOL</span>
              <h2>Bottled Beer</h2>
              <p>Budweiser, Stella Artois</p>
              <strong>₩ 6,500 ~</strong>
            </div>
          </li>
          <li>
            <div className='sizediv'>
              <span>HOLE</span>
              <h2>Plain Pizza 20inch</h2>
              <p>Tomato sauce, original blend cheese, olive oil</p>
              <p>This pizza is approximately 50cm in diameter and serves 3-4 people.</p>
              <p>It is usually cut into 8 slices, but you can also cut it into 16 slices or squares (grid pattern) if you prefer.</p>
              <strong>₩ 44000 YEN+ Pizza Box (1500 ₩)</strong>
            </div>
            
            <div>
              <div>
                <img src={size1} alt="size1"/>
                <p>One Topping</p>
                <p>1 type of topping</p>
              </div>
              <div>
                <img src={size2} alt="size2"/>
                <p>Half & Half</p>
                <p>2 type of topping</p>
              </div>
              <div>
                <img src={size3} alt="size3"/>
                <p>Quarter</p>
                <p>4 type of topping</p>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
};
export default App;