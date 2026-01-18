/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { 
  Box, Card, CardContent, Typography, LinearProgress, Chip, 
  List, ListItem, ListItemText, ListItemIcon, Avatar, Stack 
} from '@mui/material';
import Grid from '@mui/material/Grid'; 
import { ShoppingBag, LocalPharmacy } from '@mui/icons-material';
import { useCareContext } from '../context/CareContext'; // <--- CONNECT TO STORE

export default function Dashboard() {
  // Get live data from the Store
  const { budget, stats, transactions } = useCareContext();

  const budgetPercent = (budget.currentSpend / budget.totalLimit) * 100;
  
  const getProgressColor = (percent: number) => {
    if (percent < 50) return 'success';
    if (percent < 80) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Financial Vitals
      </Typography>

      <Grid container spacing={3}>
        {/* 1. Main Budget Card */}
        <Grid size={{ xs: 12, md: 8 }}> 
          <Card sx={{ height: '100%', position: 'relative' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h6" color="text.secondary">Monthly Health Budget</Typography>
                <Chip label={budget.currency} size="small" color="primary" variant="outlined" />
              </Stack>

              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                ${budget.currentSpend.toLocaleString()}
                <Typography component="span" variant="h5" color="text.secondary">
                   / ${budget.totalLimit.toLocaleString()}
                </Typography>
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" fontWeight="bold">Utilization</Typography>
                  <Typography variant="body2" fontWeight="bold">{budgetPercent.toFixed(1)}%</Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(budgetPercent, 100)} 
                  color={getProgressColor(budgetPercent)}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. Health Score Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', bgcolor: 'primary.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Health Score</Typography>
              <Box sx={{ my: 2 }}>
                <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                  {stats.healthScore}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Keep logging your daily activity to increase this score!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. Recent Transactions List (Showing top 4) */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
              <List>
                {transactions.slice(0, 4).map((tx) => (
                  <ListItem key={tx.id} divider>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: tx.category === 'MARKETPLACE_PURCHASE' ? 'secondary.light' : 'grey.300' }}>
                        {tx.category === 'MARKETPLACE_PURCHASE' ? <ShoppingBag /> : <LocalPharmacy />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={tx.description} 
                      secondary={tx.date} 
                    />
                    <Typography variant="body1" fontWeight="bold" color={tx.category === 'MARKETPLACE_PURCHASE' ? 'secondary.main' : 'text.primary'}>
                      -${tx.amount.toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
                {transactions.length === 0 && (
                  <Typography color="text.secondary" align="center" py={2}>
                    No recent transactions.
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}