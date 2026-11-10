import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import Membership from '@/pages/Membership';

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <Membership />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('Membership page', () => {
  it('shows the sections of the official membership page', () => {
    renderPage();
    for (const heading of [
      'Membership Benefits',
      'Privilege of Life Membership:',
      'Privilege For Student Membership:',
      'Process for Membership Application :',
      'Membership Fees',
      'Bank Account Details',
    ]) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
  });

  it('lists the fees and bank details', () => {
    renderPage();
    expect(screen.getByText(/5000\/- INR Life Membership for Doctors/)).toBeInTheDocument();
    expect(screen.getByText('238805001011')).toBeInTheDocument();
    expect(screen.getByText('ICIC0002388')).toBeInTheDocument();
  });

  it('links to the official application form', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /forms\.gle\/h4kSoNmHffsNt8dP7/ })).toHaveAttribute(
      'href',
      'https://forms.gle/h4kSoNmHffsNt8dP7'
    );
  });
});
