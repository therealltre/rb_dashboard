import { render, screen, waitFor, act } from '@testing-library/react';
import axios from '../utils/axios';
import AppTotalPerformance from '../sections/@dashboard/general/app/AppTotalPerformance';
import React from 'react';
import ReactApexChart from '../components/chart';

// Mock Axios and ReactApexChart
jest.mock('../utils/axios');
jest.mock('../components/chart', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Chart</div>),
  BaseOptionChart: jest.fn(() => ({
    legend: { floating: true, horizontalAlign: 'center' },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: { show: true },
        },
      },
    },
  })),
}));

describe('AppTotalPerformance Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        data: {
          total_view_perfomance: {
            view_count: '14',
            sales: '31',
            percentage: '55',
            total_count: '100',
          },
        },
      },
    });
  });

  test('renders Total View Performance and chart', async () => {
    await act(async () => {
      render(<AppTotalPerformance />);
    });

    // Check if the title is rendered
    expect(screen.getByText('Total View Performance')).toBeInTheDocument();

    // Wait for the chart to load and check its rendering
    await waitFor(() => expect(screen.getByText('Chart')).toBeInTheDocument());
  });

  test('fetches data correctly', async () => {
    await act(async () => {
      render(<AppTotalPerformance />);
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/report/summary/');
      expect(axios.get).toHaveBeenCalledTimes(2); // Adjust based on how often it's called
    });

    // Ensure chart options are configured correctly
    expect(ReactApexChart).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          plotOptions: expect.objectContaining({
            pie: expect.objectContaining({
              donut: expect.objectContaining({
                labels: expect.objectContaining({
                  total: expect.objectContaining({
                    label: 'Total Count',
                  }),
                }),
              }),
            }),
          }),
        }),
      }),
      {}
    );
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      render(<AppTotalPerformance />);
    });

    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    expect(
      screen.getByText('Here are some tips on how to improve your score')
    ).toBeInTheDocument();
  });

  test('displays a guide button with correct text', async () => {
    await act(async () => {
      render(<AppTotalPerformance />);
    });
  
    expect(
      screen.getByRole('button', { name: /Guide Views/i })
    ).toBeInTheDocument();
  });
  
});
