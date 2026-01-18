import React, { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, Stack, TextField, Slider, Button, 
  MenuItem, Select, FormControl, InputLabel, LinearProgress, Snackbar, Alert 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { FitnessCenter, LocalDrink, Restaurant, EmojiEmotions } from '@mui/icons-material';
import { useCareContext } from '../context/CareContext'; // <--- CONNECT TO STORE

export default function HealthLog() {
  const { stats, updateHealthScore } = useCareContext(); // Get stats and updater
  
  const [exerciseType, setExerciseType] = useState('CARDIO');
  const [exerciseMins, setExerciseMins] = useState<number>(0);
  const [waterLiters, setWaterLiters] = useState<number>(1.5);
  const [calories, setCalories] = useState<number>(0);
  const [mood, setMood] = useState<number>(3);
  const [toastOpen, setToastOpen] = useState(false);

  const GOALS = { water: 3.0, exercise: 60, calories: 2500 };

  const handleSubmit = () => {
    // GAMIFICATION LOGIC:
    // Improve score by 5 points for logging, max 100
    const newScore = Math.min(stats.healthScore + 5, 100);
    updateHealthScore(newScore);
    
    setToastOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={1}>Daily Health Log</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>Track your vitals to earn "Health Coin" rewards.</Typography>

      <Grid container spacing={3}>
        {/* 1. INPUT FORM */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Stack spacing={4}>
                {/* Exercise */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <FitnessCenter color="primary" />
                    <Typography variant="h6">Exercise</Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select value={exerciseType} label="Type" onChange={(e) => setExerciseType(e.target.value)}>
                          <MenuItem value="CARDIO">Cardio / Run</MenuItem>
                          <MenuItem value="WEIGHTS">Weights</MenuItem>
                          <MenuItem value="YOGA">Yoga</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField label="Duration (mins)" type="number" fullWidth value={exerciseMins} onChange={(e) => setExerciseMins(Number(e.target.value))} />
                    </Grid>
                  </Grid>
                </Box>
                {/* Nutrition */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <Restaurant color="secondary" />
                    <Typography variant="h6">Nutrition</Typography>
                  </Stack>
                  <TextField label="Calories Consumed" type="number" fullWidth value={calories} onChange={(e) => setCalories(Number(e.target.value))} />
                </Box>
                {/* Water */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <LocalDrink sx={{ color: '#2196f3' }} />
                    <Typography variant="h6">Water Intake ({waterLiters} L)</Typography>
                  </Stack>
                  <Slider value={waterLiters} min={0} max={5} step={0.1} valueLabelDisplay="auto" onChange={(_, val) => setWaterLiters(val as number)} sx={{ color: '#2196f3' }} />
                </Box>
                {/* Mood */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <EmojiEmotions color="warning" />
                    <Typography variant="h6">Mood Check-in</Typography>
                  </Stack>
                  <Slider value={mood} min={1} max={5} step={1} marks color="warning" onChange={(_, val) => setMood(val as number)} />
                </Box>

                <Button variant="contained" size="large" onClick={handleSubmit} sx={{ py: 1.5, fontWeight: 'bold' }}>Save Daily Log</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. LIVE PREVIEW */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ height: '100%', bgcolor: 'primary.dark', color: 'white' }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>Daily Goals</Typography>
              <Stack spacing={4} mt={4}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}><Typography>Movement</Typography><Typography>{Math.min((exerciseMins / GOALS.exercise) * 100, 100).toFixed(0)}%</Typography></Stack>
                  <LinearProgress variant="determinate" value={Math.min((exerciseMins / GOALS.exercise) * 100, 100)} color="secondary" sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}><Typography>Hydration</Typography><Typography>{Math.min((waterLiters / GOALS.water) * 100, 100).toFixed(0)}%</Typography></Stack>
                  <LinearProgress variant="determinate" value={Math.min((waterLiters / GOALS.water) * 100, 100)} sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#2196f3' } }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity="success" variant="filled">Logged! Health Score +5</Alert>
      </Snackbar>
    </Box>
  );
}