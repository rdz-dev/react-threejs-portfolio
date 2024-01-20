import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Intro from 'pages/Home/Intro';
import ProjectSummary from 'pages/Home/ProjectSummary';
import Profile from 'pages/Home/Profile';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
import { useLocation } from 'react-router-dom';
import codingFunImage from 'assets/chao/codingfun.png';
import vhotImage from 'assets/chao/vhot.png';
import lolImage from 'assets/chao/lol.png';
import yexcImage from 'assets/chao/yexc.png';
import chImage from 'assets/chao/ch.png';
import chiNoodleBarImage from 'assets/chao/chi-noodle.png';
import reactThree from 'assets/chao/react-three.png';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/spr-lesson-builder-dark.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import './index.css';

const disciplines = ['MERN Stack', 'React', 'React Native', 'Vue', 'Node', 'MongoDB'];
// related css: intro__title-word--plus

const Home = () => {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  const intro = useRef();
  const project1 = useRef();
  const project2 = useRef();
  const project3 = useRef();
  const project4 = useRef();
  const project5 = useRef();
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [
      intro,
      project1,
      project2,
      project3,
      project4,
      project5,
      about,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, project5, about];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <div className="home">
      <Helmet>
        <title>Chao Zhang | Developer</title>
        <meta
          name="description"
          content="Portfolio of Chao Zhang – a software developer focusing on front-end development and ui/ux design."
        />
        <link rel="prefetch" href={iphone11} as="fetch" crossorigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossorigin="" />
      </Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      <ProjectSummary
        // id="project-2"
        sectionRef={project2}
        visible={visibleSections.includes(project2.current)}
        title="Crypto Hero"
        description="🕹 Web3 idle game. Earn your rewards anytime, anywhere."
        buttonText="View Website"
        buttonLink="https://cryptohero.game/"
        model={{
          type: 'laptop',
          textures: [
            {
              src: sprTexture,
              srcSet: `${chImage} 800w, ${chImage} 1440w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />

      <ProjectSummary
        sectionRef={project1}
        visible={visibleSections.includes(project1.current)}
        title="Buy & Sell Cryptocurrency"
        description="A simple, professional, and secure trading experience."
        buttonText="View Website"
        buttonLink="https://yexc.com/"
        model={{
          type: 'laptop',
          textures: [
            {
              src: sprTexture,
              srcSet: `${yexcImage} 800w, ${yexcImage} 1440w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />

      <ProjectSummary
        // id="project-3"
        sectionRef={project3}
        visible={visibleSections.includes(project3.current)}
        title="Computer Graphics Three.js Demo"
        description="🌓 A demo for computer graphics by react & three.js"
        buttonText="View Website"
        buttonLink="https://computer-graphics-playground.vercel.app/"
        model={{
          type: 'laptop',
          alt: 'demo',
          textures: [
            {
              src: sliceTexture,
              srcSet: `${reactThree} 980w, ${reactThree} 1376w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />

      <ProjectSummary
        // id="project-4"
        sectionRef={project4}
        visible={visibleSections.includes(project4.current)}
        title="Online Coding Learning Platform"
        description="💻 A platform to let students quickly learn the fundamental of different programming languages in a fun way."
        buttonText="View Website"
        buttonLink="https://codingfun.io/"
        model={{
          type: 'laptop',
          alt: 'CodingFun',
          textures: [
            {
              src: sprTexture,
              srcSet: `${codingFunImage} 800w, ${codingFunImage} 1440w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />

      <ProjectSummary
        // id="project-5"
        id="project-1"
        sectionRef={project5}
        visible={visibleSections.includes(project5.current)}
        title="Short Videos Web App"
        description="🥳 Tiktok like short video web app"
        buttonText="View Website"
        buttonLink="https://vhot.live/recomandation"
        model={{
          type: 'laptop',
          textures: [
            {
              src: sprTexture,
              srcSet: `${vhotImage} 800w, ${vhotImage} 1440w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />

      {/* <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Video game progress tracking"
        description="Design and development for a video game tracking app built in React Native"
        buttonText="View Website"
        buttonLink="https://gamestackapp.com"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              src: gamestackTexture,
              srcSet: `${gamestackTexture} 254w, ${gamestackTextureLarge} 508w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              src: gamestackTexture2,
              srcSet: `${gamestackTexture2} 254w, ${gamestackTexture2Large} 508w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      /> */}

      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />

      <Footer />
    </div>
  );
};

export default Home;
