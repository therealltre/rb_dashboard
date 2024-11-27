import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../sections/auth/login';

// Mock necessary components or hooks
jest.mock('../hooks/useResponsive', () => jest.fn(() => true)); // Mock the `useResponsive` hook to return true (assuming it handles responsive design)
jest.mock('notistack', () => ({
  useSnackbar: jest.fn().mockReturnValue({
    enqueueSnackbar: jest.fn(),
  }),
}));

describe('LoginForm', () => {
  it('should render login form elements correctly', () => {
    // Render the LoginForm component
    render(<LoginForm />);

    // Check if the necessary elements are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument(); // Assuming there is an input with label 'Email'
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument(); // Assuming there is an input with label 'Password'
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument(); // Assuming there is a login button with text 'Login'
  });

  it('should allow valid login', async () => {
    render(<LoginForm />);

    // Simulate valid user input
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Use `waitFor` to wait for the state change (button should be disabled after form submission)
    await waitFor(() => {
      // Check if the button is disabled after submission
      expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
    });
  });
});
