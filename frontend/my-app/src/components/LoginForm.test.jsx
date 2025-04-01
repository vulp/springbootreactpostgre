import { expect, test, vi } from 'vitest'
//import { render } from 'vitest-browser-react'
//import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from '../hooks/useAuth.jsx';
import LoginForm from './LoginForm'


test('test1234', () => {
   expect(1).toBe(1);
});

test('test234', () => {

   render(<BrowserRouter><AuthProvider><LoginForm /></AuthProvider> </BrowserRouter>)
   const usernameInput = screen.getByPlaceholderText('username')
   expect(usernameInput).toBeInTheDocument();
});
