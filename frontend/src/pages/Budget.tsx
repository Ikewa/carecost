/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, Stack, Button, TextField, Switch, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Snackbar, Alert
} from '@mui/material';
import Grid from '@mui/material/Grid'; 
import { Add, People, Person } from '@mui/icons-material';

// 1. Import the Hook
import { useCareContext } from '../context/CareContext'; 

export default function Budget() {
  // 2. Destructure the REAL data and functions
  const { 
    user, 
    budget, 
    transactions, 
    addTransaction, 
    updateBudgetLimit 
  } = useCareContext();

  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  // Helper for Plan Toggle
  const isFamily = user.planType === 'FAMILY';

  const handleTogglePlan = (checked: boolean) => {
    const newLimit = checked ? 5000 : 2000;
    const newType = checked ? 'FAMILY' : 'SOLO';
    updateBudgetLimit(newLimit, newType);
  };
  
  const handleAddExpense = () => {
    if (!expenseDesc || !expenseAmount) return;

    // Create a real transaction object
    const newTx = {
      id: Date.now().toString(), // Simple unique ID
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(expenseAmount),
      category: 'EXTERNAL_EXPENSE' as const, // Type assertion for TS
      description: expenseDesc,
    };

    // Save to Global State (and LocalStorage)
    addTransaction(newTx);

    setToastOpen(true);
    setExpenseDesc('');
    setExpenseAmount('');
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Budget & Settings</Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your plan limits and track outside spending.
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        
        {/* 1. PLAN SETTINGS CARD */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                {isFamily ? <People color="primary" /> : <Person color="primary" />}
                <Typography variant="h6">Current Plan</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {isFamily ? 'Family Plan' : 'Solo Plan'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Limit: ${budget.totalLimit.toLocaleString()} / mo
                  </Typography>
                </Box>
                <Switch 
                  checked={isFamily} 
                  onChange={(e) => handleTogglePlan(e.target.checked)} 
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {isFamily 
                  ? "Covers up to 4 members. Includes pediatric dental." 
                  : "Perfect for individuals. Covers gym & basic Rx."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. MANUAL EXPENSE ENTRY */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" mb={3}>Log Outside Expense</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField 
                    label="Description" 
                    placeholder="e.g. Therapy Session"
                    fullWidth 
                    value={expenseDesc}
                    onChange={(e) => setExpenseDesc(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <TextField 
                    label="Amount" 
                    type="number"
                    fullWidth 
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large" 
                    startIcon={<Add />}
                    sx={{ height: '56px' }} 
                    onClick={handleAddExpense}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. TRANSACTION HISTORY TABLE (Now Dynamic!) */}
        <Grid size={{ xs: 12 }}>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead sx={{ bgcolor: 'grey.50' }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Use 'transactions' from Context instead of mockData */}
                {transactions.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.description}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.category.replace('_', ' ')} 
                        size="small" 
                        variant="outlined" 
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell align="right">${row.amount.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <Typography variant="caption" color="success.main" fontWeight="bold">
                        PAID
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      </Grid>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity="success" variant="filled">
          Expense added to your ledger!
        </Alert>
      </Snackbar>
    </Box>
  );
}