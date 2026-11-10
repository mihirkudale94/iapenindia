import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import RegisterNow from '@/pages/RegisterNow';

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <RegisterNow />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('Register Now page', () => {
  it('shows the registration form from the official site', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Register Now' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Fill up the registration form' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-mail*')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/ })).toBeInTheDocument();
    expect(screen.getByTitle('IAPEN INDIA Location Map')).toBeInTheDocument();
  });

  it('flags empty required fields on submit', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Register/ }));
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
    expect(screen.getByText('E-mail is required')).toBeInTheDocument();
  });
});
