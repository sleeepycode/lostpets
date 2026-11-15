
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'

import PetsIcon from '@mui/icons-material/Pets'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { Link as RouterLink } from 'react-router'
import { getAnimals } from '../data/animals'

export default function HomePage() {
  const animals = getAnimals()

  const lostCount = animals.filter(
    (animal) => animal.status === 'lost'
  ).length

  const foundCount = animals.filter(
    (animal) => animal.status === 'found'
  ).length

  const recentAnimals = [...animals].reverse().slice(0, 3)

  return (
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1255a0, #2196f3)',
          color: 'white',
          borderRadius: 4,
          p: { xs: 4, md: 7 },
          mb: 5,
        }}
      >
        <PetsIcon sx={{ fontSize: 55, mb: 2 }} />

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            mb: 2,
          }}
        >
          Поможем питомцам вернуться домой
        </Typography>

        <Typography
          variant="h6"
          sx={{ maxWidth: 650, opacity: 0.9, mb: 4 }}
        >
          LostPets — сервис поиска потерянных и найденных
          животных. Размещайте объявления, просматривайте
          каталог и находите своих четвероногих друзей.
        </Typography>

        <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            color="inherit"
            component={RouterLink}
            to="/animals"
            startIcon={<SearchIcon />}
            sx={{ color: '#1255a0' }}
          >
            Найти животное
          </Button>

          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/create"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Создать объявление
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(3, 1fr)',
          },
          gap: 3,
          mb: 6,
        }}
      >
        {[
          { label: 'Всего объявлений', value: animals.length },
          { label: 'Потерянные', value: lostCount },
          { label: 'Найденные', value: foundCount },
        ].map((item) => (
          <Card key={item.label} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, color: 'primary.main' }}
              >
                {item.value}
              </Typography>

              <Typography color="text.secondary">
                {item.label}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Последние объявления
        </Typography>

        <Button
          component={RouterLink}
          to="/animals"
          endIcon={<ArrowForwardIcon />}
        >
          Все объявления
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
          mb: 6,
        }}
      >
        {recentAnimals.map((animal) => (
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
                  height: 180,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  height: 180,
                  bgcolor: '#edf4f7',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 75,
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
                  mb: 1,
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

              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {animal.type} · {animal.city}
              </Typography>

              <Button
                component={RouterLink}
                to={`/animals/${animal.id}`}
                variant="outlined"
                fullWidth
              >
                Подробнее
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 3 }}
      >
        Как работает LostPets
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {[
          {
            icon: <SearchIcon sx={{ fontSize: 40 }} />,
            title: '1. Найдите объявление',
            description:
              'Просматривайте животных и используйте поиск по каталогу.',
          },
          {
            icon: <AddCircleOutlineIcon sx={{ fontSize: 40 }} />,
            title: '2. Разместите информацию',
            description:
              'Добавьте описание и фотографию потерянного или найденного животного.',
          },
          {
            icon: <PhotoCameraIcon sx={{ fontSize: 40 }} />,
            title: '3. Поиск по фотографии',
            description:
              'Ознакомьтесь с демонстрационным интерфейсом поиска по снимку.',
          },
        ].map((step) => (
          <Card key={step.title} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {step.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 1 }}
              >
                {step.title}
              </Typography>

              <Typography color="text.secondary">
                {step.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

