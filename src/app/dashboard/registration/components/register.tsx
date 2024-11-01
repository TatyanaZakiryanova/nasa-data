'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';

import { auth, db } from '@/app/lib/firebase';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import Modal from '@/app/ui/modal';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const { email, password } = values;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          profilePicture: user.photoURL || null,
          createdAt: new Date(),
          lastLogin: new Date(),
          roles: ['user'],
        });
        openModal('Registration successful!');
        router.push('/dashboard/profile');
      } catch {
        openModal('Error registering user');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 text-center">
        <p className="flex items-center justify-center gap-2 text-xl">
          <UserPlus size={20} />
          Sign Up
        </p>
        <Input
          id="email-input"
          name="email"
          type="email"
          placeholder="Email"
          inputValue={formik.values.email}
          handleInput={formik.handleChange}
          handleBlur={formik.handleBlur}
          className={`w-full p-2 shadow-md md:w-[300px]`}
        />
        {formik.touched.email && formik.errors.email ? (
          <span className="text-sm text-red-500">{formik.errors.email}</span>
        ) : null}
        <Input
          id="password-input"
          name="password"
          type="password"
          placeholder="Password"
          inputValue={formik.values.password}
          handleInput={formik.handleChange}
          handleBlur={formik.handleBlur}
          className={`w-full p-2 shadow-md md:w-[300px]`}
        />
        {formik.touched.password && formik.errors.password ? (
          <span className="text-sm text-red-500">{formik.errors.password}</span>
        ) : null}
        <Button
          type="submit"
          className="px-5 py-2"
          disabled={!formik.isValid || !formik.dirty || isLoading}
        >
          {isLoading ? 'In progress...' : 'Sign up'}
        </Button>
        <p className="text-xs">
          Already registered?{' '}
          <Link href="/dashboard/login" className="text-purple-600 hover:underline">
            Sign in
          </Link>
        </p>
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <p>{modalMessage}</p>
        </Modal>
      </form>
    </>
  );
}
