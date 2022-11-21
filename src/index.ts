import express, { Request, Response } from 'express'
import { uuid } from 'uuidv4'

interface User {
  id: string;
  nome: string;
  tel: string;
  idade: number;
}

const listaUsuarios: User[] = []

const server = express()
server.use(express.json())

// listar todos os usuários
server.get('/api/v1/users', (req: Request, res: Response) => {
  return res.json(listaUsuarios)
})

// listar os dados de um usuário específico
server.get('/api/v1/users/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const existentUser = listaUsuarios.find((user) => user.id == id)

  if (!existentUser) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" })
  }

  return res.json(existentUser)
})

// Cadastrar um usuário
server.post('/api/v1/users', (req: Request, res: Response) => {
  const { nome, tel, idade } = req.body
  const id = uuid()

  const newUser: User = {
    id,
    nome,
    tel,
    idade
  }

  listaUsuarios.push(newUser)

  return res.json(newUser)
})

// deletar um usuário específico
server.delete('/api/v1/users/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const existentUserIndex = listaUsuarios.findIndex((user) => user.id == id)

  if (existentUserIndex == -1) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' })
  }

  delete listaUsuarios[existentUserIndex]

  return res.status(204).send()
})

server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000...')
})