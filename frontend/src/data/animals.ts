
export interface Animal {
  id: number
  name: string
  type: 'Кошка' | 'Собака'
  city: string
  description: string
  status: 'lost' | 'found'
  icon: string
  photo?: string
}

const STORAGE_KEY = 'lostpets-animals-v1'

const demoAnimals: Animal[] = [
  {
    id: 1,
    name: 'Барсик',
    type: 'Кошка',
    city: 'Москва',
    description: 'Рыжий кот, зелёные глаза. Потерялся возле парка.',
    status: 'lost',
    icon: '🐈',
  },
  {
    id: 2,
    name: 'Рекс',
    type: 'Собака',
    city: 'Москва',
    description: 'Найдена собака с красным ошейником.',
    status: 'found',
    icon: '🐕',
  },
  {
    id: 3,
    name: 'Муся',
    type: 'Кошка',
    city: 'Химки',
    description: 'Серая кошка с белыми лапками.',
    status: 'lost',
    icon: '🐈',
  },
  {
    id: 4,
    name: 'Бим',
    type: 'Собака',
    city: 'Подольск',
    description: 'Найдена небольшая дружелюбная собака.',
    status: 'found',
    icon: '🐕',
  },
]

function getSavedAnimals(): Animal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []

    return data.filter((value): value is Animal => {
      if (!value || typeof value !== 'object') {
        return false
      }

      const item = value as Partial<Animal>

      return (
        typeof item.id === 'number' &&
        Number.isFinite(item.id) &&
        typeof item.name === 'string' &&
        (item.type === 'Кошка' || item.type === 'Собака') &&
        typeof item.city === 'string' &&
        typeof item.description === 'string' &&
        (item.status === 'lost' || item.status === 'found') &&
        typeof item.icon === 'string' &&
        (item.photo === undefined || typeof item.photo === 'string')
      )
    })
  } catch {
    return []
  }
}

export function getAnimals(): Animal[] {
  return [...demoAnimals, ...getSavedAnimals()]
}

export function createAnimal(
  data: Omit<Animal, 'id'>
): Animal {
  const saved = getSavedAnimals()

  const ids = [...demoAnimals, ...saved].map(
    (animal) => animal.id
  )

  const newAnimal: Animal = {
    ...data,
    id: Math.max(0, ...ids) + 1,
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...saved, newAnimal])
  )

  return newAnimal
}
