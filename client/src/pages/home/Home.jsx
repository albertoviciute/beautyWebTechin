import { styled } from 'styled-components';
import landing from '../../assets/landing/landing.jpg';

const Container = styled.div`
  text-align: center;
  padding: 48px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 120%;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const ContentInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 500px;
  border-radius: 20px;
`;

const Home = () => {
  return (
    <Container>
      <HeroSection>
        <Title>Welcome to Our Beauty Web</Title>
        <Inner>
          <StyledImage src={landing} alt="Beauty procedure" />
          <ContentInner>
            <Subtitle>
              <b>Beauty Web</b> is your number one application for finding your desired procedures. If you desire to{' '}
              <b>treat yourself</b>, feel free to register and find the best beauty procedures, book appointments with
              top beauty professionals.
            </Subtitle>
          </ContentInner>
        </Inner>
      </HeroSection>
    </Container>
  );
};

export default Home;
