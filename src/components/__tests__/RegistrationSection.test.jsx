import { render, screen } from '@testing-library/react';
import RegistrationSection from '../RegistrationSection';
import { describe, it, expect } from 'vitest';

describe('RegistrationSection Component', () => {
  it('shows the official membership process and bank details', () => {
    render(<RegistrationSection />);
    expect(screen.getByText('Apply for IAPEN India Membership')).toBeInTheDocument();
    expect(screen.getByText('238805001011')).toBeInTheDocument();
    expect(screen.getByText('ICIC0002388')).toBeInTheDocument();
  });

  it('links to the official application form', () => {
    render(<RegistrationSection />);
    expect(screen.getByRole('link', { name: /Proceed to Official Google Form/i })).toHaveAttribute(
      'href',
      'https://forms.gle/h4kSoNmHffsNt8dP7'
    );
  });

  it('lists the documents required by the official process', () => {
    render(<RegistrationSection />);
    expect(screen.getByText(/transaction receipt or UTR/i)).toBeInTheDocument();
    expect(screen.getByText(/graduation certificate/i)).toBeInTheDocument();
  });
});
