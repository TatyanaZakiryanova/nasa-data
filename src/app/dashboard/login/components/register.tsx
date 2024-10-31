'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/app/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';

const Register = () => {
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
      const { email, password } = values;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered:', user);

        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          email: user.email,
          profilePicture: user.photoURL || null,
          createdAt: new Date(),
          lastLogin: new Date(),
          roles: ['user'],
        });

        console.log('User data saved to Firestore');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 text-center">
      <Input
        id="email-input"
        name="email"
        type="email"
        placeholder="Email"
        inputValue={formik.values.email}
        handleInput={formik.handleChange}
        handleBlur={formik.handleBlur}
        className={`w-full p-2 md:w-[300px] ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
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
        className={`w-full p-2 md:w-[300px] ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
      />
      {formik.touched.password && formik.errors.password ? (
        <span className="text-sm text-red-500">{formik.errors.password}</span>
      ) : null}
      <Button type="submit" className="px-5 py-2" disabled={!formik.isValid || !formik.dirty}>
        Register
      </Button>
    </form>
  );
};

export default Register;
