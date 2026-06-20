import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationSection from '../RegistrationSection';
import { describe, it, expect, vi } from 'vitest';

describe('RegistrationSection Component', () => {
  it('renders the form correctly', () => {
    render(<RegistrationSection />);
    expect(screen.getByText('Online Registration Form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    render(<RegistrationSection />);
    
    const submitButton = screen.getByRole('button', { name: /Submit Application/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
    });
  });

  it('updates form state on input change', () => {
    render(<RegistrationSection />);
    
    const nameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(nameInput, { target: { value: 'Dr. John Doe' } });
    expect(nameInput.value).toBe('Dr. John Doe');
  });
});
