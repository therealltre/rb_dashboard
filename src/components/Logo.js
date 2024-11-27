import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx }, ref) => {
  const logo = (
    <Box ref={ref} sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}>
      <svg width="100%" height="100%" viewBox="0 0 279 168" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M88.68 168C86.6 168 85.24 167.12 84.6 165.36L58.2 104.4C57.88 103.76 57.4 103.44 56.76 103.44H46.68C45.88 103.44 45.48 103.84 45.48 104.64V164.4C45.48 165.52 45.16 166.4 44.52 167.04C43.88 167.68 43 168 41.88 168H3.96C2.84 168 1.96 167.68 1.32 167.04C0.68 166.4 0.36 165.52 0.36 164.4V3.59999C0.36 2.47999 0.68 1.59999 1.32 0.959991C1.96 0.319989 2.84 -1.14441e-05 3.96 -1.14441e-05H76.68C87.56 -1.14441e-05 97.08 2.23999 105.24 6.71999C113.56 11.2 119.96 17.52 124.44 25.68C129.08 33.68 131.4 42.96 131.4 53.52C131.4 64.08 128.76 73.36 123.48 81.36C118.36 89.2 111.24 94.96 102.12 98.64C101.32 98.96 101.08 99.52 101.4 100.32L131.88 163.68C132.2 164.64 132.36 165.2 132.36 165.36C132.36 166.16 132.04 166.8 131.4 167.28C130.76 167.76 129.96 168 129 168H88.68ZM46.68 38.64C45.88 38.64 45.48 39.04 45.48 39.84V67.92C45.48 68.72 45.88 69.12 46.68 69.12H69.24C74.36 69.12 78.52 67.76 81.72 65.04C84.92 62.16 86.52 58.48 86.52 54C86.52 49.36 84.92 45.68 81.72 42.96C78.52 40.08 74.36 38.64 69.24 38.64H46.68ZM257.456 80.64C256.816 81.12 256.816 81.6 257.456 82.08C264.656 86.08 269.936 91.2 273.296 97.44C276.656 103.68 278.336 111.2 278.336 120C278.336 136.48 272.576 148.64 261.056 156.48C249.536 164.16 234.576 168 216.176 168H151.616C150.496 168 149.616 167.68 148.976 167.04C148.336 166.4 148.016 165.52 148.016 164.4V3.59999C148.016 2.47999 148.336 1.59999 148.976 0.959991C149.616 0.319989 150.496 -1.14441e-05 151.616 -1.14441e-05H214.016C234.496 -1.14441e-05 249.856 3.67999 260.096 11.04C270.496 18.24 275.696 30.4 275.696 47.52C275.696 62.72 269.616 73.76 257.456 80.64ZM194.336 38.64C193.536 38.64 193.136 39.04 193.136 39.84V63.84C193.136 64.64 193.536 65.04 194.336 65.04H214.016C225.696 65.04 231.536 60.64 231.536 51.84C231.536 43.04 225.696 38.64 214.016 38.64H194.336ZM216.176 129.36C227.536 129.36 233.216 124.64 233.216 115.2C233.216 106.24 227.616 101.76 216.416 101.76H194.336C193.536 101.76 193.136 102.16 193.136 102.96V128.16C193.136 128.96 193.536 129.36 194.336 129.36H216.176Z"
          fill="white"
        />
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
