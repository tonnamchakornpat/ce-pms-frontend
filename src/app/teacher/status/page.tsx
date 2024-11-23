'use client';
import React, { useState } from 'react';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  Button,
  Box,
  Switch,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';

const TableComponent: React.FC = () => {
  const initialRows: GridRowsProp = [
    { id: 1, name: 'ขาดใจ', textcolor: '#000000', bgcolor: '#ff0000', isActive: false },
    { id: 2, name: 'ส่งแล้ว', textcolor: '#000000', bgcolor: '#00ff00', isActive: false },
    { id: 3, name: 'ยังไม่ส่ง', textcolor: '#000000', bgcolor: '#ffff00', isActive: false },
    { id: 4, name: 'แก้ไข', textcolor: '#000000', bgcolor: '#0000ff', isActive: false },
  ];

  const alternativeRows: GridRowsProp = [
    { id: 1, name: 'มึง', textcolor: '#000000', bgcolor: '#ff0000', isActive: false },
    { id: 2, name: 'กำลัง', textcolor: '#000000', bgcolor: '#00ff00', isActive: false },
    { id: 3, name: 'อ่าน', textcolor: '#000000', bgcolor: '#ffff00', isActive: false },
    { id: 4, name: 'อะไร', textcolor: '#000000', bgcolor: '#0000ff', isActive: false },
  ];

  const [rows, setRows] = useState<GridRowsProp>(initialRows);

  const handleButtonClick = (type: 'initial' | 'alternative') => {
    setRows(type === 'initial' ? initialRows : alternativeRows);
  };

  const handleIsActiveToggle = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isActive: !row.isActive } : row
      )
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ลำดับ', width: 100 },
    { field: 'name', headerName: 'สถานะ', flex: 1 },
    {
      field: 'textcolor',
      headerName: 'สีข้อความ',
      flex: 1,
      renderCell: (params) => (
        <Typography style={{ color: params.row.textcolor }}>
          {params.row.textcolor}
        </Typography>
      ),
    },
    {
      field: 'bgcolor',
      headerName: 'สีพื้นหลัง',
      flex: 1,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor: params.row.bgcolor,
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          <Typography style={{ color: params.row.textcolor }}>
            {params.row.bgcolor}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'isActive',
      headerName: 'สถานะใช้งาน',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleIsActiveToggle(params.id as number)}
          color="primary"
        />
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: () => <Button variant="text">≡</Button>,
    },
  ];

  return (
    <ThemeProvider
      theme={createTheme({
        typography: { fontFamily: 'Prompt, sans-serif' },
        palette: {
          primary: { main: '#1976d2' },
          secondary: { main: '#dc004e' },
        },
      })}
    >
      <Box style={{ padding: '20px' }}>
        <Box style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleButtonClick('initial')}
          >
            เตรียมโครงงาน
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleButtonClick('alternative')}
          >
            โครงงาน
          </Button>
        </Box>

        <Box style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TableComponent;
