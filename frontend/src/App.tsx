
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
  Paper,
} from '@mui/material'

import {
  Link as RouterLink,
  Route,
  Routes,
} from 'react-router'

import AnimalsPage from './pages/AnimalsPage'
import AnimalDetailsPage from './pages/AnimalDetailsPage'

function Page({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Paper sx={{ p: 4, mt: 5, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <Typography color="text.secondary">
        {description}
      </Typography>
    </Paper>
  )
}

export default function App() {
  return (
    <>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar sx={{ flexWrap: 'wrap', gap: 1, py: 1 }}>
          <Typography
            variant="h6"
            sx={{ mr: 3, fontWeight: 700 }}
          >
            LostPets
          </Typography>

          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Главная
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/animals"
          >
            Объявления
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/create"
          >
            Создать объявление
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/search"
          >
            Поиск по фото
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Routes>
          <Route
            path="/"
            element={
              <Page
                title="Добро пожаловать в LostPets!"
                description="Помогаем потерянным животным вернуться домой."
              />
            }
          />

          <Route
            path="/animals"
            element={<AnimalsPage />}
          />

          <Route
            path="/animals/:id"
            element={<AnimalDetailsPage />}
          />

          <Route
            path="/create"
            element={
              <Page
                title="Создание объявления"
                description="Здесь будет форма добавления животного."
              />
            }
          />

          <Route
            path="/search"
            element={
              <Page
                title="Поиск по фотографии"
                description="Здесь появится форма загрузки фотографии."
              />
            }
          />

          <Route
            path="*"
            element={
              <Page
                title="404 — страница не найдена"
                description="Проверьте адрес страницы."
              />
            }
          />
        </Routes>
      </Container>
    </>
  )
}