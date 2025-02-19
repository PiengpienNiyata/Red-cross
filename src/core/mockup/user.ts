export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    position: 'system' | 'admin' | 'user';
    password: string;
    sites?: string[]; // Only for users
  }
  
  export const mockUsers: User[] = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      position: 'system',
      password: '$2a$10$abcdefg1234567890'
    },
    {
      id: 2,
      first_name: 'Alice',
      last_name: 'Smith',
      email: 'alice.smith@example.com',
      position: 'admin',
      password: '$2a$10$abcdefg1234567891'
    },
    {
      id: 3,
      first_name: 'Michael',
      last_name: 'Brown',
      email: 'michael.brown@example.com',
      position: 'user',
      password: '$2a$10$abcdefg1234567892',
      sites: ['Site A', 'Site B']
    },
    {
      id: 4,
      first_name: 'Emma',
      last_name: 'Wilson',
      email: 'emma.wilson@example.com',
      position: 'user',
      password: '$2a$10$abcdefg1234567893',
      sites: ['Site C']
    },
    {
      id: 5,
      first_name: 'David',
      last_name: 'Miller',
      email: 'david.miller@example.com',
      position: 'admin',
      password: '$2a$10$abcdefg1234567894'
    },
    {
      id: 6,
      first_name: 'Sophia',
      last_name: 'Anderson',
      email: 'sophia.anderson@example.com',
      position: 'user',
      password: '$2a$10$abcdefg1234567895',
      sites: ['Site A', 'Site D']
    },
    {
      id: 7,
      first_name: 'James',
      last_name: 'Martinez',
      email: 'james.martinez@example.com',
      position: 'system',
      password: '$2a$10$abcdefg1234567896'
    },
    {
      id: 8,
      first_name: 'Olivia',
      last_name: 'Garcia',
      email: 'olivia.garcia@example.com',
      position: 'user',
      password: '$2a$10$abcdefg1234567897',
      sites: ['Site B']
    },
    {
      id: 9,
      first_name: 'William',
      last_name: 'Lopez',
      email: 'william.lopez@example.com',
      position: 'admin',
      password: '$2a$10$abcdefg1234567898'
    },
    {
      id: 10,
      first_name: 'Ava',
      last_name: 'Gonzalez',
      email: 'ava.gonzalez@example.com',
      position: 'user',
      password: '$2a$10$abcdefg1234567899',
      sites: ['Site C', 'Site E']
    },
    {
      id: 11,
      first_name: 'Lucas',
      last_name: 'Hernandez',
      email: 'lucas.hernandez@example.com',
      position: 'system',
      password: '$2a$10$abcdefg1234567800'
    },
    {
      id: 12,
      first_name: 'Mia',
      last_name: 'Young',
      email: 'mia.young@example.com',
      position: 'admin',
      password: '$2a$10$abcdefg1234567801'
    },
    {
      id: 13,
      first_name: 'Benjamin',
      last_name: 'Allen',
      email: 'benjamin.allen@example.com',
      position: 'user',
      password: '$2a$10$abcdefg1234567802',
      sites: ['Site A', 'Site B', 'Site F']
    },
    {
      id: 14,
      first_name: 'Charlotte',
      last_name: 'Scott',
      email: 'charlotte.scott@example.com',
      position: 'user',
      password: '$2a$10$abcdefg1234567803',
      sites: ['Site D']
    },
    {
      id: 15,
      first_name: 'Henry',
      last_name: 'Carter',
      email: 'henry.carter@example.com',
      position: 'admin',
      password: '$2a$10$abcdefg1234567804'
    }
  ];
  