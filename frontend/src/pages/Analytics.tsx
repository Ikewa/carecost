/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import { TrendingUp, Lightbulb, WarningAmber } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useCareContext } from '../context/CareContext'; // <--- CONNECT TO STORE

// Hardcoded Trend Data (Since we don't have months of history in this demo)
const TREND_DATA = [
  { month: 'Aug', spend: 1200, health: 65 },
  { month: 'Sep', spend: 1900, health: 70 },
  { month: 'Oct', spend: 1400, health: 72 },
  { month: 'Nov', spend: 2100, health: 78 },
  { month: 'Dec', spend: 800, health: 75 },
  { month: 'Jan', spend: 1200, health: 82 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF'];

export default function Analytics() {
  const { transactions } = useCareContext();

  // DYNAMICALLY CALCULATE PIE CHART DATA
  const categoryTotals = transactions.reduce((acc, tx) => {
    // Strip "MARKETPLACE_PURCHASE" to just "MARKETPLACE" for cleaner labels
    const label = tx.category.replace('_', ' ');
    acc[label] = (acc[label] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(categoryTotals).map((key) => ({
    name: key,
    value: categoryTotals[key],
  }));

  // Handle case with no data
  const finalPieData = pieData.length > 0 ? pieData : [{ name: 'No Data', value: 100 }];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={1}>Analytics Report</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>Analyzing the correlation between your wallet and your wellness.</Typography>

      <Grid container spacing={3}>
        {/* 1. PIE CHART (REAL DATA) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '400px' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" mb={2}>Real Expense Breakdown</Typography>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={finalPieData}
                    cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}
                    dataKey="value"
                  >
                    {finalPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Stack direction="row" justifyContent="center" spacing={2} mt={-2} flexWrap="wrap">
                {finalPieData.map((item, index) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length] }} />
                    <Typography variant="caption">{item.name}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. TREND CHART (STATIC) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '400px' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" mb={2}>Spend vs. Health Score Trend</Typography>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#0088FE" />
                  <YAxis yAxisId="right" orientation="right" stroke="#00C49F" domain={[0, 100]} />
                  <Tooltip />
                  <Area yAxisId="left" type="monotone" dataKey="spend" stroke="#0088FE" fill="#0088FE" fillOpacity={0.1} name="Spend ($)" />
                  <Area yAxisId="right" type="monotone" dataKey="health" stroke="#00C49F" fill="#00C49F" fillOpacity={0.1} name="Health Score" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

         {/* 3. INSIGHTS */}
         <Grid size={{ xs: 12 }}>
          <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Lightbulb sx={{ color: 'yellow' }} />
                <Typography variant="h6" fontWeight="bold">AI Insights</Typography>
              </Stack>
              <Typography variant="body1">
                Based on your {transactions.length} transactions, your spending is heavily focused on <strong>{pieData.sort((a,b) => b.value - a.value)[0]?.name || 'Saving'}</strong>.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}