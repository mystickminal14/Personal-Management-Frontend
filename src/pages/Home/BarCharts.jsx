import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useMediaQuery } from '@mui/material';

export default function BarCharts() {
  // Media query to determine screen size
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div style={{ width: '100%', height: isSmallScreen ? '300px' : '450px' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        className='w-[100%] h-[100%]'
      />
    </div>
  );
}
