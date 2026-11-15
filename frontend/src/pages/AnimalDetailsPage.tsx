
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link as RouterLink, useParams } from 'react-router'
import { getAnimals } from '../data/animals'

export default function AnimalDetailsPage() {
  const { id } = useParams()

  const animal = getAnimals().find(
    (item) => item.id === Number(id)
  )

  if (!animal) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Объявление не найдено
        </Typography>

        <Button
          variant="contained"
          component={RouterLink}
          to="/animals"
        >
          Вернуться к объявлениям
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 5 }}>
      <Button
        component={RouterLink}
        to="/animals"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Назад к объявлениям
      </Button>

      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {animal.photo ? (
          <Box
            component="img"
            src={animal.photo}
            alt={animal.name}
            sx={{
              width: '100%',
              height: 320,
              objectFit: 'contain',
              bgcolor: '#edf4f7',
            }}
          />
        ) : (
          <Box
            sx={{
              height: 280,
              bgcolor: '#edf4f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 110,
            }}
          >
            {animal.icon}
          </Box>
        )}

        <CardContent sx={{ p: 4 }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700 }}
            >
              {animal.name}
            </Typography>

            <Chip
              label={
                animal.status === 'lost'
                  ? 'Потерян'
                  : 'Найден'
              }
              color={
                animal.status === 'lost'
                  ? 'error'
                  : 'success'
              }
            />
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Box>
              <Typography color="text.secondary">
                Вид животного
              </Typography>
              <Typography variant="h6">
                {animal.type}
              </Typography>
            </Box>

            <Box>
              <Typography color="text.secondary">
                Город
              </Typography>
              <Typography variant="h6">
                {animal.city}
              </Typography>
            </Box>

            <Box>
              <Typography color="text.secondary">
                Описание
              </Typography>
              <Typography>
                {animal.description}
              </Typography>
            </Box>

            <Box>
              <Typography color="text.secondary">
                Номер объявления
              </Typography>
              <Typography>
                #{animal.id}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
