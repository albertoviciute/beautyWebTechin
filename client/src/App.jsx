import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Footer from './pages/components/Footer';
import Error from './pages/error/Error';
import Header from './pages/components/Header';
import { styled } from 'styled-components';
import Home from './pages/home/Home';
import Register from './pages/user/Register';
import Procedures from './pages/procedures/Procedures';
import Procedure from './pages/procedures/Procedure';
import CreateProcedure from './pages/procedures/CreateProcedure';
import { AuthContext } from './utils/AuthContext';
import SignIn from './pages/user/SignIn';
import EditProcedure from './pages/procedures/EditProcedure';
import CreateProcedureTime from './pages/procedures/CreateProcedureTime';

const Content = styled.div`
  min-height: calc(100vh - 138px);
`;

function App() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated;
  }, [isAuthenticated, navigate]);
  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          {isAuthenticated && <Route path="/procedures" element={<Procedures />} />}
          {isAuthenticated && <Route path="/procedures/:id" element={<Procedure />} />}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          {isAdmin && <Route path="/create-procedure" element={<CreateProcedure />} />}
          {isAdmin && <Route path="/edit-procedure/:id" element={<EditProcedure />} />}
          {isAdmin && <Route path="/procedures/:id/time" element={<CreateProcedureTime />} />}
        </Routes>
      </Content>
      <Footer />
    </>
  );
}

export default App;
