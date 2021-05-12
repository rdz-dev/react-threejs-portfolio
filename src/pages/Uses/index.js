import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'components/ProjectLayout';
import Link from 'components/Link';
import usesBackground from 'assets/uses-background.mp4';
import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import prerender from 'utils/prerender';
import { useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import './index.css';
// import { Table, TableCell, TableRow } from 'components/Table';

const Uses = () => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet>
        <title>Research | Chao Zhang</title>
        <meta name="description" content="Some research during my graduate stuides" />
      </Helmet>
      <ProjectContainer className="uses">
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.8}
          entered={!prerender}
        />
        <ProjectHeader
          title="Research"
          description="During my graduate studies, I was highly interested in some topics related to computer science like computer graphics and image processing. At that time, I did some research and developed some interesting projects."
        />
        <ProjectSection first className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>
                <Link href="https://github.com/chaozhangdev/computer-graphics">
                  Computer Graphics
                </Link>
              </ProjectSectionHeading>
              <ProjectSectionText>
                <p>
                  An desktop application by volume rendering algorithm to display images
                  from medical CT data with different perspectives.
                </p>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection first className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>
                <Link href="https://github.com/chaozhangdev/image-processing">
                  Image Processing
                </Link>
              </ProjectSectionHeading>
              <ProjectSectionText>
                <p>
                  Implemented image processing algorithm including smooth, sharpen,
                  shadow, noise remove, filter, counter detection. Manipulated raw images,
                  processed images by pixels with mathematical algorithms including
                  Fourier transform and Hough transform.
                </p>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection first className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>
                <Link href="https://github.com/chaozhangdev/gis-navigation-toolbox">
                  GIS
                </Link>
              </ProjectSectionHeading>
              <ProjectSectionText>
                <p>
                  ArcGIS navigation toolbox by Python to provide the shortest route
                  navigation.
                </p>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection first className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>
                <Link href="https://github.com/chaozhangdev/steganography">
                  Steganography
                </Link>
              </ProjectSectionHeading>
              <ProjectSectionText>
                <p>
                  Self-created algorithm to hide data into the image by modifying color of
                  pixels.
                </p>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default Uses;
