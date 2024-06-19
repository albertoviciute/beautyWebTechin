import { useEffect, useState, useContext } from 'react';
import { styled } from 'styled-components';
import SyncLoader from 'react-spinners/SyncLoader';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/api';
import { AuthContext } from '../../utils/AuthContext';
const Container = styled.div`
  padding: 48px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section``;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 450px;
  object-fit: cover;
  border-radius: 20px;
`;

const Info = styled.div`
  padding: 20px;
  min-width: 450px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 120%;
  text-transform: capitalize;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #f0f0f0;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  font-size: 0.9rem;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  &:hover {
    background-color: #fef3f3;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Procedure = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [procedure, setProcedures] = useState(null);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/procedures/${id}`);
        setProcedures(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  const handleDelete = () => {
    axios.delete(`${BASE_URL}/procedures/${id}`);
    navigate('/procedures');
  };
  console.log(procedure)
  return (
    <Container>
      <Section>
        {!loading && procedure && procedure[0].image ? (
          <>
            <Content>
              <Image src={procedure[0].image} alt={procedure[0].name} />
              <Info>
                <Title>{procedure[0].name}</Title>
                <Description>Category: {procedure[0].category}</Description>
                <Description>Duration: {procedure[0].duration}</Description>
                <Description>Price: {procedure[0].price} EUR</Description>
                {isAuthenticated && isAdmin && (
                  <ButtonsContainer>
                    <Button onClick={() => navigate(`/edit-procedure/${id}`)}>Edit</Button>
                    <Button onClick={() => navigate(`/procedures/${id}/time/`)}>Create time</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                  </ButtonsContainer>
                )}
              </Info>
            </Content>
          </>
        ) : (
          <SyncLoader color={'#f0f0f0'} loading={true} size={20} />
        )}
      </Section>
    </Container>
  );
};

export default Procedure;
