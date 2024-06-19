import { styled } from 'styled-components';
import SyncLoader from 'react-spinners/SyncLoader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';

const Container = styled.div`
  text-align: center;
  padding: 48px 16px;
  max-width: 1300px;
  margin: 0 auto;
`;

const Section = styled.section``;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 400px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 20px;
  text-align: left;
`;

const ProcedureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Procedures = () => {
  const [procedures, setProcedures] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/procedures`);
        setProcedures(response.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <Container>
      <Section>
        <Title>Discover all procedures that are perfect for you</Title>
        <List>
          {procedures ? (
            procedures.map((procedure) => (
              <Card key={procedure.id} onClick={() => navigate(`/procedures/${procedure.id}`)}>
                <Image src={procedure.image} alt={procedure.name} />
                <Info>
                  <ProcedureTitle>{procedure.name}</ProcedureTitle>
                  <Description>Price: {procedure.price} EUR</Description>
                </Info>
              </Card>
            ))
          ) : (
            <SyncLoader color={'#f0f0f0'} loading={loading} size={20} />
          )}
        </List>
      </Section>
    </Container>
  );
};

export default Procedures;
