'use client';

import React from 'react';

import Loader from './loader/loader';

interface InputProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  inputValue: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  searchKey?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = React.memo(
  ({
    id,
    name,
    type = 'text',
    placeholder = 'Search for photos...',
    inputValue,
    handleInput,
    handleBlur,
    searchKey,
    children,
    loading,
    className = '',
    autoComplete,
  }) => {
    return (
      <>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInput}
          onBlur={handleBlur}
          onKeyUp={searchKey}
          className={`rounded-lg border text-base text-black outline-none ${className}`}
          autoComplete={autoComplete}
        />
        {children}
        {loading && <Loader />}
      </>
    );
  },
);

Input.displayName = 'Input';
export default Input;
