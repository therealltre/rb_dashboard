import { render, screen, waitFor } from '@testing-library/react';
import axios from '../utils/axios'; // Mock axios
import { AppNetIncome } from '../sections/@dashboard/general/app';

// Mock the axios get request
jest.mock('../utils/axios');

// Test for AppNetIncome component
describe('AppNetIncome', () => {
  it('should render the net income component with correct values', async () => {
    // Mock the response for the axios GET request
    axios.get.mockResolvedValue({
      data: {
        data: {
          net_income: {
            currency: '$',
            amount: 5000,
            percentage_change: '+5%',
          },
        },
      },
    });

    // Render the component
    render(<AppNetIncome />);

    // Wait for the component to fetch and display the data
    await waitFor(() => {
      // Check if the currency, amount, and percentage change are displayed
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('5000')).toBeInTheDocument();
      expect(screen.getByText('+5%')).toBeInTheDocument();
    });
  });

  it('should handle errors gracefully when the data fetch fails', async () => {
    // Mock the axios GET request to simulate an error
    axios.get.mockRejectedValue(new Error('Failed to fetch data'));

    // Render the component
    render(<AppNetIncome />);

    // Wait for the component to finish loading (error handling might show an error message or no data)
    await waitFor(() => {
      // Here, you can assert that the component gracefully handles the error, e.g., shows an error message or doesn't display the income
      expect(screen.queryByText('$')).not.toBeInTheDocument();
      expect(screen.queryByText('5000')).not.toBeInTheDocument();
    });
  });
});
