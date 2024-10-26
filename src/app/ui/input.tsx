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
  searchKey?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = React.memo(
  ({
    id,
    name,
    type = 'text',
    placeholder = 'Search for photos...',
    inputValue,
    handleInput,
    searchKey,
    children,
    loading,
    className = '',
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
          onKeyUp={searchKey}
          className={`rounded-lg border-none text-base text-black outline-none ${className}`}
        />
        {children}
        {loading && <Loader />}
      </>
    );
  },
);

Input.displayName = 'Input';
export default Input;
