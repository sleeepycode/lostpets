
import { useEffect, useState } from 'react'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import SearchIcon from '@mui/icons-material/Search'
import { Link as RouterLink } from 'react-router'

import { getAnimals } from '../data/animals'
import type { Animal } from '../data/animals'

export default function SearchPhotoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [type, setType] = useState<Animal['type']>('Кошка')
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]

    if (!selected) return

    setError('')
    setShowResults(false)

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(selected.type)) {
      setError('Выберите изображение JPG, PNG или WebP.')
      setFile(null)
      setPreview('')
      event.target.value = ''
      return
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError('Размер фотографии не должен превышать 5 МБ.')
      setFile(null)
      setPreview('')
      event.target.value = ''
      return
    }

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const matchingAnimals = getAnimals().filter(
    (animal) => animal.type === type
  )

  return (
    <Box sx={{ py: 5 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 2 }}
      >
        Поиск животного по фотографии
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Загрузите фотографию питомца и выберите его вид.
        Сейчас доступен демонстрационный поиск по категории.
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        Демонстрационная версия: фотографии не сравниваются
        автоматически. Результаты отбираются по выбранному
        виду животного.
      </Alert>

      <Card sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center' }}>
              <PhotoCameraIcon
                sx={{ fontSize: 65, color: 'primary.main', mb: 2 }}
              />

              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Загрузите фотографию
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Поддерживаются JPG, PNG и WebP до 5 МБ
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box sx={{ textAlign: 'center' }}>
              <Button variant="outlined" component="label">
                Выбрать фотографию
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={handleUpload}
                />
              </Button>
            </Box>

            {file && (
              <Typography
                color="text.secondary"
                sx={{ textAlign: 'center' }}
              >
                Выбран файл: {file.name}
              </Typography>
            )}

            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Загруженная фотография"
                sx={{
                  width: '100%',
                  maxWidth: 450,
                  maxHeight: 350,
                  objectFit: 'contain',
                  borderRadius: 3,
                  mx: 'auto',
                  display: 'block',
                }}
              />
            )}

            <TextField
              select
              fullWidth
              label="Вид животного"
              value={type}
              onChange={(event) => {
                setType(event.target.value as Animal['type'])
                setShowResults(false)
              }}
            >
              <MenuItem value="Кошка">Кошка</MenuItem>
              <MenuItem value="Собака">Собака</MenuItem>
            </TextField>

            <Button
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              disabled={!file}
              onClick={() => setShowResults(true)}
            >
              Показать объявления этого вида
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {showResults && (
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Объявления: {type}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Найдено объявлений: {matchingAnimals.length}.
            Это подборка по категории, а не по сходству фотографий.
          </Typography>

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
            {matchingAnimals.map((animal) => (
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
                      height: 180,
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 180,
                      bgcolor: '#edf4f7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
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

                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {animal.city}
                  </Typography>

                  <Button
                    fullWidth
                    variant="outlined"
                    component={RouterLink}
                    to={`/animals/${animal.id}`}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
