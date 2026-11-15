
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { createAnimal } from '../data/animals'
import type { Animal } from '../data/animals'

function prepareImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      try {
        const maxSize = 800
        const scale = Math.min(
          1,
          maxSize / Math.max(image.width, image.height)
        )

        const canvas = document.createElement('canvas')

        canvas.width = Math.max(
          1,
          Math.round(image.width * scale)
        )

        canvas.height = Math.max(
          1,
          Math.round(image.height * scale)
        )

        const context = canvas.getContext('2d')

        if (!context) {
          throw new Error('Не удалось обработать изображение')
        }

        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)

        resolve(canvas.toDataURL('image/jpeg', 0.75))
      } catch (error) {
        reject(error)
      } finally {
        URL.revokeObjectURL(url)
      }
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Не удалось открыть фотографию'))
    }

    image.src = url
  })
}

export default function CreateAnimalPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [type, setType] = useState<Animal['type']>('Кошка')
  const [status, setStatus] = useState<Animal['status']>('lost')
  const [city, setCity] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  async function handlePhoto(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    if (!file) return

    setError('')
    setPhoto('')

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Допустимы только JPG, PNG и WebP.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Размер фотографии не должен превышать 5 МБ.')
      return
    }

    setProcessing(true)

    try {
      const imageData = await prepareImage(file)
      setPhoto(imageData)
    } catch {
      setError('Не удалось обработать фотографию.')
    } finally {
      setProcessing(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!name.trim() || !city.trim() || !description.trim()) {
      setError('Заполните все обязательные поля.')
      return
    }

    if (!photo) {
      setError('Добавьте фотографию животного.')
      return
    }

    try {
      const animal = createAnimal({
        name: name.trim(),
        type,
        status,
        city: city.trim(),
        description: description.trim(),
        icon: type === 'Кошка' ? '🐈' : '🐕',
        photo,
      })

      navigate(`/animals/${animal.id}`)
    } catch {
      setError(
        'Не удалось сохранить объявление. Возможно, хранилище браузера заполнено.'
      )
    }
  }

  return (
    <Box sx={{ py: 5, maxWidth: 750, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Создать объявление
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Расскажите о потерянном или найденном животном.
        Поля со звёздочкой обязательны.
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {error && (
                <Alert severity="error">{error}</Alert>
              )}

              <TextField
                required
                fullWidth
                label="Кличка животного"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <TextField
                select
                fullWidth
                label="Вид животного"
                value={type}
                onChange={(event) =>
                  setType(event.target.value as Animal['type'])
                }
              >
                <MenuItem value="Кошка">Кошка</MenuItem>
                <MenuItem value="Собака">Собака</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Статус объявления"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as Animal['status'])
                }
              >
                <MenuItem value="lost">Потерян</MenuItem>
                <MenuItem value="found">Найден</MenuItem>
              </TextField>

              <TextField
                required
                fullWidth
                label="Город"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />

              <TextField
                required
                fullWidth
                multiline
                minRows={4}
                label="Описание животного"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />

              <Box>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Фотография животного *
                </Typography>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhoto}
                />

                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  JPG, PNG или WebP, не более 5 МБ.
                </Typography>

                {processing && (
                  <Typography sx={{ mt: 2 }}>
                    Обработка изображения...
                  </Typography>
                )}

                {photo && (
                  <Box
                    component="img"
                    src={photo}
                    alt="Предпросмотр фотографии"
                    sx={{
                      display: 'block',
                      mt: 2,
                      width: '100%',
                      maxWidth: 400,
                      maxHeight: 300,
                      objectFit: 'contain',
                      borderRadius: 2,
                    }}
                  />
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={processing}
              >
                Опубликовать объявление
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
