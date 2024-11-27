import { render, screen, waitFor } from '@testing-library/react';
import axios from '../utils/axios'; // Adjust the import path if necessary
import { AppRevenue } from '../sections/@dashboard/general/app';

// Mock axios and BaseOptionChart for testing purposes
jest.mock('../utils/axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      data: {
        revenue: {
          currency: 'GHS',
          amount: '10,000',
          percentage_change: '5%',
        },
      },
    },
  }),
}));
jest.mock('../components/chart', () => ({
  __esModule: true,
  BaseOptionChart: jest.fn(() => ({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: jest.fn(),
        title: {
          formatter: jest.fn(),
        },
      },
    },
    plotOptions: {
      bar: { horizontal: false, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    },
  })),
  default: jest.fn(() => <div>Chart</div>),
}));

describe('AppRevenue Component', () => {
  beforeEach(() => {
    // Mock the axios response for the revenue data
    axios.get.mockResolvedValue({
      data: {
        data: {
          revenue: {
            currency: 'GHS',
            amount: '10,000',
            percentage_change: '5%',
            break_down: [
              { revenue: '1000', expense: '500' },
              { revenue: '2000', expense: '700' },
              { revenue: '3000', expense: '800' },
              { revenue: '4000', expense: '1000' },
              { revenue: '5000', expense: '1200' },
              { revenue: '6000', expense: '1500' },
            ],
          },
        },
      },
    });
  });

  test('renders the AppRevenue component correctly', async () => {
    render(<AppRevenue />);

    // Wait for the component to load and render the revenue data
    await waitFor(() => screen.getByText('GHS'));
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('10,000')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('from last month')).toBeInTheDocument();

    // Wait for the chart to render
    await waitFor(() => screen.getByText('Chart'));
    expect(screen.getByText('Chart')).toBeInTheDocument();
  });

  test('fetches and updates revenue data on mount', async () => {
    render(<AppRevenue />);

    await waitFor(() => {
      // Ensure that the axios.get was called once
      expect(axios.get).toHaveBeenCalledTimes(2);

      expect(screen.getByText('GHS')).toBeInTheDocument();
      expect(screen.getByText('10,000')).toBeInTheDocument();
      expect(screen.getByText('5%')).toBeInTheDocument();
    });
  });

  test('handles empty revenue data gracefully', async () => {
    // Mock an empty response
    axios.get.mockResolvedValueOnce({
      data: {
        data: {
          revenue: {
            currency: 'GHS',
            amount: '0',
            percentage_change: '0%',
            break_down: [],
          },
        },
      },
    });

    render(<AppRevenue />);

    // Ensure that even empty data does not break the component
    await waitFor(() => expect(screen.getByText('GHS')).toBeInTheDocument());
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
