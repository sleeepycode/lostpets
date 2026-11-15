
import { useState } from 'react'

import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
} from '@mui/material'

import { Link as RouterLink } from 'react-router'
import { getAnimals } from '../data/animals'

export default function AnimalsPage() {
  const [search, setSearch] = useState('')
  const animals = getAnimals()

  const query = search.toLowerCase().trim()

  const filteredAnimals = animals.filter((animal) =>
    [animal.name, animal.city, animal.type].some((value) =>
      value.toLowerCase().includes(query)
    )
  )

  return (
    <Box sx={{ py: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Объявления о животных
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Найдите потерянного питомца или помогите найденному
        животному вернуться домой.
      </Typography>

      <TextField
        fullWidth
        label="Поиск по имени, городу или виду животного"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        sx={{ mb: 4 }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {filteredAnimals.map((animal) => (
          <Card
            key={animal.id}
            sx={{
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {animal.photo ? (
              <Box
                component="img"
                src={animal.photo}
                alt={animal.name}
                sx={{
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  height: 150,
                  bgcolor: '#edf4f7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 70,
                }}
              >
                {animal.icon}
              </Box>
            )}

            <CardContent sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  {animal.name}
                </Typography>

                <Chip
                  size="small"
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

              <Typography color="text.secondary">
                {animal.type} · {animal.city}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                {animal.description}
              </Typography>
            </CardContent>

            <CardActions sx={{ p: 2 }}>
              <Button
                fullWidth
                variant="contained"
                component={RouterLink}
                to={`/animals/${animal.id}`}
              >
                Подробнее
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {filteredAnimals.length === 0 && (
        <Typography
          color="text.secondary"
          sx={{ mt: 4, textAlign: 'center' }}
        >
          По вашему запросу объявления не найдены.
        </Typography>
      )}
    </Box>
  )
}
