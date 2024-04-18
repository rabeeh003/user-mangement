import React, { useEffect } from 'react';
import TheamBtn from './TheamButton';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { setCleanUser } from '@/redux/User';
import { store } from '@/redux/Store';
import { Type } from 'lucide-react';
import { setCleanAdmin } from '@/redux/Admin';

function AdminNav() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {admin} = useSelector(state => state?.admin)
  console.log(admin, '==admin');

  useEffect(() => {
    if (!admin) {
      navigate('/admin-login');
    }
  }, []);

  const handleLogout = () => {
    dispatch(setCleanAdmin({ type: 'logout' }));
    navigate('/admin-login')
  };

  return (
    <div>
      <div className='flex justify-around w-[100vw] h-16 align-middle bg-card bg-opacity-35'>
        <div className='text-3xl text-foreground font-semibold my-auto'><Link to="/admin">Admin</Link></div>
        <div className='flex my-auto gap-4'>
          {admin === '' ? (
            <>
              <span className='m-auto'>
                <Link to={'/admin-login'}>Login</Link>
              </span>
            </>
          ) : (
            <>
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

export default AdminNav;
