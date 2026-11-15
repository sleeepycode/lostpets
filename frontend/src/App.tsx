
import { useState } from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
  Paper,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
} from '@mui/material'

import {
  Link as RouterLink,
  Route,
  Routes,
} from 'react-router'

import HomePage from './pages/HomePage'
import AnimalsPage from './pages/AnimalsPage'
import AnimalDetailsPage from './pages/AnimalDetailsPage'
import CreateAnimalPage from './pages/CreateAnimalPage'
import SearchPhotoPage from './pages/SearchPhotoPage'

const navigation = [
  { label: 'Главная', path: '/' },
  { label: 'Объявления', path: '/animals' },
  { label: 'Создать объявление', path: '/create' },
  { label: 'Поиск по фото', path: '/search' },
]

function NotFoundPage() {
  return (
    <Paper sx={{ p: 4, mt: 5, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom>
        404 — страница не найдена
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Проверьте адрес страницы.
      </Typography>

      <Button
        variant="contained"
        component={RouterLink}
        to="/"
      >
        На главную
      </Button>
    </Paper>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <CssBaseline />

      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: 64,
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{
              textTransform: 'none',
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            LostPets
          </Button>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
            }}
          >
            {navigation.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={RouterLink}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
            }}
          >
            <Typography sx={{ fontSize: 28, lineHeight: 1 }}>
              ☰
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <Box
          sx={{
            width: 270,
            maxWidth: '100vw',
            pt: 2,
          }}
          role="navigation"
          aria-label="Мобильная навигация"
        >
          <Box
            sx={{
              px: 2,
              pb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 800 }}
            >
              LostPets
            </Typography>

            <IconButton
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </IconButton>
          </Box>

          <Divider />

          <List>
            {navigation.map((item) => (
              <ListItemButton
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                sx={{ py: 2 }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg" component="main">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
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
            element={<CreateAnimalPage />}
          />

          <Route
            path="/search"
            element={<SearchPhotoPage />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </Container>
    </>
  )
}
