/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, CardMedia, Button, Chip, 
  TextField, InputAdornment, Stack, Snackbar, Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search, AddShoppingCart } from '@mui/icons-material';
import { PRODUCTS } from '../data/mockData'; // Products stay static, that's fine
import { type ProductCategory } from '../types';
import { useCareContext } from '../context/CareContext'; // <--- CONNECT TO STORE

export default function Marketplace() {
  const { addTransaction } = useCareContext(); // Get the "Write" function
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
  const [toastOpen, setToastOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBuy = (product: typeof PRODUCTS[0]) => {
    // 1. Create the Transaction Object
    const newTx = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        amount: product.price,
        category: 'MARKETPLACE_PURCHASE' as const,
        description: `Bought: ${product.name}`,
        productId: product.id
    };

    // 2. Send to Store
    addTransaction(newTx);
    
    // 3. Show Success
    setToastOpen(true); 
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Marketplace</Typography>
          <Typography variant="body2" color="text.secondary">
            Spend your health budget on approved items.
          </Typography>
        </Box>
        <TextField
          placeholder="Search items..."
          variant="outlined"
          size="small"
          sx={{ width: { xs: '100%', md: 300 }, bgcolor: 'white' }}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>) }}
        />
      </Stack>

      <Stack direction="row" spacing={1} mb={4} sx={{ overflowX: 'auto', pb: 1 }}>
        {['ALL', 'MEDICINE', 'SUPPLEMENT', 'FOOD', 'GEAR'].map((cat) => (
          <Chip 
            key={cat}
            label={cat}
            onClick={() => setSelectedCategory(cat as any)}
            color={selectedCategory === cat ? 'primary' : 'default'}
            variant={selectedCategory === cat ? 'filled' : 'outlined'}
            clickable
          />
        ))}
      </Stack>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" height="200" image={product.imageUrl} alt={product.name} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                   <Typography variant="subtitle2" color="secondary.main" fontWeight="bold">{product.category}</Typography>
                   <Typography variant="h6" fontWeight="bold">${product.price.toFixed(2)}</Typography>
                </Stack>
                <Typography variant="h6" gutterBottom>{product.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>{product.description}</Typography>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<AddShoppingCart />}
                  onClick={() => handleBuy(product)} // Pass the whole product
                  sx={{ mt: 'auto' }}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity="success" variant="filled">Item added to your Health Budget!</Alert>
      </Snackbar>
    </Box>
  );
}