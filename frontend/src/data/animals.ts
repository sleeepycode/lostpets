
export interface Animal {
  id: number
  name: string
  type: 'Кошка' | 'Собака'
  city: string
  description: string
  status: 'lost' | 'found'
  icon: string
}

export const animals: Animal[] = [
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
