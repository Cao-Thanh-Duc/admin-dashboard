import { useQuery } from '@tanstack/react-query';
import './navbar.scss';
import { UserApi } from '../../apis/user.api';

const Navbar = () => {
  const { data: getMe } = useQuery({
    queryKey: ['me'],
    queryFn: () => UserApi.getMe(),
  });
  console.log('getMe:', getMe);

  return (
    <div className='navbar'>
      <div className='logo'>
        <img src='logo.svg' alt='' />
        <span>DALAT Fashion Dashboard</span>
      </div>
      <div className='icons'>
        <img src='/search.svg' alt='' className='icon' />
        <img src='/app.svg' alt='' className='icon' />
        <img src='/expand.svg' alt='' className='icon' />
        <div className='notification'>
          <img src='/notifications.svg' alt='' />
          <span>3</span>
        </div>
        <div className='user'>
          <img
            src='https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-1/459070486_1188276842416149_3239714784718987963_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=1d2534&_nc_ohc=mOzp39ZXkTkQ7kNvgGyPybD&_nc_zt=24&_nc_ht=scontent-hkg4-2.xx&_nc_gid=AL1RihVl99oV0k-tmcA5lgS&oh=00_AYBTtNK-m8PnuaEVcgc1wTNpxIn7FYYAJ9bvuSyqY6zffw&oe=677012FF'
            alt=''
          />
          <span>{getMe?.fullname || 'Admin'}</span>
        </div>
        <img src='/settings.svg' alt='' className='icon' />
      </div>
    </div>
  );
};

export default Navbar;
