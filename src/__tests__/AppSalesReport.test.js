import { render, screen, waitFor } from '@testing-library/react';
import axios from '../utils/axios';
import AppSalesReport from '../sections/@dashboard/general/app/AppSalesReport';
import React from 'react';

// Mock the necessary modules and components
jest.mock('../utils/axios');
jest.mock('../components/chart', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Chart</div>),
  BaseOptionChart: jest.fn(() => ({
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%' },
    },
    xaxis: {
      categories: ['Product Launched', 'Ongoing Product', 'Product Sold'],
    },
  })),
}));

describe('AppSalesReport Component', () => {
  beforeEach(() => {
    // Reset mock data before each test
    axios.get.mockResolvedValue({
      data: {
        data: {
          sales_report: {
            product_launched: '10',
            ongoing_product: '15',
            product_sold: '25',
          },
        },
      },
    });
  });

  test('renders Sales Report with correct data', async () => {
    render(<AppSalesReport />);

    // Wait for the chart to load and check if it renders the correct labels and data
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Sales Report')).toBeInTheDocument();
    expect(screen.getByText('Chart')).toBeInTheDocument();
  });

  test('fetches and maps sales data correctly', async () => {
    render(<AppSalesReport />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/report/summary/');
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
    expect(screen.getByText('Chart')).toBeInTheDocument();
  });

  test('handles empty sales data gracefully', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: {
          sales_report: {
            product_launched: '0',
            ongoing_product: '0',
            product_sold: '0',
          },
        },
      },
    });

    render(<AppSalesReport />);

    await waitFor(() => expect(screen.getByText('Chart')).toBeInTheDocument());
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<AppSalesReport />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(4));
    expect(screen.queryByText('Chart')).toBeInTheDocument();
  });
});
