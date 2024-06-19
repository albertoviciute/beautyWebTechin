import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import SyncLoader from 'react-spinners/SyncLoader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/api';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 16px;
`;

const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  max-width: 400px;
  &::placeholder {
    color: #d9d9d9;
    font-size: 1rem;
  }
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #f0f0f0;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  max-width: 400px;
  font-weight: 600;
  font-size: 0.9rem;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  &:hover {
    background-color: #fef3f3;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const ErrorMessage = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #990000;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const CreateProcedureTime = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/procedures/${id}/time`, {
        procedure_id: id,
        date_time: data.date,
        start_time: data.time,
      });

      navigate(`/procedures/${id}`);
    } catch (error) {
      console.error('Error creating procedure time:', error);
      setError('api', {
        message: 'Error creating procedure time: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Create Procedure Time</Title>
      {loading ? (
        <LoadingContainer>
          <SyncLoader size={8} color={'#ffffff'} />
        </LoadingContainer>
      ) : (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <Label>Date</Label>
            <Input type="date" {...register('date', { required: 'Date is required.' })} />
            {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
          </FormField>
          <FormField>
            <Label>Time</Label>
            <Input type="time" {...register('time', { required: 'Time is required.' })} />
            {errors.time && <ErrorMessage>{errors.time.message}</ErrorMessage>}
          </FormField>

          {errors.api && <ErrorMessage>{errors.api.message}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            Create
          </Button>
        </StyledForm>
      )}
    </Container>
  );
};

export default CreateProcedureTime;
