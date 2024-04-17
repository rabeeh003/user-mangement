import React, { useEffect } from 'react';
import TheamBtn from './TheamButton';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { setCleanUser } from '@/redux/User';
import { store } from '@/redux/Store';
import { Type } from 'lucide-react';

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector(state => state?.user).user
  console.log(userDetails, '==user');

  useEffect(() => {
    if (!userDetails) {
      navigate('/login');
    }
  }, [userDetails]);

  const handleLogout = () => {
    dispatch(setCleanUser({ type: 'logout' }));
    navigate('/login')
  };

  return (
    <div>
      <div className='flex justify-around w-[100vw] h-16 align-middle bg-card bg-opacity-35'>
        <div className='text-3xl text-foreground font-semibold my-auto'><Link to="/">Redux</Link></div>
        <div className='flex my-auto gap-4'>
          {userDetails === '' ? (
            <>
              <span className='m-auto'>
                <Link to={'/login'}>Login</Link>
              </span>
              <span className='m-auto'>
                <Link to={'/register'}>register</Link>
              </span>
            </>
          ) : (
            <>
              <span className='m-auto'>
                <Link to='/profile'>Profile</Link>
              </span>
              <span onClick={handleLogout} className='m-auto'>
                <Link>Logout</Link>
              </span>
            </>
          )}
          <TheamBtn />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
