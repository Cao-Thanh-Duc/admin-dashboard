import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '../../utils/storage';
import './Login.css';
import { authApi } from '../../apis/auth.api';
import { useAuth } from '../../context/useAuth';

const LoginSchema = z.object({
  email: z.string().min(2, {
    message: 'Email is valid.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Lấy login từ context
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutationLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: any) => authApi.login(data),
  });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    mutationLogin.mutate(data, {
      onSuccess: (response) => {
        setAccessTokenToLS(response.access_token);
        setRefreshTokenToLS(response.refresh_token);
        setUserToLS(response.user);

        // Đăng nhập thành công, cập nhật trạng thái xác thực và chuyển hướng
        login(); // Cập nhật trạng thái xác thực
        navigate('/'); // Chuyển hướng đến trang chính
        toast.success('Đăng nhập thành công! 🚀');
      },
      onError: () => {
        toast.error('Đăng nhập thất bại!');
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <div className='form-login-main'>
      <img
        src={'https://blog2024.theciu.vn/wp-content/uploads/2021/05/fashion.jpg'}
        alt='bg-login'
        className='image-login'
      />
      <div className='right-section'>
        <h2 className='form-title'>Đăng nhập</h2>
        <p className='form-login-desc'>Hãy nhập thông tin của bạn vào các ô dưới đây</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type='email'
              placeholder='Email hoặc Số điện thoại'
              {...register('email')}
              required
            />
            {errors.email && <p className='error-message'>{errors.email.message}</p>}
          </div>
          <div>
            <input type='password' placeholder='Mật khẩu' {...register('password')} required />
            {errors.password && <p className='error-message'>{errors.password.message}</p>}
          </div>
          <div className='form-login-footer'>
            <button type='submit' className='btn-login' disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
            <Link to='#' className='forgot-password'>
              Quên mật khẩu?
            </Link>
          </div>
          <Link to='/register'>
            <p className='form-footer'>Bạn chưa có tài khoản?</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
