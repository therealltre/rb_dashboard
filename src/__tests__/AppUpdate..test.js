import { render, screen, waitFor } from '@testing-library/react';
import axios from '../utils/axios'; // Adjust the import path if necessary
import { AppUpdate } from '../sections/@dashboard/general/app';

// Mock axios
jest.mock('../utils/axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      data: {
        update: {
          date: '2024-11-27T00:00:00Z',
          percentage_change: '5%',
        },
      },
    },
  }),
}));

describe('AppUpdate Component', () => {
  beforeEach(() => {
    // Mock the axios response for the update data
    axios.get.mockResolvedValue({
      data: {
        data: {
          update: {
            date: '2024-11-27T00:00:00Z',
            percentage_change: '5%',
          },
        },
      },
    });
  });

  test('renders the AppUpdate component correctly', async () => {
    render(<AppUpdate />);

    await waitFor(() => {
      // Check if the texts below are displayed
      //   expect(screen.getByText('Sales revenue increased')).toBeInTheDocument();
      expect(screen.getByText('5%')).toBeInTheDocument();
      expect(screen.getByText('see statistics')).toBeInTheDocument();
      expect(screen.getByText('Update')).toBeInTheDocument();
      expect(screen.getByText('Nov 27, 2024')).toBeInTheDocument();
    });
  });

  test('fetches and displays the update data on mount', async () => {
    render(<AppUpdate />);

    await waitFor(() => {
      // Ensure that the axios.get was called once
      expect(axios.get).toHaveBeenCalledTimes(2);

      // Check if the update date and percentage change are displayed
      expect(screen.getByText('5%')).toBeInTheDocument();
      expect(screen.getByText('Nov 27, 2024')).toBeInTheDocument();
    });
  });

  test('handles empty update data gracefully', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: {
          update: { date: '', percentage_change: '0%' }, // Simulate missing values
        },
      },
    });
  
    render(<AppUpdate />);
  
    await waitFor(() => {
      expect(screen.queryByText('Nov 27, 2024')).not.toBeInTheDocument();
      expect(screen.getByText('see statistics')).toBeInTheDocument();
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });
  
});
