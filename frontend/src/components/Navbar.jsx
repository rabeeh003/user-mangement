import React from 'react';
import TheamBtn from './TheamButton';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
  const userDetails = useSelector(state => state?.user).user
  console.log(userDetails, '==user');
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
              <span className='m-auto'>
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
