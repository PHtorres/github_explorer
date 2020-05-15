import React, { useState, useEffect, FormEvent } from 'react';
import api from '../../services/api';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
import logoImg from '../../assets/logo.svg';


interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashbord: React.FC = () => {

    const [newRepository, setNewRepository] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const response = await api.get<Repository>(`repos/${newRepository}`);
        const repository = response.data;
        setRepositories([repository, ...repositories]);
        setNewRepository('');
    }

    return (
        <>
            <img src={logoImg} alt="Github_explorer" />
            <Title>Explore repositórios no Github</Title>
            <Form onSubmit={handleAddRepository}>
                <input
                    value={newRepository}
                    onChange={e => setNewRepository(e.target.value)}
                    placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>
            <Repositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="teste">
                        <img src={repository.owner.avatar_url}
                            alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositories>
        </>
    )
}

export default Dashbord;